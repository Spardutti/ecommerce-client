import { useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import { SearchProduct } from "./SearchProduct";
import "../Styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

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
    <div className="text-center">
      <SearchProduct products={products} setProducts={setProducts} />
      <div className="home-container container">
        {products &&
          products.map((product, index) => {
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
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
