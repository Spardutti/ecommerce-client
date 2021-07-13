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
  const { id, name, price, img, description } = props;
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
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
