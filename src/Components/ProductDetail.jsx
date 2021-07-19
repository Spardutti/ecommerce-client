import { useState, useEffect, useContext } from "react";
import { productDetail } from "../API/API";
import { Col, Row, Button } from "reactstrap";
import { userContext } from "../Context/Contexts";
import { SingleProduct } from "./Admin/SingleProduct/SingleProduct";

export const ProductDetail = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [editForm, setEditForm] = useState(false);

  const { user } = useContext(userContext);

  // TOGGLE EDIT FORM
  const toggleForm = () => {
    setEditForm(!editForm);
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

  return user ? (
    user.admin ? (
      <SingleProduct />
    ) : product ? (
      <div className="container mt-5">
        <Row>
          <Col xs={6} className=" bg-light">
            <h1 className="text-center">{product.name}</h1>
            <p>{product.description}</p>
            <hr />
            <Row>
              {product.details.map((elem) => {
                return (
                  <Col xs={6} className="text-center">
                    <p>Size: {elem.size}</p>
                    <p>color: {elem.color}</p>
                    <p>price: {elem.price}</p>
                    <p>stock: {elem.quantity}</p>
                    <Button className="bg-primary mb-2">Buy</Button>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col xs={6} className="mx-auto">
            <img className="w-100 h-100 p-2" src={""} alt="" />
          </Col>
        </Row>
      </div>
    ) : (
      <p>loading</p>
    )
  ) : null;
};
