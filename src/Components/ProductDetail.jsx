import { useState, useEffect, useContext } from "react";
import { productDetail } from "../API/API";
import { Col, Row } from "reactstrap";
import { userContext } from "../Context/Contexts";

export const ProductDetail = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const { user } = useContext(userContext);

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

  return product.images ? (
    <div className="container mt-5">
      <Row>
        <Col xs={6} className=" bg-light">
          <h1>{product.name}</h1>
          <hr />
          <p>{product.description}</p>
          <Col xs={6}>color</Col>
          <Col xs={6}>size</Col>
        </Col>
        <Col xs={6} className="mx-auto">
          <img className="w-100 h-100 p-2" src={""} alt="" />
        </Col>
      </Row>
    </div>
  ) : (
    <p>loading</p>
  );
};
