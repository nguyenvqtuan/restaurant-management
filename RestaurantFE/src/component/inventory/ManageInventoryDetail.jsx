import React, { useEffect, useState } from "react";
import Slidebar from "../common/Slidebar";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { success, error } from "../../assets/js/SweetCustom";
import { Button } from "react-bootstrap";
import FormInventoryType from "./FormInventoryType";

const ManageInventoryDetail = (inventoryId) => {
  const [id, setId] = useState(0);
  const [inventoryDetail, setInventoryDetail] = useState();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    fetchInventoryType();
  }, []);

  const fetchInventoryDetail = async () => {
    const resp = await axiosPrivate.get(`/inventory/${inventoryId}/detail`);
    setInventoryType(resp.data);
  };

  const handleDelete = async (id) => {
    const resp = await axiosPrivate
      .delete(`/inventory/${inventoryId}/detail/${id}`)
      .catch((err) => {
        error("Inventory Detail", err.response.data.message);
      });

    if (resp?.status == 200) {
      success("Inventory Detail", resp.data);
      fetchInventoryDetail();
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShowForm = (id) => {
    setShow(true);
    setId(id);
  };

  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary d-inline">
                Inventory type table
              </h6>

              <Button
                variant="primary"
                className="float-right"
                onClick={() => handleShowForm(0)}
              >
                Create new inventory detail
              </Button>
              <FormInventoryDetail
                show={show}
                handleClose={handleClose}
                id={id}
              />
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
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Created at</th>
                      <th>Updated at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Created at</th>
                      <th>Updated at</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {inventoryDetail?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleShowForm(item.id)}
                          >
                            Update
                          </Button>
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

export default ManageInventoryDetail;
