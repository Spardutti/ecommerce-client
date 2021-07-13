import { useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import uniqid from "uniqid";
import "../Styles/home-title.css";
import { Row, Col } from "reactstrap";

const Home = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
    })();
  }, []);

  return (
    <Row>
      {products
        ? products.map((product) => {
            const { name, _id, price, description } = product;
            return (
              <Col md={3} className="mt-5" key={_id}>
                <ProductCard
                  key={uniqid()}
                  id={_id}
                  name={name}
                  price={price}
                  img={product.images[0].url}
                  description={description}
                />
              </Col>
            );
          })
        : null}
    </Row>
  );
};

export default Home;
