import { Col, Row } from "reactstrap";
import { deleteProductInfo } from "../API/API";

export const DropDownItems = (props) => {
  const { name, detail, images, id } = props.product;
  const { index } = props;
  return (
    <div className="px-2">
      <Row className="drop-container">
        <Col xs={6}>
          <p className="small-font">{name}</p>
          <p className="small-font">${detail.price}</p>
          <div className="d-flex align-items-center small-font">
            Color:
            <div
              className="small-font"
              style={{
                backgroundColor: detail.color,
                width: "15px",
                height: "15px",
                margin: "0px 5px",
              }}
            ></div>
          </div>
          <p className="small-font">Size: {detail.size}</p>
        </Col>
        <Col xs={6}>
          <img src={images.url} alt="" className="float-right" />
        </Col>
        <Row className="mx-auto">
          <p className="text-center small-font">quantity</p>
          <Col className="d-flex">
            <Col className="text-center  small-font" xs={3}>
              <i className="fas fa-minus"></i>
            </Col>
            <Col xs={6} className="text-center small-font">
              <p>{detail.quantity}</p>
            </Col>
            <Col xs={3} className="text-center small-font">
              <i className="fas fa-plus small-font"></i>
            </Col>
          </Col>
          <i
            className="fas fa-trash text-center  pb-1"
            onClick={async () => {
              // DELETE DETAIL FROM USER CART
              // DELETE PRODUCT FROM CART
            }}
          ></i>
        </Row>
        <hr />
      </Row>
    </div>
  );
};
