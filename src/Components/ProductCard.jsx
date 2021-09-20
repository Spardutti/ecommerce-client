import { useEffect, useState, useContext } from "react";
import { userContext } from "../Context/Contexts";
import { Link } from "react-router-dom";
import "../Styles/product-card.css";

// DISPLAY THE PRODUCTS CARDS WITH TITLE; PRICE AND IMAGE

export const ProductCard = (props) => {
  const [, setColors] = useState([]);
  const [, setSizes] = useState([]);
  const { name, price, images, size, color } = props;

  const { user } = useContext(userContext);

  useEffect(() => {
    // FIND ALL THE UNIQUE COLORS AND SIZES
    let sizeArr = [],
      colorArr = [];
    if (size && color) {
      if (sizeArr.indexOf(size) === -1) sizeArr.push(size);
      if (colorArr.indexOf(color) === -1) colorArr.push(color);
      setSizes(sizeArr);
      setColors(colorArr);
    }
  }, []);

  return (
    <div className="card-container">
      <div>
        <img src={images[0].url} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <p className="card-price">$ {price.toLocaleString()}</p>
        {user ? (
          <button>Add to cart</button>
        ) : (
          <Link to="/login">
            <button>Please log in to buy</button>
          </Link>
        )}
      </div>
    </div>
  );
};
