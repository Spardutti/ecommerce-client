import { useContext, useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import uniqid from "uniqid";
import { Row, Col } from "reactstrap";
import { userContext } from "../Context/Contexts";
import { Redirect } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(userContext);

  // GET ALL PRODUCTS
  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
    })();
    return () => {
      setProducts();
    };
  }, []);

  return user ? (
    user.admin ? (
      <Redirect to="/admin-productos" />
    ) : (
      <Row className="container mx-auto">
        {products
          ? products.map((product) => {
              const { name, _id, description, images, size, color, price } =
                product;
              return (
                <Col md={3} className="mt-5 mx-auto" key={_id}>
                  <ProductCard
                    key={uniqid()}
                    id={_id}
                    name={name}
                    price={price}
                    images={images}
                    description={description}
                    size={size}
                    color={color}
                  />
                </Col>
              );
            })
          : null}
      </Row>
    )
  ) : null;
};

export default Home;
