import { useState, useEffect, useContext } from "react";
import { productDetail } from "../../../API/API";
import { Col, Row, Button } from "reactstrap";
import { userContext } from "../../../Context/Contexts";
import { AdminCard } from "./AdminProductCard";
import uniqid from "uniqid";
import { AddProductImage } from "./AddProductImage";
import { NewInfoForm } from "./NewInfoForm";

export const SingleProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [showImageForm, setShowImageForm] = useState(false);
  const [newInfoForm, setNewInfoForm] = useState(false);

  const { user } = useContext(userContext);

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

  return product.details ? (
    <div className="container mt-5">
      <Row>
        <Col xs={6} className=" bg-light">
          <h1 className="text-center">{product.name}</h1>
          <p>{product.description}</p>
          <hr />
          <div className="text-center">
            <Button className="bg-primary mb-1" onClick={toggleInfoForm}>
              {newInfoForm ? "Hide" : "Add new info"}
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
                  <AdminCard
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
          <img className="w-100 p-2" src={""} alt="" />
          <Button className="bg-primary" onClick={toggleForm}>
            Add product image
          </Button>
          {showImageForm ? <AddProductImage images={product.images} /> : null}
        </Col>
      </Row>
    </div>
  ) : (
    // TODO EDIT IMAGE SIZE TO AVOID HEIGHT PROBLEMS
    <p>loading</p>
  );
};
