import { useState, useEffect } from "react";
import { getCategories, getProductByCat, getProducts } from "../API/API";
import "../Styles/categories.css";

// DISPLAY ALL THE CATEGORIES ON A BAR

export const Categories = (props) => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);

  // GET ALL CATEGORIES ON LOAD
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
    return () => setCategories();
  }, []);

  // GET SPECIFIC CATEOGRY ITEMS ON CLICK
  const getProductsByCategory = async (id) => {
    setLoading(true);
    props.setProducts(await getProductByCat(id));
    setLoading(false);
    return () => props.setProducts([]);
  };

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    props.setProducts(await getProducts());
  };

  return loading ? (
    <div className="spinner-grow mt-5"></div>
  ) : (
    <div className="categories-container">
      <div className="categories-card" onClick={getAllProducts}>
        <h5>all</h5>
      </div>
      {categories &&
        categories.map((category, index) => {
          const { name, image, _id } = category;
          return (
            <div
              key={index}
              className="categories-card"
              style={{
                backgroundImage: `url(${image.url})`,
              }}
              onClick={() => getProductsByCategory(_id)}
            >
              <h5>{name}</h5>
            </div>
          );
        })}
    </div>
  );
};
