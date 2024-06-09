import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/redux/redux-hook"
import { selectUserInfo } from "@/redux/slicers/userSlice"

interface Props {
  children?: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const userInfo = useAppSelector(selectUserInfo)
  console.log(userInfo.isLoggedIn)
  return userInfo.isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default PrivateRoute