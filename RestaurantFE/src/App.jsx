import { createContext, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Signup from "./user/Signup";
import ForgotPassword from "./user/ForgotPassword";
import VerifiyToken from "./user/VerifiyToken";
import ResetPassword from "./user/ResetPassword";
import Home from "./Home";
import ManageUser from "./user/ManageUser";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-token" element={<VerifiyToken />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<ManageUser />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
