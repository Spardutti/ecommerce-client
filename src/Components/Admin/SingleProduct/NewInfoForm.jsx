import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { updateProduct } from "../../../API/API";

/* FORM TO ADD A NEW PRODUCT DETAIL, MEANING A NEW COLOR,
SIZE, PRICE AND STOCK */

export const NewInfoForm = (props) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const sizeHandler = (e) => {
    setSize(e.target.value);
  };

  const colorHandler = (e) => {
    setColor(e.target.value);
  };

  const resetValues = () => {
    setColor("");
    setSize("");
    setQuantity(0);
  };
  return (
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

      <div className="text-center">
        <Button
          className="bg-primary my-1"
          onClick={async () => {
            if (size && quantity && color) {
              const edit = await updateProduct(props.id, size, quantity, color);
              if (edit) {
                let product = props.product;
                product.details.push(edit.data);
                props.setProduct(product);
                resetValues();
                props.setNewInfoForm(!props.newInfoForm);
              }
            } else alert("please fill all fields");
          }}
        >
          Add new info
        </Button>
      </div>
    </Form>
  );
};
