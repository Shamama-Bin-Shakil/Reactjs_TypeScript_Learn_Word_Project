import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

const rootSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<WordType[] | undefined>) => {
      state.loading = false;
      if (action.payload != undefined) {
        state.words = action.payload;
      }
    },
    getWordsFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    clearState: (state) => {
      state.loading = false;
      state.result = [];
      state.words = [];
      state.error = undefined;
    },
  },
});

export const {
  getWordsRequest,
  getWordsSuccess,
  getWordsFail,
  saveResult,
  clearState,
} = rootSlice.actions;

export default rootSlice.reducer;
