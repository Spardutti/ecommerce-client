import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { Button, Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import { getCategories, getProductByCat } from "../../API/API";
import { ProductCard } from "../../Components/ProductCard";
import { userContext } from "../../Context/Contexts";

// DISPLAY ALL THE CATEGORIES ON A BAR

export const AdminCategory = () => {
  const [categories, setCategories] = useState();
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(userContext);

  // GET ALL CATEGORIES ON LOAD
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  // GET SPECIFIC CATEOGRY ITEMS ON CLICK
  const getProducts = async (name, index) => {
    setLoading(true);
    setProducts(await getProductByCat(name));
    setLoading(false);
    setActive(index);
  };

  // GET THE FIRST CATEGORY
  useEffect(() => {
    setLoading(true);
    if (categories) {
      (async () => {
        setProducts(await getProductByCat(categories[0]._id));
        setLoading(false);
      })();
    }
  }, [categories]);

  return !user ? (
    <Redirect to="/" />
  ) : (
    <div className="container text-center ">
      <p className="mt-2">
        Select a category to find all the products of that category
      </p>
      {categories ? (
        <Breadcrumb>
          {categories.map((cat, index) => {
            return (
              <BreadcrumbItem
                onClick={() => getProducts(cat._id, index)}
                className={
                  active === index ? "active" : "text-primary cursorPointer"
                }
                id={index}
                key={cat._id}
              >
                {cat.name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      ) : (
        <div className="spinner-grow"></div>
      )}
      {loading ? (
        <div className="spinner-grow"></div>
      ) : products ? (
        <Row>
          {products.map((pro) => {
            return (
              <Col xs={3} key={pro.name} className="mx-auto">
                <ProductCard
                  name={pro.name}
                  images={pro.images}
                  price={pro.price.toLocaleString()}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="spinner-grow"></div>
      )}
    </div>
  );
};
