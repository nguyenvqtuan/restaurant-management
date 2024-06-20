import { useEffect } from 'react'
import { Layout } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hook'
import { selectUserInfo, login } from '@/redux/slicers/userSlice'
import AppRouter from "./AppRouter"
import Other from '@/layout/Other'
import BreadCrum from '@/components/BreadCrumb'

const Router = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {

    // TODO call api get user
    const result = {
      username: "admin",
      password: "123",
      isLoggedIn: true,
    }

    dispatch(login(result))
  }, [])

  if (userInfo?.isLoggedIn)
    return (
      <Layout>
        <BreadCrum />
        <AppRouter />
      </Layout>
    )
  else
    return (
      <Layout>
        <AppRouter />
      </Layout>
    )
}

export default Router
