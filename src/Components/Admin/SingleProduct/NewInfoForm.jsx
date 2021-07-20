import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { updateProduct } from "../../../API/API";

export const NewInfoForm = (props) => {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const sizeHandler = (e) => {
    setSize(e.target.value);
  };
  return (
    //TODO WORKING HERE
    <Form>
      <FormGroup>
        <Label>Size</Label>
        <Input value={size} onChange={sizeHandler} placeholder="Product size" />
      </FormGroup>
      <FormGroup>
        <Label>Color</Label>
        <Input value={color} />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input value={quantity} onChange={quantityHandler} type="number" />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input value={price} onChange={priceHandler} type="number" />{" "}
      </FormGroup>
      <Button
        className="bg-primary my-1"
        onClick={() => {
          if (size && quantity && price && color) {
            const edit = updateProduct(props.id, size, quantity, price, color);
            if (edit) {
              setPrice(price);
              props.setNewInfoForm(!props.newInfoForm);
            }
          } else alert("please fill all fields");
          // TODO UPDATE THE DOM
        }}
      >
        Add new info
      </Button>
    </Form>
  );
};
