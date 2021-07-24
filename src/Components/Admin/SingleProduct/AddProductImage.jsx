import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { addImagesToProduct } from "../../../API/API";

// ADD PRODUCTS IMAGE

export const AddProductImage = (props) => {
  const [images] = useState(props.product.images);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagex, setImage] = useState();

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    let count = [];
    for (let i = images.length; i < 5; i++) {
      count.push(i);
    }
    setImagesToAdd(count);
  }, []);

  return (
    <Form>
      {imagesToAdd.map((elem) => {
        return (
          <FormGroup key={elem}>
            <Label>Product picture</Label>
            <div>
              <Input type="file" name="image" onChange={imageHandler} />
            </div>
          </FormGroup>
        );
      })}
      <Button
        onClick={async () => {
          // UPDATE THE IMGS ARR DISPLAY THE NEW IMAGES!
          const added = await addImagesToProduct(props.id, imagex);
          let product = props.product;
          product.images = added;
          console.log(product.images);
          if (added) {
            props.setProduct(product);
          }
        }}
      >
        add
      </Button>
    </Form>
  );
};
