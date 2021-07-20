import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateProduct } from "../../../API/API";

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
        <Label>Stock</Label>
        <Input value={quantity} onChange={quantityHandler} type="number" />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input value={price} onChange={priceHandler} type="number" />{" "}
      </FormGroup>
      <Button
        className="bg-primary my-1"
        onClick={() => {
          // TODO FIX THIS
          updateProduct(
            props.id,
            props.size,
            props.quantity,
            props.price,
            props.color,
            props.description
          );
          setEditProduct(!editProduct);
        }}
      >
        Add
      </Button>
    </Form>
  ) : (
    <div className="border border-dark m-1">
      <p>Size: {props.size}</p>
      <p>Color: {props.color}</p>
      <p>Stock: {props.quantity}</p>
      <p>Price: {props.price}</p>
      <Button
        className="bg-primary mb-1"
        onClick={() => setEditProduct(!editProduct)}
      >
        Edit
      </Button>
    </div>
  );
};
