import { createContext, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./component/user/Login";
import Signup from "./component/user/Signup";
import ForgotPassword from "./component/user/ForgotPassword";
import VerifiyToken from "./component/user/VerifiyToken";
import ResetPassword from "./component/user/ResetPassword";
import Home from "./Home";
import ManageUser from "./component/user/manage_user/ManageUser";
import UpdateProfile from "./component/user/manage_user/UpdateProfile";
import Logout from "./component/user/Logout";

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState({});
  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-token" element={<VerifiyToken />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<ManageUser />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
