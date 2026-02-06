import { useEffect } from "react";
import { actions } from "../../../features/customers";
import { useDispatch, useSelector } from "../../../store/hooks";
import { CustomerPage } from "./page";

export const Customer = () => {
  const dispatch = useDispatch();
  const {
    data,
    loading,
    pagination,
    favorites,
    loadingFavorites,
    paginationFavorites,
  } = useSelector((state) => state.customer);

  const onChangePage = (page: number) => {
    dispatch(
      actions.customersRequest({
        page: page.toString(),
        limit: "25",
        sort: "asc",
      }),
    );
  };

  const onChangePageFavorites = (page: number) => {
    dispatch(
      actions.favoritesRequest({
        page: page.toString(),
        limit: "25",
        sort: "asc",
      }),
    );
  };

  useEffect(() => {
    if (data === null) {
      dispatch(actions.customersRequest());
    }
    if (favorites === null) {
      dispatch(actions.favoritesRequest());
    }
  }, [data, favorites]);

  return (
    <CustomerPage
      data={{
        customers: data,
        loading,
        pagination,
        favorites,
        loadingFavorites,
        paginationFavorites,
      }}
      actions={{ onChangePage, onChangePageFavorites }}
    />
  );
};
