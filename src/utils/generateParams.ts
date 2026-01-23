import { PaginationRequest } from "../features/common/types";

export const generateParams = (data?: PaginationRequest) => {
  const page = data?.page || "1";
  const limit = data?.limit || "25";
  const sort = data?.sort || "asc";

  return {
    page,
    limit,
    sort,
  };
};
