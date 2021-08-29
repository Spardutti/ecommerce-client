import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories, addNewProduct } from "../../API/API";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import uniqid from "uniqid";

/* ADDS A NEW PRODUCT WITH ALL THE DETAILS AND 1 IMAGE, 
MORE IMAGES CAN BE ADDED LATER. REDIRECTS TO SINGLEPRODUCT */

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productErrors, setProductErrors] = useState();
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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

  const sizeHandler = (e) => {
    setSize(e.target.value);
  };

  const colorHandler = (e) => {
    setColor(e.target.value);
  };

  const stockHandler = (e) => {
    setQuantity(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const productForm = () => {
    setShowProductForm(!showProductForm);
    resetState();
  };

  const resetState = () => {
    setCategoryId("");
    setProductName("");
    setProductPrice(0);
    setColor("");
    setQuantity(0);
    setSize("");
    setDescription("");
  };

  // GET ALL CATEGORIES
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
        <Form encType="multipart/form-data">
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
            <Label>Product description</Label>
            <Input
              name="description"
              autoComplete="off"
              value={description}
              onChange={descriptionHandler}
              placeholder="brief description"
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
              onFocus={() => setProductPrice("")}
            />
          </FormGroup>
          <FormGroup>
            <Label>Product size</Label>
            <Input
              name="size"
              autoComplete="off"
              value={size}
              placeholder="enter product size"
              onChange={sizeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Product color</Label>
            <Input
              name="color"
              autoComplete="off"
              value={color}
              placeholder="enter product color"
              onChange={colorHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Product stock</Label>
            <Input
              type="number"
              name="quantity"
              autoComplete="off"
              value={quantity}
              placeholder="enter product quantity/stock"
              onChange={stockHandler}
              onFocus={() => setQuantity("")}
            />
          </FormGroup>
          <FormGroup>
            <Label>Product picture</Label>
            <div>
              <Input type="file" name="image" onChange={imageHandler} />
            </div>
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
            {loading ? (
              <div className="spinner-grow" role="status"></div>
            ) : (
              <Button
                className="bg-primary"
                onClick={async () => {
                  setLoading(true);
                  const result = await addNewProduct(
                    productName,
                    categoryId,
                    productPrice,
                    color,
                    size,
                    quantity,
                    image,
                    description
                  );
                  setLoading(false);
                  if (result.status === 500) {
                    setProductErrors(result.data);
                  } else {
                    resetState();
                    setProductId(result.data._id);
                  }
                }}
              >
                Add product
              </Button>
            )}
          </FormGroup>
        </Form>
        {productId ? (
          <Redirect to={"/ecommerce-client/product?" + productId} />
        ) : null}
      </div>
    )
  ) : (
    <p>loading</p>
  );
};
