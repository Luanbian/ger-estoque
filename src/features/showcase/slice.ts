import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateShowcasePayload, ShowcaseState } from "./types";

export const initialState: ShowcaseState = {
  data: null,
  loading: false,
  error: null,
};

export const showcaseSlice = createSlice({
  name: "showcase",
  initialState,
  reducers: {
    showcaseRequest: (_state, _action: PayloadAction<string>) => {},
    createShowcaseRequest: (
      _state,
      _action: PayloadAction<CreateShowcasePayload>,
    ) => {},
    setShowcase: (state, action: PayloadAction<ShowcaseState["data"]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
    },
  },
});

export const { actions } = showcaseSlice;
export default showcaseSlice.reducer;
