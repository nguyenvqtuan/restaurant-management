import React, { useContext } from "react";
import Slidebar from "../../common/Slidebar";
import Topbar from "../../common/Topbar";
import Footer from "../../common/Footer";
import { AuthContext } from "../../App";
import FormUpdateUser from "./FormUpdateUser";

const UpdateProfile = () => {
  const auth = useContext(AuthContext);
  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Update profile</h1>
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-header pt-2">User</div>
                  <div className="card-body p-4">
                    <FormUpdateUser />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
