import { useEffect, useState } from "react";
import { ProductDetail } from "./ProductDetail";
import "../Styles/product-card.css";

// DISPLAY THE PRODUCTS CARDS WITH TITLE; PRICE AND IMAGE

export const ProductCard = (props) => {
  const [, setColors] = useState([]);
  const [, setSizes] = useState([]);
  const { id, name, price, images, size, color } = props;
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <div className="card-container">
      <div>
        <img src={images[0].url} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <p className="card-price">$ {price.toLocaleString()}</p>
        <button onClick={toggleModal}>Info</button>
      </div>
      {modal ? (
        <ProductDetail
          id={id}
          modal={modal}
          toggleModal={toggleModal}
          name={name}
          img={images[0].url}
        />
      ) : null}
    </div>
  );
};
