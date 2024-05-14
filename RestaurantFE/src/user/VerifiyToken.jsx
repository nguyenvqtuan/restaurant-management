import React, { useEffect } from "react";
import ApiClient from "../assets/js/ApiClient";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifiyToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    vertify();
  }, []);

  const vertify = async () => {
    const resp = await ApiClient.get(
      "/verify-token?token=" + searchParams.get("token")
    );

    const status = resp.status;
    if (status == 200) {
      navigate("/reset-password?token=" + searchParams.get("token"));
    } else {
      navigate("/home");
    }
  };

  return;
};

export default VerifiyToken;
