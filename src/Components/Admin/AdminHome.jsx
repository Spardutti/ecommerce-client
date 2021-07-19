import { getCategories, getProducts } from "../../API/API";
import { useState, useEffect, useContext } from "react";
import { ProductCard } from "../ProductCard";
import uniqid from "uniqid";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import { userContext } from "../../Context/Contexts";
import { Redirect } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { AddCategory } from "./AddCategory";

export const AdminHome = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(userContext);

  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
    })();

    return () => setProducts();
  }, []);

  return user ? (
    !user.admin ? (
      <Redirect to="/" />
    ) : (
      <Col className="mt-5 mx-auto container">
        <Row>
          <Col md={6}>
            <AddProduct />
          </Col>
          <Col md={6}>
            <AddCategory />
          </Col>
        </Row>
        {products
          ? products.map((product) => {
              const { name, _id, price, images, description, color, size } =
                product;
              return (
                <Col md={3} className="mt-2">
                  <ProductCard
                    key={uniqid()}
                    id={_id}
                    name={name}
                    price={price}
                    images={images}
                    description={description}
                    color={color}
                    size={size}
                  />
                </Col>
              );
            })
          : null}
      </Col>
    )
  ) : (
    <p>loading</p>
  );
};
