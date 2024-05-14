import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiClient from "../assets/js/ApiClient";
import { success } from "../assets/js/SweetCustom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;
    const formData = {
      password: password,
      passwordResetToken: searchParams.get("token"),
    };
    const resp = await ApiClient.post("/update-password", formData).catch(
      (err) => {
        return err;
      }
    );

    success("Update password success!", "");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Reset password!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          ref={passwordRef}
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Enter Your Password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          ref={rePasswordRef}
                          type="password"
                          className="form-control form-control-user"
                          id="rePassword"
                          placeholder="Confirm your password"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Reset password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
