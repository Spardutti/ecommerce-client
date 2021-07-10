import { useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
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
      <div className="home-title">
        <h1>Lorem</h1>
      </div>
      {products.map((product) => {
        return <ProductCard />;
      })}
    </div>
  );
};

export default Home;
