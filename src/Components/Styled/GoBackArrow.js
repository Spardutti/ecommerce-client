import { Link } from "react-router-dom";

export const GoBackArrow = (props) => {
  return (
    <Link to={props.route}>
      <i style={{ fontSize: "50px" }} className="fas fa-angle-double-left"></i>
    </Link>
  );
};
