import React, { useEffect } from "react";
import ApiClient from "../../assets/js/ApiClient";
import { useSearchParams, useNavigate } from "react-router-dom";
import { success, error } from "../../assets/js/SweetCustom";

const title = "Verify token";

const VerifiyToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    vertify();
  }, []);

  const vertify = async () => {
    const resp = await ApiClient.get(
      "/verify-token?token=" + searchParams.get("token")
    ).catch((err) => {
      error(title, err.response.data.message);
    });

    const status = resp?.status;
    if (status == 200) {
      success(title, resp.data);
      navigate("/reset-password?token=" + searchParams.get("token"));
    } else {
      navigate("/login");
    }
  };

  return;
};

export default VerifiyToken;
