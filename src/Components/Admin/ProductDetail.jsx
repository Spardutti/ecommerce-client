import { useState, useEffect } from "react";
import { productDetail } from "../../API/API";

export const ProductDetail = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});

  // GET THE ID FROM URL
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setProductId(id);
  }, []);

  // FETCH THE PRODUCT
  useEffect(() => {
    if (productId) {
      (async () => {
        setProduct(await productDetail(productId));
      })();
    }
  }, [productId]);
  return <div>{product ? <p>{product.name}</p> : null}</div>;
};
