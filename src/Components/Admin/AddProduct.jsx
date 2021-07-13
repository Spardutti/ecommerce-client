import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories, addNewProduct } from "../../API/API";
import { useState, useEffect } from "react";
import uniqid from "uniqid";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productErrors, setProductErrors] = useState("");

  // TODO ADD DESCRIPTION

  const nameHandler = (e) => {
    setProductName(e.target.value);
  };

  const categoryHandler = (e) => {
    const index = e.target.selectedIndex;
    const element = e.target.options[index];
    setCategoryId(element.id);
  };

  const priceHandler = (e) => {
    setProductPrice(e.target.value);
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
      <div className=" mb-2">
        <div className="text-center">
          <Button className="bg-primary" onClick={productForm}>
            Hide
          </Button>
        </div>
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
            <Label>Product price</Label>
            <Input
              type="number"
              name="productPrice"
              autoComplete="off"
              value={productPrice}
              onChange={priceHandler}
              placeholder="Enter product price"
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
                const result = await addNewProduct(
                  productName,
                  categoryId,
                  productPrice
                );
                if (result.status === 500) setProductErrors(result.data);
                // TODO redirect to product page on sucess
                else {
                  console.log(result);
                  setProductPrice("");
                  setProductName("");
                  setCategoryId("");
                }
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
