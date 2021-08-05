import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateProduct, deleteProductInfo } from "../../../API/API";

/* ALLOWS TO EDIT THE PRICE AND STOCK,
 DELETE A SPECIFIC PRODUCT SIZE OR COLOR */

export const ProductInfoUpdate = (props) => {
  const [editProduct, setEditProduct] = useState(false);
  const [quantity, setQuantity] = useState(props.quantity);

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

      <Button
        className="bg-primary my-1"
        onClick={() => {
          const edit = updateProduct(
            props.id,
            props.size,
            quantity,
            props.color,
            props.description
          );
          if (edit) {
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
            if (deleted.status === 500) {
              alert(deleted.msg);
            } else {
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
