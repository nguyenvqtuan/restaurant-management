import React, { lazy} from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

const Login = lazy(() => 
  import(/*webpackChunkName:'LoginPage'*/ "@/pages/Login")
)

const AuthRouter = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route path="/login" component={Login} exact />
    </Switch>
  )
}

export default AuthRouter