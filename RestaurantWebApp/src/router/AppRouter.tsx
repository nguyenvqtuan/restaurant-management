import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

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
    <Routes>
      <Route path="/settings" element={
        <PrivateRoute>
          <Setting />
        </PrivateRoute>
      } />
      <Route Component={Login} path="/login" />
      <Route Component={Forgot} path="/forgot" />
      <Route Component={Signup} path="/signup" />
    </Routes>
  )
}

export default AppRouter
