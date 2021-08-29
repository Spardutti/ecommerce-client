import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import { getCategories, getProductByCat } from "../API/API";
import { ProductCard } from "./ProductCard";
import { userContext } from "../Context/Contexts";
import { GoBackArrow } from "./Styled/GoBackArrow";

// DISPLAY ALL THE CATEGORIES ON A BAR

export const Categories = () => {
  const [categories, setCategories] = useState();
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);

  // GET ALL CATEGORIES ON LOAD
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
    return () => setCategories();
  }, []);

  // GET SPECIFIC CATEOGRY ITEMS ON CLICK
  const getProducts = async (name, index) => {
    setLoading(true);
    setProducts(await getProductByCat(name));
    setLoading(false);
    setActive(index);
    return () => setProducts([]);
  };

  // GET THE FIRST CATEGORY
  useEffect(() => {
    setLoading(true);
    if (categories) {
      (async () => {
        setProducts(await getProductByCat(categories[0]._id));
        setLoading(false);
      })();
      return () => setProducts([]);
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
        !products.length ? (
          <p> No Products found</p>
        ) : (
          <Row>
            {products.map((pro) => {
              return (
                <Col xs={3} key={pro.name} className="mx-auto">
                  <ProductCard
                    name={pro.name}
                    images={pro.images}
                    price={pro.price}
                    id={pro._id}
                  />
                </Col>
              );
            })}
          </Row>
        )
      ) : (
        <div className="spinner-grow"></div>
      )}
      <GoBackArrow route="/ecommerce-client/" />
    </div>
  );
};
