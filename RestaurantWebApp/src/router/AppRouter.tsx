import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import routes from './routes';
import { CContainer } from '@coreui/react';

const Login = lazy(() => import('@/pages/auth/Login'));

const Signup = lazy(() => import('@/pages/auth/Signup'));

const Forgot = lazy(() => import('@/pages/auth/Forgot'));

const Page404 = lazy(() => import('@/pages/Page404'));

const PageLoader = lazy(() => import('@/components/PageLoader'));

const AppRouter = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.title}
              element={
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              }
            ></Route>
          ))}
          <Route Component={Login} path="/login" />
          <Route Component={Forgot} path="/forgot" />
          <Route Component={Signup} path="/signup" />
          <Route Component={Page404} path="*" />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default AppRouter;
