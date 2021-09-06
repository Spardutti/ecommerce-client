import { useContext, useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import uniqid from "uniqid";
import { Row, Col } from "reactstrap";
import { userContext } from "../Context/Contexts";
import { Redirect } from "react-router";
import { SearchProduct } from "./SearchProduct";
import { Link } from "react-router-dom";
import "../Styles/home.css";

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

  return (
    <div className="home-container container">
      {products &&
        products.map((product) => {
          const { name, _id, description, images, size, color, price } =
            product;
          return (
            <ProductCard
              id={_id}
              name={name}
              description={description}
              images={images}
              size={size}
              color={color}
              price={price}
            />
          );
        })}
    </div>
  );

  /* user ? (
    user.admin ? (
      <Redirect to="/admin-productos" />
    ) : (
      <div>
        <SearchProduct products={products} />
        <Row className="container mx-auto">
          {products
            ? products.map((product) => {
                const { name, _id, description, images, size, color, price } =
                  product;
                return (
                  <Col
                    md={6}
                    lg={3}
                    xs={12}
                    className="mt-5 mx-auto mb-2"
                    key={_id}
                  >
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
      </div>
    )
  ) : (
    <h5 className="text-center mt-5">
      Please{" "}
      <Link to="/login" className="text-primary">
        Log in
      </Link>
    </h5>
  ); */
};

export default Home;
