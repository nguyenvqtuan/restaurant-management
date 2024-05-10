import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../assets/js/ApiClient";

const Signup = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const birthDayRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current.value;
    const birthDay = birthDayRef.current.value;
    const formData = {
      userName: userName,
      password: password,
      fullName: fullName,
      birthDayRef: birthDayRef.toString(),
    };
    const resp = await ApiClient.post("/v1/sign-up", formData).then((e) => e);

    if (resp.status == 201) {
      localStorage.setItem("token", resp.data.accessToken);
      navigate("/home");
    } else {
    }
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
                      <h1 className="h4 text-gray-900 mb-4">Sign up user!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          ref={userNameRef}
                          type="text"
                          className="form-control form-control-user"
                          id="userName"
                          placeholder="Enter User name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          ref={fullNameRef}
                          type="text"
                          className="form-control form-control-user"
                          id="fullName"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          ref={passwordRef}
                          type="password"
                          className="form-control form-control-user"
                          id="pasword"
                          placeholder="Enter your Password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          ref={birthDayRef}
                          type="date"
                          className="form-control form-control-user"
                          id="birthDate"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register
                      </button>
                      <hr />
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

export default Signup;
