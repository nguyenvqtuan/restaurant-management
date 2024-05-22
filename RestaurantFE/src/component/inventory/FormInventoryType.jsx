import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { success, error } from "../../assets/js/SweetCustom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormInventoryType = ({ show, handleClose, id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [inventoryType, setInventoryType] = useState();
  const nameRef = useRef();

  useEffect(() => {
    getInventoryType();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const formData = {
      id,
      name,
    };
    const resp = await axiosPrivate
      .post("/inventory-type", formData)
      .catch((err) => {
        error(err.repsonse.data.message);
      });

    handleClose();
    if (resp?.status == 200) {
      success(resp.data);
    }
  };

  const getInventoryType = async () => {
    const resp = await axiosPrivate
      .get(`/inventory-type/${id}`)
      .catch((err) => {
        error(err.response.data.message);
      });
    if (resp?.data != null) setInventoryType(resp.data);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInventoryType(value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Inventory Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="hidden" value={id} />
          </div>
          <div className="form-group">
            <input
              value={inventoryType?.name}
              name="name"
              onChange={handleInputChange}
              ref={nameRef}
              type="text"
              className="form-control form-control-user"
              id="name"
              placeholder="Enter name"
            />
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

export default FormInventoryType;
