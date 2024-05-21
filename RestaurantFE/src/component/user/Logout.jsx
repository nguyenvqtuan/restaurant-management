import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { success } from "../../assets/js/SweetCustom";
const Logout = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setAuth({});
    success("Logout success!", "");
    navigate("/login");
  }, []);

  return;
};

export default Logout;
