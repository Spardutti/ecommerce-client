import { useState, useEffect, useContext } from "react";
import { productDetail } from "../../../API/API";
import { Col, Row } from "reactstrap";
import { userContext } from "../../../Context/Contexts";
import { AdminCard } from "./AdminProductCard";
import uniqid from "uniqid";

export const SingleProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});

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

  return product.details ? (
    <div className="container mt-5">
      <Row>
        <Col xs={6} className=" bg-light">
          <h1 className="text-center">{product.name}</h1>
          <p>{product.description}</p>
          <hr />
          <Row>
            {product.details.map((elem) => {
              const { price, color, size, quantity } = elem;
              return (
                <Col xs={6} className="text-center" key={uniqid()}>
                  <AdminCard
                    price={price}
                    color={color}
                    size={size}
                    quantity={quantity}
                  />
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
  );
};
