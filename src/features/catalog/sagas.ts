import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import {
  CatalogCategory,
  CatalogCategoryAssociate,
  CatalogCategoryPayload,
  CatalogItem,
  CatalogItemPayload,
} from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store/index.ts";
import { uploadFile } from "../../utils/uploadFile.ts";

function* getCatalog() {
  yield put(actions.setLoading(true));
  try {
    const showcaseId: string = yield select(
      (state: AppState) => state.showcase.data?._id,
    );
    const [responseCategory, responseItem]: [
      APIResponse<CatalogCategory[]>,
      APIResponse<CatalogItem[]>,
    ] = yield all([
      call(apiService.get, `${API_BASE_URL}/catalog/category/${showcaseId}`),
      call(
        apiService.post,
        `${API_BASE_URL}/catalog/item/list/${showcaseId}`,
        {},
      ),
    ]);

    yield put(
      actions.setCatalog({
        category: responseCategory.data,
        items: responseItem.data,
      }),
    );
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* createCatalogCategory(
  payload: PayloadAction<CatalogCategoryPayload>,
) {
  yield put(actions.setLoading(true));
  try {
    const showcaseId: string = yield select(
      (state: AppState) => state.showcase.data?._id,
    );

    const createdMain: APIResponse<CatalogCategory> = yield call(
      apiService.post,
      `${API_BASE_URL}/catalog/category`,
      { name: payload.payload.name, showcaseId },
    );
    const { data } = createdMain;

    if (
      payload.payload?.subCategory &&
      payload.payload.subCategory.length > 0
    ) {
      for (let i = 0; i < payload.payload.subCategory.length; i++) {
        yield call(apiService.post, `${API_BASE_URL}/catalog/category`, {
          name: payload.payload.subCategory[i],
          fatherCategoryId: data._id,
          showcaseId,
        });
      }
    }

    yield put(actions.addCatalogCategory(data));
    yield call(getCatalog);
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* createCatalogItem(payload: PayloadAction<CatalogItemPayload>) {
  yield put(actions.setLoading(true));
  try {
    let imageUrl: APIResponse<string> | null = null;
    if (payload.payload?.image) {
      imageUrl = yield call(uploadFile, payload.payload.image);
    }

    const response: APIResponse<CatalogItem> = yield call(
      apiService.post,
      `${API_BASE_URL}/catalog/item`,
      {
        ...payload.payload,
        ...(imageUrl !== null && { image: imageUrl.data }),
      },
    );

    const { data } = response;

    yield put(actions.addCatalogItem(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* associateCatalogCategory(
  payload: PayloadAction<CatalogCategoryAssociate>,
) {
  yield put(actions.setLoading(true));
  try {
    yield call(
      apiService.patch,
      `${API_BASE_URL}/catalog/category/${payload.payload.categoryId}/${payload.payload.fatherCategoryId}`,
      {},
    );

    yield call(getCatalog);
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* catalogSagas() {
  yield all([
    takeEvery(actions.catalogRequest.type, getCatalog),
    takeEvery(actions.createCatalogCategoryRequest.type, createCatalogCategory),
    takeEvery(actions.createCatalogItemRequest.type, createCatalogItem),
    takeEvery(
      actions.associateCatalogCategoryRequest.type,
      associateCatalogCategory,
    ),
  ]);
}
