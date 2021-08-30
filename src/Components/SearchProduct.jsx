import { Input } from "reactstrap";
import { useState } from "react";
import { Redirect } from "react-router";

// SEARCH PRODUCTS ON INPUT

export const SearchProduct = (props) => {
  const { products } = props;
  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productId, setProductId] = useState("");
  const [redirect, setRedirect] = useState(false);

  const nameHandler = (e) => {
    let matches = [];
    // VALIDATES THE INPUT WITH POSSIBLE SUGGESTIONS
    if (e.target.value.length) {
      matches = products.filter((elem) => {
        const regex = new RegExp(`${e.target.value}`, "gi");
        return elem.name.match(regex);
      });
    }
    setSuggestions(matches);
    setProductName(e.target.value);
  };

  const suggestionHandler = (product) => {
    setProductName(product.name);
    setProductId(product._id);
    setSuggestions([]);
    setRedirect(true);
  };

  return (
    <div>
      {redirect && <Redirect to={"/product/?" + productId} />}
      <div className=" mx-auto w-75 search my-3">
        <Input onChange={nameHandler} value={productName} />
        <i
          onClick={() => setRedirect(true)}
          className="fas fa-search searchIcon text-center"
        ></i>
      </div>
      {suggestions &&
        suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className="suggestion mx-auto p-1"
              onClick={() => suggestionHandler(suggestion)}
            >
              {suggestion.name}
            </div>
          );
        })}
    </div>
  );
};
