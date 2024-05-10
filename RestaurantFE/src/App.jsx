import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Signup from "./user/Signup";
import ForgotPassword from "./user/ForgotPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
