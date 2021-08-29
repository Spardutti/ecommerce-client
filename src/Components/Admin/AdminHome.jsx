import { getProducts } from "../../API/API";
import { useState, useEffect, useContext } from "react";
import { ProductCard } from "../ProductCard";
import uniqid from "uniqid";
import { Col, Row } from "reactstrap";
import { userContext } from "../../Context/Contexts";
import { Redirect } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { AddCategory } from "./AddCategory";
import { SearchProduct } from "../SearchProduct";

/* DISPLAY THE ADMIN PRODUDCT PAGE WITH ALL THE PRODUCTS */

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
        <Row>
          <div className="text-center">
            <SearchProduct products={products} />
          </div>
          {products
            ? products.map((product) => {
                const { name, _id, images, description, color, size, price } =
                  product;
                return (
                  <Col md={3} className="mt-2 mx-auto" key={uniqid()}>
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
        </Row>
      </Col>
    )
  ) : (
    <Redirect to="/ecommerce-client/" />
  );
};
