import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { success, error } from "../../assets/js/SweetCustom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormInventory = ({ show, handleClose, id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [inventory, setInventory] = useState();
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    getInventory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    const formData = {
      id,
      name,
      price,
      quantity,
    };
    const resp = await axiosPrivate
      .post("/inventory", formData)
      .catch((err) => {
        error(err.repsonse.data.message);
      });

    handleClose();
    if (resp?.status == 200) {
      success(resp.data);
    }
  };

  const getInventory = async () => {
    const resp = await axiosPrivate.get(`/inventory/${id}`).catch((err) => {
      error(err.response.data.message);
    });
    if (resp?.data != null) setInventory(resp.data);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInventory((prevValue) => {
      prevValue[name] = value;
      return { ...prevValue };
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="hidden" value={id} />
          </div>
          <div className="form-group">
            <input
              value={inventory?.name}
              name="name"
              onChange={handleInputChange}
              ref={nameRef}
              type="text"
              className="form-control form-control-user"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <input
              value={inventory?.price}
              name="price"
              onChange={handleInputChange}
              ref={priceRef}
              type="number"
              className="form-control form-control-user"
              id="price"
            />
          </div>
          <div className="form-group">
            <input
              value={inventory?.quantity}
              ref={quantityRef}
              name="quantity"
              onChange={handleInputChange}
              type="number"
              className="form-control form-control-user"
              id="quantity"
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

export default FormInventory;
