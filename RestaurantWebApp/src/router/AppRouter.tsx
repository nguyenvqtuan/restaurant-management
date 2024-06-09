import { lazy} from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const Login = lazy(() => 
  import("@/pages/Login")
)

const Setting = lazy(() =>
  import("@/pages/Setting")
)

const AppRouter = () => {
  // const location = useLocation();

  return (
    <Routes>
      <Route path="/settings" element={ 
        <PrivateRoute> 
          <Setting /> 
        </PrivateRoute> 
      } />
      <Route Component={Login} path="/login" />
    </Routes>
  )
}

export default AppRouter
