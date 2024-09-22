import { useEffect } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router';
import AppRouter from './AppRouter';
import Header from '@/layout/app/Header';
import Sidebar from '@/layout/app/Sidebar';
import Footer from '@/layout/app/Footer';
import usePrivateApi from '@/hooks/usePrivateApi';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hook';
import { logout, selectUserInfo } from '@/redux/slicers/userSlice';

const Router = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    usePrivateApi.interceptors.request.use(
      (config) => {
        if (userInfo) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    usePrivateApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }
    );
  }, [dispatch, navigate, userInfo]);

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
    );
  else
    return (
      <Layout>
        <AppRouter />
      </Layout>
    );
};

export default Router;
