import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PageLoader from '@/components/PageLoader'

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

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />
        <Route Component={Login} path="/login" />
        <Route Component={Forgot} path="/forgot" />
        <Route Component={Signup} path="/signup" />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
