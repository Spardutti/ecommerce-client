import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import uniqid from "uniqid";

export const ProductCard = (props) => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { id, name, price, images, description, size, color } = props;

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
    <div>
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
              $ {price}
            </CardSubtitle>
            <CardImg
              top
              width="auto"
              src={images.length ? images[0].url : null}
              alt="Product image"
              style={{ height: "150px" }}
            />
            <CardText>{description}</CardText>
            {sizes ? (
              <div className="border bg-light">
                <CardText> Size</CardText>
                <Row>
                  {sizes.map((elem) => {
                    return (
                      <Col xs={2} className="mx-auto" key={uniqid()}>
                        <p className="border">{elem}</p>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ) : null}
            {colors ? (
              <div className="bg-light mt-1 border">
                <CardText>Colors</CardText>
                <Row>
                  {colors.map((elem) => {
                    return (
                      <Col xs={2} className="mx-auto" key={uniqid()}>
                        <p
                          className="mx-auto"
                          style={{
                            backgroundColor: elem,
                            width: "20px",
                            height: "20px",
                          }}
                        ></p>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ) : null}
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
