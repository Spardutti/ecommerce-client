import { useState, useEffect, useContext } from "react";
import { productDetail, addToCart } from "../API/API";
import { userContext } from "../Context/Contexts";
import { ColorSquares } from "./Styled/ColorSquares";
import { ProductSlideShow } from "./ProductSlideShow";
import "../Styles/product-detail.css";
import Spinner from "../Components/Styled/Spinner";
import { LoginScreen } from "../Components/LoginScreen";

// SHOWS THE PRODUCT PAGE WITH ALL THE INFO

export const ProductDetail = ({ toggleModal, name, img, id }) => {
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [dropdown, setDropwDown] = useState(false);
  const [login, setLogin] = useState(false);

  const { user, setUser } = useContext(userContext);

  // FETCH THE PRODUCT
  useEffect(() => {
    if (id) {
      (async () => {
        setProduct(await productDetail(id));
      })();
    }
  }, [id]);

  // GET THE UNIQUE SIZES
  useEffect(() => {
    if (product.details) {
      const { details } = product;
      let availableSizes = {};
      details.forEach((elem) => {
        if (!availableSizes[elem.size]) {
          availableSizes[elem.size] = 1;
        }
      });
      for (let key in availableSizes) {
        setSizes((old) => [...old, key]);
      }
    }
  }, [product]);

  // GET AND SHOWS THE UNIQUE SIZES
  const UniqueSizes = () => {
    return sizes.map((elem, index) => {
      return (
        <p
          key={index}
          onClick={() => selectSize(elem)}
          className={selectedSize === elem ? "selected-size" : "size"}
        >
          {elem}
        </p>
      );
    });
  };

  // FIND THE COLORS OF THE SELECTED SIZE
  const showColorsBySize = (size) => {
    const { details } = product;
    let colorsBySize = {};
    let colors = [];
    details.forEach((elem) => {
      if (!colorsBySize[elem.color] && elem.size === size) {
        colorsBySize[elem.color] = 1;
      }
    });
    for (let key in colorsBySize) {
      colors.push(key);
    }
    setColors(colors);
  };

  // SELECT SIZE
  const selectSize = (elem) => {
    if (selectedSize) {
      setSelectedSize();
      setSelectedColor();
    }
    setSelectedSize(elem);
    showColorsBySize(elem);
  };

  const resetState = () => {
    setSelectedColor("");
    setSelectedSize("");
    setAddedToCart(false);
  };

  const productAdded = () => {
    setAddedToCart(true);
  };

  // DROPDOWN OF AVAILABLE COLORS
  const ColorDropdown = () => {
    return (
      <div className="detail-color-list">
        {colors.map((elem, index) => {
          return (
            <div onClick={() => setSelectedColor(elem)}>
              <ColorSquares color={elem} key={index} />
            </div>
          );
        })}
      </div>
    );
  };

  // ADD TO CART BUTTON
  const AddToCartBtn = () => {
    return (
      <p
        className="btn btn-black"
        onClick={async () => {
          setLoading(true);
          const newCart = await addToCart(
            user._id,
            id,
            selectedSize,
            selectedColor,
            1
          );
          setUser(newCart);
          setLoading(false);
          productAdded();
        }}
      >
        add to cart
      </p>
    );
  };

  // SHOWS LOG IN FORM
  const onClickLogin = () => {
    setLogin(!login);
  };

  // LOG IN BUTTON
  const Login = () => {
    return (
      <p className="btn btn-login" onClick={onClickLogin}>
        Log in to continue
      </p>
    );
  };

  return login ? (
    <LoginScreen setLogin={setLogin} />
  ) : (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="main-modal" onClick={(e) => e.stopPropagation()}>
        <div className="header-modal">
          <span className="close-btn" onClick={toggleModal}>
            &#x3A7;
          </span>
          <div className="modal-img">
            <img src={img} alt="" className="x" />
          </div>
        </div>
        <div className="body-modal" onClick={() => setDropwDown(false)}>
          <p className="detail-name">{name}</p>
          <p className="detail-price">$50</p>
          <div className="detail-container">
            <div className="detail-sizes">
              <UniqueSizes />
            </div>
            <div className="detail-color-container">
              {selectedSize ? (
                !selectedColor ? (
                  dropdown ? (
                    <ColorDropdown />
                  ) : (
                    /* COLOR LIST DROPDOWN BUTTON */
                    <div
                      className="detail-color"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropwDown(!dropdown);
                      }}
                    >
                      <i className="fas fa-caret-down"></i>
                    </div>
                  )
                ) : (
                  /* SELECTED COLOR */
                  <div className="detail-color">
                    <ColorSquares color={selectedColor} />
                  </div>
                )
              ) : (
                /* NON COLOR SELECTED */
                <div className="detail-color">
                  <ColorSquares />
                </div>
              )}
            </div>
          </div>
          {!user ? (
            <Login />
          ) : !selectedColor ? (
            /* DISABLED BUTTON */
            <p className="btn-disabled btn ">add to cart</p>
          ) : loading ? (
            <Spinner />
          ) : addedToCart ? (
            <p className="added-msg">product added </p>
          ) : (
            <AddToCartBtn />
          )}
        </div>
      </div>
    </div>
  );
};
