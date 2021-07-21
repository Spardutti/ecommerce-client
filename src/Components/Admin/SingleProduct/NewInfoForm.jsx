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

  const colorHandler = (e) => {
    setColor(e.target.value);
  };

  const resetValues = () => {
    setColor("");
    setPrice(0);
    setSize("");
    setQuantity(0);
  };
  return (
    //TODO WORKING HERE
    <Form>
      <FormGroup>
        <Label>Size</Label>
        <Input
          autoComplete="off"
          value={size}
          onChange={sizeHandler}
          placeholder="Product size"
        />
      </FormGroup>
      <FormGroup>
        <Label>Color</Label>
        <Input
          autoComplete="off"
          value={color}
          onChange={colorHandler}
          placeholder="Product color"
        />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input
          autoComplete="off"
          value={quantity}
          onChange={quantityHandler}
          type="number"
          placeholder="Enter product quantity"
          onFocus={() => setQuantity("")}
        />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input
          autoComplete="off"
          value={price}
          onChange={priceHandler}
          type="number"
          placeholder="Enter product price"
          onFocus={() => setPrice("")}
        />{" "}
      </FormGroup>
      <div className="text-center">
        <Button
          className="bg-primary my-1"
          onClick={async () => {
            if (size && quantity && price && color) {
              const edit = await updateProduct(
                props.id,
                size,
                quantity,
                price,
                color
              );
              if (edit) {
                let product = props.product;
                product.details.push(edit.data);
                props.setProduct(product);
                resetValues();
                props.setNewInfoForm(!props.newInfoForm);
              }
            } else alert("please fill all fields");
            // TODO UPDATE THE DOM
          }}
        >
          Add new info
        </Button>
      </div>
    </Form>
  );
};
