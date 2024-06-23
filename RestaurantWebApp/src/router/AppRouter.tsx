import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '@/pages/app/Dashboard'
import Order from '@/pages/app/Order'
import Menu from '@/pages/app/Menu'

const Login = lazy(() =>
  import("@/pages/auth/Login")
)

const Signup = lazy(() =>
  import("@/pages/auth/Signup")
)

const Forgot = lazy(() =>
  import("@/pages/auth/Forgot")
)

const Setting = lazy(() =>
  import("@/pages/Setting")
)

const Page404 = lazy(() =>
  import("@/pages/Page404")
)

const PageLoader = lazy(() =>
  import("@/components/PageLoader")
)

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        >
          <Route
            path="order"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          >
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>

        <Route Component={Login} path="/login" />
        <Route Component={Forgot} path="/forgot" />
        <Route Component={Signup} path="/signup" />
        <Route Component={Page404} path="*" />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
