import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { success, error } from "../../assets/js/SweetCustom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

const FormInventoryDetail = ({
  show,
  handleClose,
  id,
  fetchInventoryDetail,
}) => {
  const { inventoryId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [inventoryDetail, setInventoryDetail] = useState();
  const nameRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    getInventoryDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const status = statusRef.current.checked;
    const formData = {
      id,
      name,
      status,
      inventoryId,
    };
    const resp = await axiosPrivate
      .post(`/inventory/${inventoryId}/detail`, formData)
      .catch((err) => {
        error(err.repsonse.data.message);
      });

    handleClose();
    if (resp?.status == 200) {
      success(resp.data);
      fetchInventoryDetail();
    }
  };

  const getInventoryDetail = async () => {
    if (id == 0) return;
    console.log("123");
    const resp = await axiosPrivate
      .get(`/inventory/${inventoryId}/detail/${id}`)
      .catch((err) => {
        error(err.response.data.message);
      });
    if (resp?.data != null) setInventoryDetail(resp.data);
  };

  const handleInputChange = (e) => {
    if (id == 0) return;
    const { value, name } = e.target;
    setInventoryDetail(value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Inventory Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="hidden" value={id} />
          </div>
          <div className="form-group">
            <input
              value={inventoryDetail?.name}
              name="name"
              onChange={handleInputChange}
              ref={nameRef}
              type="text"
              className="form-control form-control-user"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div className="form-check">
            <input
              checked={inventoryDetail?.status}
              name="status"
              onChange={handleInputChange}
              ref={statusRef}
              type="checkbox"
              className="form-check-input form-control-user"
              id="status"
              placeholder="Enter status"
            />{" "}
            <label className="form-check-label">Using</label>
          </div>

          <hr />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormInventoryDetail;
