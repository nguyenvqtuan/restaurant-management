import React, { useContext, useRef } from "react";
import { success, error } from "../../assets/js/SweetCustom";
import { AuthContext } from "../../App";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormUpdateUser = () => {
  const fullNameRef = useRef();
  const birthDateRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const birthDate = birthDateRef.current.value;
    const formData = {
      userName: auth.userName,
      fullName: fullName,
      birthDate: birthDate,
    };

    const resp = await axiosPrivate.post("/user", formData).catch((err) => {
      error(err.response.data.message);
    });

    if (resp?.status == 200) {
      success("Update profile success!");
    }
  };
  return (
    <form className="user" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{auth.userName}</label>
      </div>
      <div className="form-group">
        <label>{auth.role}</label>
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
          ref={birthDateRef}
          type="date"
          className="form-control form-control-user"
          id="birthDate"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-user btn-block">
        Update profile
      </button>
      <hr />
    </form>
  );
};

export default FormUpdateUser;
