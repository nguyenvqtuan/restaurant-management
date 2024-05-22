import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { success, error } from "../../assets/js/SweetCustom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormInventory = ({ show, handleClose, id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [inventoryType, setInventoryType] = useState();
  const [inventory, setInventory] = useState();
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    fetchInventoryType();
  });

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

  const fetchInventoryType = async () => {
    const resp = axiosPrivate.get("/inventory-type");
    console.log(resp);
    if (resp?.status == 200) setInventoryType(resp.data);
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
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="hidden" value={id} />
          </div>
          <div className="form-group">
            <select
              name="name"
              className="form-control form-control-user"
              onChange={handleInputChange}
              ref={nameRef}
            >
              {inventoryType?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
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
