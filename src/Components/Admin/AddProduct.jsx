import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories } from "../../API/API";
import { useState, useEffect } from "react";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  const nameHandler = (e) => {
    setProductName(e.target.value);
  };

  const categoryHandler = (e) => {
    setProductCategory(e.target.value);
  };

  const productForm = () => {
    setShowProductForm(!showProductForm);
  };

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  return !showProductForm ? (
    <div className="text-center mb-2">
      <Button className="bg-primary" onClick={productForm}>
        Add new product
      </Button>
    </div>
  ) : (
    <div className="text-center mb-2">
      <Button className="bg-primary" onClick={productForm}>
        Ocultar
      </Button>
      <Form>
        <FormGroup>
          <Label>Agregar nuevo producto</Label>
          <Input
            name="productName"
            value={productName}
            placeholder="Nombre del producto"
            onChange={nameHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label>Categoria</Label>
          <Input
            type="select"
            name="category"
            onChange={categoryHandler}
            defaultValue={productCategory}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => {
              return (
                <option id={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup className="text-center mt-3">
          <Button
            onClick={() => {
              console.log(productName, productCategory);
            }}
          >
            Add
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
