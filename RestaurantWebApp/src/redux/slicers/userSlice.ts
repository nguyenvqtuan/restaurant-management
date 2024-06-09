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
    isLoggedIn: '',
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.UserInfo = action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions

export const selectUserInfo = (state: RootState) => state.user.UserInfo

export default userSlice.reducer 
