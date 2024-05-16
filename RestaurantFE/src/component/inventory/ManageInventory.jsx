import React from "react";

const ManageInventory = () => {
  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">User table</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="dataTable"
                  className="table table-bordered"
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
                            <i className="fas">
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
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ManageInventory;
