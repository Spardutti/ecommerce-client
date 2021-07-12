import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories, addNewProduct } from "../../API/API";
import { useState, useEffect } from "react";
import uniqid from "uniqid";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productErrors, setProductErrors] = useState("");

  const nameHandler = (e) => {
    setProductName(e.target.value);
  };

  const categoryHandler = (e) => {
    const index = e.target.selectedIndex;
    const element = e.target.options[index];
    setCategoryId(element.id);
  };

  const productForm = () => {
    setShowProductForm(!showProductForm);
  };

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
    return () => setCategories();
  }, []);

  return categories ? (
    !showProductForm ? (
      <div className="text-center mb-2">
        <Button className="bg-primary" onClick={productForm}>
          Add new product
        </Button>
      </div>
    ) : (
      <div className="text-center mb-2">
        <Button className="bg-primary" onClick={productForm}>
          Hide
        </Button>
        <Form>
          <FormGroup>
            <Label>Product name</Label>
            <Input
              name="productName"
              autoComplete="off"
              value={productName}
              placeholder="enter product name"
              onChange={nameHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Input
              type="select"
              name="category"
              onChange={categoryHandler}
              defaultValue={categoryId}
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
            {productErrors
              ? productErrors.map((err) => {
                  return (
                    <FormGroup key={uniqid()} className="mb-1">
                      <Label>{err.msg}</Label>
                    </FormGroup>
                  );
                })
              : null}
            <Button
              onClick={async () => {
                const result = await addNewProduct(productName, categoryId);
                if (result.status === 500) setProductErrors(result.data);
                // TODO redirect to product page on sucess
              }}
            >
              Add prdouct
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  ) : (
    <p>loading</p>
  );
};
