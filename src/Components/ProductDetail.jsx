import { useState, useEffect, useContext } from "react";
import { productDetail, addToCart } from "../API/API";
import { Col, Row, Button } from "reactstrap";
import { userContext } from "../Context/Contexts";
import { SingleProduct } from "./Admin/SingleProduct/SingleProduct";
import { ColorSquares } from "./Styled/ColorSquares";
import { Redirect } from "react-router";
import { ProductSlideShow } from "./ProductSlideShow";
import { Link } from "react-router-dom";
import "../Styles/product-detail.css";

// SHOWS THE PRODUCT PAGE WITH ALL THE INFO

export const ProductDetail = ({ toggleModal, name, img, id }) => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [dropdown, setDropwDown] = useState(false);

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

  const UniqueSizes = () => {
    return sizes.map((elem, index) => {
      return <p key={index}>{elem}</p>;
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

  const GoToCart = () => {
    return (
      <div>
        <p>Product added to cart</p>
        <div>
          <Link to="/cart" className="bg-success btn btn-primary mb-2 mx-5">
            Go to cart
          </Link>
          <Button
            className="bg-primary btn btn-primary mb-2 mx-5"
            onClick={resetState}
          >
            add another
          </Button>
        </div>
      </div>
    );
  };

  return (
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
          <div
            className="detail-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-sizes">
              <UniqueSizes />
            </div>

            {dropdown ? (
              <div className="detail-color-list">
                <ColorSquares color="red" width="15px" height="15px" />
                <ColorSquares color="blue" width="15px" height="15px" />
              </div>
            ) : (
              <div
                className="detail-color"
                onClick={() => setDropwDown(!dropdown)}
              ></div>
            )}
            <div>&#8595;</div>
          </div>
        </div>
      </div>
    </div>
  );
  /* return user ? (
    user.admin ? (
      <SingleProduct />
    ) : product.details ? (
      <div className="container bg-light mt-5">
        <Row>
          <Col xs={12} sm={6} className=" text-center">
            <GoBackArrow route={"/products"} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <hr />
            <Row>
              <p>Available sizes</p>
              <div className="size-container">
                {sizes.map((size, index) => {
                  return (
                    <div
                      id={size}
                      key={index}
                      onClick={() => {
                        selectSize(size);
                      }}
                      className={selectedSize === size ? "selected" : null}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
              {selectedSize ? (
                <div className="color-container mt-4">
                  <div>
                    <p>Select a color</p>
                  </div>
                  <div>
                    {colors.map((color, index) => {
                      return (
                        <ColorSquares
                          color={color}
                          height={"30px"}
                          width={"30px"}
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={
                            selectedColor === color ? "selected" : "color"
                          }
                        ></ColorSquares>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p> Select a size</p>
              )}
              {loading ? (
                <div className="spinner-grow mx-auto"></div>
              ) : (
                selectedColor &&
                selectSize && (
                  <div>
                    {addedToCart ? (
                      <GoToCart />
                    ) : (
                      //<p className="mt-2">Product added to cart</p>
                      <Button
                        className="bg-primary my-4"
                        onClick={async () => {
                          setLoading(true);
                          const newCart = await addToCart(
                            props.id,
                            productId,
                            selectedSize,
                            selectedColor,
                            1
                          );
                          setUser(newCart);
                          setLoading(false);
                          productAdded();
                        }}
                      >
                        Add to cart
                      </Button>
                    )}
                  </div>
                )
              )}
            </Row>
          </Col>
          <Col xs={12} sm={6} className=" ">
            <ProductSlideShow images={product.images} />
          </Col>
        </Row>
      </div>
    ) : (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-grow mx-auto"></div>
      </div>
    )
  ) : (
    <Redirect to="/" />
  ); */
};
