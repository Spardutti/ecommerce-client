import { useState, useEffect } from "react";
import { getCategories, getProductByCat, getProducts } from "../API/API";
import "../Styles/categories.css";
import home from "../assets/home.png";

// DISPLAY ALL THE CATEGORIES ON A BAR

export const Categories = (props) => {
  const [categories, setCategories] = useState();

  // GET ALL CATEGORIES ON LOAD
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
    return () => setCategories();
  }, []);

  // GET SPECIFIC CATEOGRY ITEMS ON CLICK
  const getProductsByCategory = async (id, index) => {
    props.setLoading(true);
    props.setProducts(await getProductByCat(id));
    props.setSelectedCat(index + 1);
    props.setLoading(false);
    return () => props.setProducts([]);
  };

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    props.setProducts(await getProducts());
    props.setSelectedCat(0);
  };

  return (
    <div className="categories-container">
      <div
        className={
          props.selectedCat === 0
            ? "categories-card selected-cat"
            : "categories-card"
        }
        onClick={(e) => getAllProducts(e)}
        style={{
          backgroundImage: `url(${home})`,
        }}
      >
        <div className="ribbon ribbon-top-left">
          <span>all</span>
        </div>
      </div>
      {categories &&
        categories.map((category, index) => {
          const { name, image, _id } = category;
          return (
            <div
              key={index}
              id={index + 1}
              className={
                props.selectedCat === index + 1
                  ? "categories-card selected-cat"
                  : "categories-card"
              }
              style={{
                backgroundImage: `url(${image.url})`,
              }}
              onClick={(e) => getProductsByCategory(_id, index)}
            >
              <div className="ribbon ribbon-top-left">
                <span>{name}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
