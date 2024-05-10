import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="fullName"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="pasword"
                          placeholder="Enter your Password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-user"
                          id="birthDate"
                        />
                      </div>
                      <a
                        href="index.html"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </a>
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
