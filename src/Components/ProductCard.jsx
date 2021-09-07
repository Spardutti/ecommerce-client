import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "../Styles/product-card.css";

// DISPLAY THE PRODUCTS CARDS WITH TITLE; PRICE AND IMAGE

export const ProductCard = (props) => {
  const [, setColors] = useState([]);
  const [, setSizes] = useState([]);
  const { id, name, price, images, size, color } = props;

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
        <button>Add to cart</button>
      </div>
    </div>
    /*  <div className="pb-2">
      <Link
        to={"/product?" + id}
        id={id}
        style={{ textDecoration: "none" }}
        className="text-dark"
      >
        <Card className="w-75 mx-auto text-center">
          <CardBody>
            <CardTitle tag="h5">{name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              $ {price.toLocaleString()}
            </CardSubtitle>
            <CardImg
              top
              width="auto"
              src={images.length ? images[0].url : null}
              alt="Product image"
              style={{ height: "150px" }}
            />
          </CardBody>
        </Card>
      </Link>
    </div> */
  );
};
