import { useState, useEffect } from "react";
import {
  productDetail,
  deleteProduct,
  deleteProductImage,
} from "../../../API/API";
import { Col, Row, Button } from "reactstrap";
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

  // TOGGLE ADD IMAGE FORM
  const toggleForm = () => {
    setShowImageForm(!showImageForm);
  };

  // TOGGLE ADD NEW INFO FORM
  const toggleInfoForm = () => {
    setNewInfoForm(!newInfoForm);
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

  useEffect(() => {}, [product]);

  return product.details ? (
    <div className="container mt-5 bg-light">
      <Row>
        <Col xs={6} className=" bg-light ">
          <h1 className="text-center">{product.name}</h1>
          <p className="text-center">{product.description}</p>
          <hr />
          <div className="d-flex justify-content-around">
            <Button className="bg-primary mb-1" onClick={toggleInfoForm}>
              {newInfoForm ? "Hide" : "Add new info"}
            </Button>
            <Button
              className="bg-danger mb-1"
              onClick={async () => {
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
                <Col xs={6} className="text-center" key={uniqid}>
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
                <Col xs={6} className="mx-auto" key={index}>
                  <img
                    key={uniqid()}
                    className="w-100 h-75 p-2"
                    src={image.url}
                    alt=""
                  />
                  {isLoading ? (
                    <div className="spinner-grow" role="status"></div>
                  ) : (
                    <Button
                      className="bg-danger"
                      // ON DELETE UPDATE IMAGES
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
            <Button className="bg-primary" onClick={toggleForm}>
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
    // TODO EDIT IMAGE SIZE TO AVOID HEIGHT PROBLEMS
    <p>loading</p>
  );
};
