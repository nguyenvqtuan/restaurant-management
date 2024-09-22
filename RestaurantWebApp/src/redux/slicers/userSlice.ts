import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/index';
import { UserInfo } from '@/types/user';

export interface UserState {
  user: UserInfo;
}

const initialState: UserState = {
  user: {} as UserInfo,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {} as UserInfo;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.auth.user;

export default userSlice.reducer;
