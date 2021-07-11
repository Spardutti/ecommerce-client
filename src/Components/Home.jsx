import { useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import uniqid from "uniqid";
import "../Styles/home-title.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
    })();
  }, []);

  return (
    <div>
      {products
        ? products.map((product) => {
            return <ProductCard key={uniqid()} />;
          })
        : null}
    </div>
  );
};

export default Home;
