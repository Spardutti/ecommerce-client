import { getProducts } from "../../API/API";
import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import uniqid from "uniqid";

export const AdminProductos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => setProducts(await getProducts()))();
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
