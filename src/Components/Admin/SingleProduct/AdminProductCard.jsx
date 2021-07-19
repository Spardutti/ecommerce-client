import { useState } from "react";
import { Button } from "reactstrap";

export const AdminCard = (props) => {
  const [editProduct, setEditProduct] = useState(false);
  return editProduct ? (
    <div>
      <p>edit</p>
      <Button
        className="bg-primary mb-1"
        onClick={() => setEditProduct(!editProduct)}
      >
        Edit
      </Button>
    </div>
  ) : (
    <div className="border border-dark m-1">
      <p>Size: {props.size}</p>
      <p>Color: {props.color}</p>
      <p>Stock: {props.quantity}</p>
      <p>Price: {props.price}</p>
      <Button
        className="bg-primary mb-1"
        onClick={() => setEditProduct(!editProduct)}
      >
        Edit
      </Button>
    </div>
  );
};
