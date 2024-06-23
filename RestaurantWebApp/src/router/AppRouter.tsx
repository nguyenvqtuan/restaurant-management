import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '@/pages/app/Dashboard'
import Order from '@/pages/app/Order'
import Menu from '@/pages/app/Menu'
import routes from './routes'

const Login = lazy(() =>
  import("@/pages/auth/Login")
)

const Signup = lazy(() =>
  import("@/pages/auth/Signup")
)

const Forgot = lazy(() =>
  import("@/pages/auth/Forgot")
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
        {routes.map((route) => (
          <Route
            path={route.path}
            key={route.title}
            element={<PrivateRoute> <route.element /> </PrivateRoute>}
          >
          </Route>
        ))}
        <Route Component={Login} path="/login" />
        <Route Component={Forgot} path="/forgot" />
        <Route Component={Signup} path="/signup" />
        <Route Component={Page404} path="*" />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
