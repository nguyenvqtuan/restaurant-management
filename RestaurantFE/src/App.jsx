import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Signup from "./user/Signup";
import ForgotPassword from "./user/ForgotPassword";
import VerifiyToken from "./user/VerifiyToken";
import ResetPassword from "./user/ResetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-token" element={<VerifiyToken />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
