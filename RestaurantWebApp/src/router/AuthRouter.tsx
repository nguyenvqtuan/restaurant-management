import React, { lazy} from 'react'
import { Route } from 'react-router-dom'

const Login = lazy(() => 
  import(/*webpackChunkName:'LoginPage'*/ "@/pages/Login")
)

const AuthRouter = () => {
  // const location = useLocation();

  return (
    // <Route action key={location.pathname}>
      <> need to login</>
    // </Route>
  )
}

export default AuthRouter
