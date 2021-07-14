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

export const ProductCard = (props) => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    (async () => {
      await props.sizeColor;
      let size = [];
      let color = [];
      props.sizeColor.map((elem) => {
        if (size.indexOf(elem.size) === -1) size.push(elem.size);
        if (color.indexOf(elem.color) === -1) color.push(elem.color);
      });
      setColors(color);
      setSizes(size);
    })();
  }, []);

  const { id, name, price, img, description, sizeColor } = props;
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
              src={img}
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
                      <Col xs={2} className="mx-auto">
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
                      <Col xs={2} className="mx-auto">
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
