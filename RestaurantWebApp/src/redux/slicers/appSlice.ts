import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/index";

export interface AppState {
  theme: string
}

const initialState: AppState = {
  theme: 'dark'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    }
  }
})

export const { setTheme } = appSlice.actions

export const selectTheme = (state: RootState) => state.app.theme

export default appSlice.reducer
