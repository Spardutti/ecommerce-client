import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { addImagesToProduct } from "../../../API/API";
// ADD PRODUCTS IMAGE

export const AddProductImage = (props) => {
  const [images] = useState(props.product.images);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagex, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imageHandler = (e) => {
    setImage((old) => [...old, e.target.files[0]]);
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
      {imagesToAdd.map((ele, index) => {
        return (
          <FormGroup className="mt-1" key={index}>
            <Label>Product picture</Label>
            <div>
              <Input
                type="file"
                multiple
                name="image"
                onChange={imageHandler}
              />
              <hr />
            </div>
          </FormGroup>
        );
      })}
      {isLoading ? (
        <div className="spinner-grow" role="status"></div>
      ) : (
        <Button
          className="bg-primary mb-2"
          onClick={async () => {
            setIsLoading(true);
            const updatedProduct = await addImagesToProduct(props.id, imagex);
            props.setProduct(updatedProduct);
            setIsLoading(false);
            props.hideForm();
          }}
        >
          add
        </Button>
      )}
    </Form>
  );
};
