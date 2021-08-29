import { useState, useEffect, useContext } from "react";
import { productDetail, addToCart } from "../API/API";
import { Col, Row, Button } from "reactstrap";
import { userContext } from "../Context/Contexts";
import { SingleProduct } from "./Admin/SingleProduct/SingleProduct";
import { ColorSquares } from "./Styled/ColorSquares";
import { GoBackArrow } from "./Styled/GoBackArrow";
import { Redirect } from "react-router";

// SHOWS THE PRODUCT PAGE WITH ALL THE INFO

export const ProductDetail = (props) => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { user, setUser } = useContext(userContext);

  // GET THE ID FROM URL
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setProductId(id);
    return () => setProductId("");
  }, []);

  // FETCH THE PRODUCT
  useEffect(() => {
    if (productId) {
      (async () => {
        const token = "Bearer " + localStorage.getItem("token");

        setProduct(await productDetail(productId, token));
      })();
    }
  }, [productId]);

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
    setTimeout(() => {
      resetState();
    }, 2000);
  };

  return user ? (
    user.admin ? (
      <SingleProduct />
    ) : product.details ? (
      <div className="container bg-light mt-5">
        <GoBackArrow route={"/products"} />

        <Row>
          <Col xs={6} className=" text-center">
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
                <p> Select a size to see the available colors</p>
              )}
              {loading ? (
                <div className="spinner-grow mx-auto"></div>
              ) : (
                selectedColor &&
                selectSize && (
                  <div>
                    {addedToCart ? (
                      <p className="mt-2">Product added to cart</p>
                    ) : (
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
          <Col xs={6}>
            <Row>
              {product.images.map((image, index) => {
                return (
                  <Col xs={6} className="mx-auto" key={index}>
                    <img className="w-100 h-75 p-2" src={image.url} alt="" />
                  </Col>
                );
              })}
            </Row>
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
  );
};
