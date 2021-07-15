import { useState, useEffect } from "react";
import { productDetail } from "../../API/API";
import { Col, Row } from "reactstrap";

export const ProductDetail = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});

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
          {product.sizeColor.map((elem) => {
            return (
              <div>
                <p>{elem.size}</p>
              </div>
            );
          })}
        </Col>
        <Col xs={6} className="mx-auto">
          <img className="w-100 h-100 p-2" src={product.images[0].url} alt="" />
        </Col>
      </Row>
    </div>
  ) : (
    <p>loading</p>
  );
};
