import { useEffect } from 'react'
import { Layout } from 'antd'

import { useAppDispatch, useAppSelector } from '@/redux/redux-hook'
import { selectUserInfo, setUserInfo } from '@/redux/slicers/userSlice'
import AppRouter from "./AppRouter"
import AuthRouter from "./AuthRouter"

const Router = () => {
  // const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(userInfo)
    const result = {
      username: "admin",
      password: "123",
      isLoggedIn: false,
    }
    dispatch(setUserInfo(result))
  }, [])
 
  if (userInfo?.isLoggedIn) 
    return (
      <Layout>
        <AppRouter />
      </Layout>
    )
  else
    return (
      <Layout>
        <AuthRouter />
      </Layout>
    )
}

export default Router
