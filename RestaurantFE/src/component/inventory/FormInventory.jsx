import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { success, error } from "../../assets/js/SweetCustom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormInventory = ({ show, handleClose, id, fetchInventory }) => {
  const axiosPrivate = useAxiosPrivate();
  const [inventoryType, setInventoryType] = useState();
  const [inventory, setInventory] = useState();
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const inventoryTypeRef = useRef();

  useEffect(() => {
    fetchInventoryType();
  }, []);

  useEffect(() => {
    getInventory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    const inventoryTypeSelect = inventoryTypeRef.value;
    const formData = {
      id,
      name,
      price,
      quantity,
      inventoryType: inventoryTypeSelect,
    };
    const resp = await axiosPrivate
      .post("/inventory", formData)
      .catch((err) => {
        error(err.repsonse.data.message);
      });

    handleClose();
    if (resp?.status == 200 || resp?.status == 201) {
      success(resp.data);
      fetchInventory();
    }
  };

  const fetchInventoryType = async () => {
    const resp = await axiosPrivate.get("/inventory-type");

    if (resp?.status == 200) {
      setInventoryType(resp.data);
    }
  };

  const getInventory = async () => {
    const resp = await axiosPrivate.get(`/inventory/${id}`).catch((err) => {
      error(err.response.data.message);
    });
    if (resp?.status == 200) {
      setInventory(resp.data);
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (id == 0) return;
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
          <div className="form-group mb-3">
            <label for="floatingInput">Inventory Name</label>
            <input
              name="name"
              className="form-control"
              onChange={handleInputChange}
              ref={nameRef}
              value={inventory?.name}
            />
          </div>
          <div className="form-group mb-3">
            <label for="floatingInput">Price</label>
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
          <div className="form-group mb-3">
            <label for="floatingInput">Quantity</label>
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
          <div className="form-group mb-3">
            <label for="floatingInput">Inventory type</label>
            <select
              name="inventoryType"
              className="form-control"
              onChange={handleInputChange}
              ref={inventoryTypeRef}
              value={inventoryType?.id}
            >
              {inventoryType?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
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
