import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/index"
import { UserInfo } from "@/types/user";

export interface UserState {
  UserInfo: UserInfo
}

const initialState: UserState = {
  UserInfo: {
    username: '',
    fullName: '',
    permission: [],
    token: '',
    isLoggedIn: false,
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.UserInfo = action.payload
    }
  }
})

export const { login } = userSlice.actions

export const selectUserInfo = (state: RootState) => state.user.UserInfo

export default userSlice.reducer 
