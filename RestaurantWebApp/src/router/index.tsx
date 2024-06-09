import { useEffect } from 'react'
import { Layout } from 'antd'
import AuthRouter from "./AuthRouter"
import {  useAppSelector } from '@/redux/redux-hook'
import { selectUserInfo } from '@/redux/slicers/userSlice'

const Router = () => {
  // const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    console.log(userInfo)

  }, [])
 
  return (
    <Layout>
      <AuthRouter />
    </Layout>
  )
}

export default Router
