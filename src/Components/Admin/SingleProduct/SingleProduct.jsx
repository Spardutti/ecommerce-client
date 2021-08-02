import { useState, useEffect } from "react";
import {
  productDetail,
  deleteProduct,
  deleteProductImage,
  updateDescription,
} from "../../../API/API";
import { Col, Row, Button, Input } from "reactstrap";
import { ProductInfoUpdate } from "./ProductInfoUpdate";
import uniqid from "uniqid";
import { AddProductImage } from "./AddProductImage";
import { NewInfoForm } from "./NewInfoForm";
import { Redirect } from "react-router";

/*  DISPLAY A SINGLE PRODUCT, WITH ALL THE INFO. ALLOWS TO
DELETE THE PRODUCT, ADD NEW INFO OR ADD NEW IMAGES */

export const SingleProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [showImageForm, setShowImageForm] = useState(false);
  const [newInfoForm, setNewInfoForm] = useState(false);
  const [productDeleted, setProductDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionForm, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [countDown, setCountDown] = useState(5);
  const [countDownOver, setCountDownOver] = useState(false);

  // TOGGLE ADD IMAGE FORM
  const toggleForm = () => {
    setShowImageForm(!showImageForm);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  // TOGGLE ADD NEW INFO FORM
  const toggleInfoForm = () => {
    setNewInfoForm(!newInfoForm);
  };

  // TOGGLE DESCRIPTION FORM
  const toggleDescription = () => {
    setShowDescription(!descriptionForm);
  };

  // GET THE ID FROM URL
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setProductId(id);
  }, []);

  // FETCH THE PRODUCT
  useEffect(() => {
    if (productId) {
      (async () => {
        setProduct(await productDetail(productId));
      })();
    }
  }, [productId]);

  // GET THE DESCRIPTION
  useEffect(() => {
    setDescription(product.description);
  }, [product]);

  useEffect(() => {
    if (countDown === 0) {
      setCountDown(0);
      setCountDownOver(true);
    }

    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  }, [countDown]);

  return productId ? (
    product.details ? (
      <div className="container mt-5 bg-light">
        <Row>
          <Col xs={6} className=" bg-light ">
            <h1 className="text-center">{product.name}</h1>
            {descriptionForm ? (
              <div className="text-center">
                <Input
                  value={description}
                  placeholder={description}
                  onChange={descriptionHandler}
                />
                <Button
                  className="bg-primary mt-2"
                  onClick={() => {
                    updateDescription(productId, description);
                    toggleDescription();
                  }}
                >
                  update
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p>{description}</p>
                <i onClick={toggleDescription} className="far fa-edit"></i>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-around">
              <Button className="bg-primary mb-1" onClick={toggleInfoForm}>
                {newInfoForm ? "Hide" : "Add new info"}
              </Button>
              <Button
                className="bg-danger mb-1"
                onClick={async () => {
                  // TODO REMOVE FROM ALL USERS CART
                  await deleteProduct(productId);
                  setProductDeleted(true);
                }}
              >
                Delete product
              </Button>
            </div>
            {newInfoForm ? (
              <NewInfoForm
                newInfoForm={newInfoForm}
                setNewInfoForm={setNewInfoForm}
                id={productId}
                setProduct={setProduct}
                product={product}
              />
            ) : null}
            <Row>
              {product.details.map((elem, index) => {
                const { price, color, size, quantity } = elem;
                return (
                  <Col xs={6} className="text-center" key={uniqid()}>
                    <ProductInfoUpdate
                      price={price}
                      color={color}
                      size={size}
                      quantity={quantity}
                      id={productId}
                      index={index}
                      setProduct={setProduct}
                      product={product}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col xs={6} className="mx-auto text-center">
            <Row>
              {product.images.map((image, index) => {
                return (
                  <Col xs={6} className="mx-auto" key={uniqid()}>
                    <img className="w-100 h-75 p-2 " src={image.url} alt="" />
                    {isLoading ? (
                      <div className="spinner-grow" role="status"></div>
                    ) : (
                      <Button
                        className="bg-danger"
                        onClick={async () => {
                          setIsLoading(true);
                          const updatedProduct = await deleteProductImage(
                            index,
                            productId
                          );
                          setProduct(updatedProduct);
                          setIsLoading(false);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </Col>
                );
              })}
            </Row>
            {product.images.length === 5 ? null : (
              <Button className="bg-primary mb-2" onClick={toggleForm}>
                {showImageForm ? "hide" : "Add product image"}
              </Button>
            )}
            {showImageForm ? (
              <AddProductImage
                product={product}
                setProduct={setProduct}
                id={productId}
                hideForm={toggleForm}
              />
            ) : null}
          </Col>
        </Row>
        {productDeleted ? <Redirect to="/#/admin-productos" /> : null}
      </div>
    ) : (
      <p>loading</p>
    )
  ) : (
    <div className="text-center mt-5">
      <h5>Product not found</h5>
      <p>Redirecting in: {countDown}</p>
      {countDownOver ? <Redirect to="/#/admin-productos" /> : null}
    </div>
  );
};
