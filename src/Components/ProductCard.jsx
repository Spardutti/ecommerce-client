import { useState } from "react";
import { ProductDetail } from "./ProductDetail";

// DISPLAY THE PRODUCTS CARDS WITH TITLE; PRICE AND IMAGE

export const ProductCard = (props) => {
  const { id, name, price, images } = props;
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <div className="card-container">
      <div>
        <img className="detail-img" src={images[0].url} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <p className="card-price">$ {price.toLocaleString()}</p>
        <button className="btn btn-black" onClick={toggleModal}>
          Info
        </button>
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
