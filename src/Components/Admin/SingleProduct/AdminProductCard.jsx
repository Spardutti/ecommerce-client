import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateProduct, deleteProductInfo } from "../../../API/API";

export const AdminCard = (props) => {
  const [editProduct, setEditProduct] = useState(false);
  const [price, setPrice] = useState(props.price);
  const [quantity, setQuantity] = useState(props.quantity);

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };
  return editProduct ? (
    <Form>
      <FormGroup>
        <Label>Size: {props.size}</Label>
      </FormGroup>
      <FormGroup>
        <Label>Color: {props.color}</Label>
      </FormGroup>
      <FormGroup>
        <Label>Quantity to add to stock</Label>
        <Input value={quantity} onChange={quantityHandler} type="number" />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input value={price} onChange={priceHandler} type="number" />{" "}
      </FormGroup>
      <Button
        className="bg-primary my-1"
        onClick={() => {
          const edit = updateProduct(
            props.id,
            props.size,
            quantity,
            price,
            props.color,
            props.description
          );
          // TODO UPDATE THE DOM
          if (edit) {
            setPrice(price);
            setEditProduct(!editProduct);
          }
        }}
      >
        Add
      </Button>
    </Form>
  ) : (
    <div className="border border-dark m-1">
      <p>Size: {props.size}</p>
      <p>Color: {props.color}</p>
      <p>Stock: {quantity}</p>
      <p>Price: {price}</p>
      <div className="d-flex justify-content-around">
        <Button
          className="bg-primary mb-1"
          onClick={() => setEditProduct(!editProduct)}
        >
          Edit
        </Button>
        <Button
          className="bg-danger mb-1"
          onClick={async () => {
            const deleted = await deleteProductInfo(props.id, props.index);
            if (deleted) {
              let product = deleted;
              props.setProduct(product);
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
