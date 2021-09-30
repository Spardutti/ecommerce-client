import { useEffect, useState } from "react";
import { getProducts } from "../API/API";
import { ProductCard } from "./ProductCard";
import { SearchProduct } from "./SearchProduct";
import { Categories } from "./Categories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(0);

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
      <Categories
        products={products}
        setProducts={setProducts}
        setLoading={setLoading}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      <SearchProduct
        products={products}
        setProducts={setProducts}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      <div className="home-container container">
        {loading ? (
          <div className="spinner-grow"></div>
        ) : (
          products &&
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
          })
        )}
      </div>
    </div>
  );
};

export default Home;
