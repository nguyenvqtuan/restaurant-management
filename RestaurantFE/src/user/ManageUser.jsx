import React, { useContext, useEffect, useState } from "react";
import Slidebar from "../common/Slidebar";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { AuthContext } from "../App";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { success, error } from "../assets/js/SweetCustom";

const ManageUser = () => {
  const auth = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState();
  const [listRole, setListRole] = useState();

  useEffect(() => {
    fetchUser();
  }, [user]);

  useEffect(() => {
    fetchListRole();
  }, []);

  const fetchUser = async () => {
    const resp = await axiosPrivate.get("/user").then((e) => e.data);
    setUser(resp);
  };

  const fetchListRole = async () => {
    const resp = await axiosPrivate.get("/user/list-role").then((e) => e.data);
    setListRole(resp);
  };

  const handleActive = async (userName) => {
    const resp = await axiosPrivate
      .put(`/user/${userName}/active`)
      .catch((err) => {
        error("User", err.response.data.message);
      });
    if (resp?.status == 200) {
      success("User", resp.data);
    }
  };

  const handleDelete = async (id) => {
    const resp = await axiosPrivate.delete(`/user/${id}`).catch((err) => {
      error("User", err.response.data.message);
    });

    if (resp?.status == 200) {
      success("User", resp.data);
      fetchUser();
    }
  };

  const handleUpdateRole = async (role, userName) => {
    const resp = await axiosPrivate
      .put(`/user/update-role?userName=${userName}&role=${role}`)
      .catch((err) => {
        error(err.response.data.message);
      });

    if (resp.status == 200) {
      success("User", resp.data);
    }
  };

  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content">
        <Topbar />
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">User table</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>User name</th>
                    <th>Full name</th>
                    <th>Birth date</th>
                    <th>Enabled</th>
                    <th>Role</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>User name</th>
                    <th>Full name</th>
                    <th>Birth date</th>
                    <th>Enabled</th>
                    <th>Role</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {user?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.userName}</td>
                      <td>{item.fullName}</td>
                      <td>{item.birthDate}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            handleActive(item.userName, item.enabled ? 0 : 1)
                          }
                        >
                          <i className="fas ">
                            {item.enabled == 1 ? "Disable" : "Enable"}
                          </i>
                        </button>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={item.role}
                          onChange={(e) =>
                            handleUpdateRole(e.target.value, item.userName)
                          }
                        >
                          {listRole?.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-circle"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ManageUser;
