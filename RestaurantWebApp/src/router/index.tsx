import { useEffect } from 'react'
import { Layout } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hook'
import { selectUserInfo, login } from '@/redux/slicers/userSlice'
import AppRouter from "./AppRouter"
import Other from '@/layout/Other'
import BreadCrum from '@/components/BreadCrumb'
import Header from '@/layout/app/Header'
import Sidebar from '@/layout/app/Sidebar'
import Footer from '@/layout/app/Footer'

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
        <Sidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <Header />
          <div className="body flex-grow-1">
            <AppRouter />
          </div>
          <Footer />
        </div>
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
