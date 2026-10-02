import { AxiosError } from "axios";
import { ValidationErrorItem } from "../features/common/types";

const collectConstraints = (items: ValidationErrorItem[]): string[] =>
  items.flatMap((item) => [
    ...Object.values(item.constraints ?? {}),
    ...collectConstraints(item.children ?? []),
  ]);

export const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof AxiosError)) return "An unknown error occurred";

  const apiError: unknown = error.response?.data?.error;
  if (typeof apiError === "string") return apiError;

  const messages = Array.isArray(apiError) ? collectConstraints(apiError) : [];
  return messages.length > 0 ? messages.join(", ") : error.message;
};
