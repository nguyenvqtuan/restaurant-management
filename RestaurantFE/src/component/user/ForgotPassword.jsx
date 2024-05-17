import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../../assets/js/ApiClient";
import { info } from "../../assets/js/SweetCustom";

const ForgotPassword = () => {
  const userNameRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;

    const resp = await ApiClient.get(
      "/reset-password?userName=" + userName
    ).catch((err) => {
      return err;
    });

    info(
      "Reset Password",
      "Please check your mail. We had sent a email reset password!"
    );
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
                      <h1 className="h4 text-gray-900 mb-4">
                        Forgot password!
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          ref={userNameRef}
                          type="email"
                          className="form-control form-control-user"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Reset password
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link to="/login" className="small">
                        Login with account
                      </Link>
                    </div>
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

export default ForgotPassword;
