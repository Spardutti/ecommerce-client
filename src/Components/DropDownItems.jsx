import { Col, Row } from "reactstrap";
export const DropDownItems = (props) => {
  const { name, detail, images } = props.product;
  return (
    <div>
      <Row className="drop-container">
        <Col xs={6}>
          <p>{name}</p>
          <p className="font-weight-bolder">${detail.price}</p>
        </Col>
        <Col xs={6}>
          <img src={images.url} alt="" className="float-right" />
        </Col>
        <Row>
          <p className="text-center">quantity</p>
          <Col className="d-flex">
            <Col className="text-center" xs={3}>
              <p>+</p>
            </Col>
            <Col xs={6} className="text-center">
              <p>{detail.quantity}</p>
            </Col>
            <Col xs={3} className="text-center">
              <p>-</p>
            </Col>
          </Col>{" "}
        </Row>
      </Row>
    </div>
  );
};
