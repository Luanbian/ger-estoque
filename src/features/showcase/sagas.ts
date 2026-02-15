import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { APIResponse } from "../common/types";
import { apiService } from "../../services/api";
import { CreateShowcasePayload, Showcase } from "./types";
import {
  STORIES_QUANTITY,
  STORY_ITEMS_QUANTITY,
} from "../../app/components/showcase/stories";

const uploadFile = (file: File | null) => {
  if (!file) return Promise.resolve({ data: null });

  const formData = new FormData();
  formData.append("file", file);
  return apiService.post("/storage", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

function* getShowcase() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Showcase> = yield call(
      apiService.get,
      "/showcase",
    );

    const { data } = response;

    yield put(actions.setShowcase(data));
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

function* createShowcase(payload: PayloadAction<CreateShowcasePayload>) {
  yield put(actions.setLoading(true));
  try {
    if (!payload.payload.showStories) {
      delete payload.payload.stories;
    }

    const bannerUrl: APIResponse<string> = yield call(
      uploadFile,
      payload.payload.banner,
    );
    const logoUrl: APIResponse<string> = yield call(
      uploadFile,
      payload.payload.logo,
    );
    const presentationUrl: APIResponse<string> = yield call(
      uploadFile,
      payload.payload.presentation.image,
    );
    const bodyUrl: APIResponse<string> = yield call(
      uploadFile,
      payload.payload.body.image,
    );

    const storiesUrlsArr: { thumbnail: string; items: string[] }[] = Array.from(
      { length: STORIES_QUANTITY },
      () => ({
        thumbnail: "",
        items: Array(STORY_ITEMS_QUANTITY).fill(""),
      }),
    );

    for (let i = 0; i < STORIES_QUANTITY; i++) {
      const story = payload.payload.stories?.[i];

      const thumbnailUrl: APIResponse<string> = yield call(
        uploadFile,
        story?.thumbnail || null,
      );
      storiesUrlsArr[i].thumbnail = thumbnailUrl.data || "";

      for (let j = 0; j < STORY_ITEMS_QUANTITY; j++) {
        const item = story?.items?.[j];

        const itemImageUrl: APIResponse<string> = yield call(
          uploadFile,
          item?.image || null,
        );
        storiesUrlsArr[i].items[j] = itemImageUrl.data || "";
      }
    }

    const response: APIResponse<Showcase> = yield call(
      apiService.post,
      "/showcase",
      {
        ...payload.payload,
        banner: bannerUrl.data,
        logo: logoUrl.data,
        presentation: {
          ...payload.payload.presentation,
          image: presentationUrl.data,
          sections: payload.payload.presentation.sections.filter(Boolean),
        },
        body: { ...payload.payload.body, image: bodyUrl.data },
        stories: payload.payload.stories?.map((story, i) => ({
          ...story,
          thumbnail: storiesUrlsArr[i].thumbnail,
          items: story.items.map((item, j) => ({
            ...item,
            profileImage: storiesUrlsArr[i].thumbnail,
            image: storiesUrlsArr[i].items[j],
          })),
        })),
      },
    );

    const { data } = response;

    yield put(actions.setMessage("Showcase created successfully"));
    yield put(actions.setShowcase(data));
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

function* getShowcaseByName(payload: PayloadAction<{ name: string }>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Showcase> = yield call(
      apiService.get,
      `/showcase/${payload.payload.name}`,
    );

    const { data } = response;

    yield put(actions.setShowcase(data));
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

export function* showcaseSagas() {
  yield all([
    takeEvery(actions.showcaseRequest.type, getShowcase),
    takeEvery(actions.createShowcaseRequest.type, createShowcase),
    takeEvery(actions.getShowcaseByName.type, getShowcaseByName),
  ]);
}
