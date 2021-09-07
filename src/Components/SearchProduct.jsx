import { useState } from "react";
import { productDetail } from "../API/API";
import "../Styles/search-product.css";

// SEARCH PRODUCTS ON INPUT

export const SearchProduct = (props) => {
  const { products } = props;
  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const suggestionHandler = async (product) => {
    const singleProduct = [await productDetail(product._id)];
    props.setProducts(singleProduct);
    setProductName("");
    setSuggestions([]);
  };

  return (
    <div>
      <div className={"autocomplete"}>
        <input
          onChange={nameHandler}
          value={productName}
          placeholder="What are you looking for ?"
        />

        <div className="autocomplete-items">
          {suggestions &&
            suggestions.map((suggestion, index) => {
              return (
                <div key={index} onClick={() => suggestionHandler(suggestion)}>
                  {suggestion.name}
                </div>
              );
            })}
        </div>
        <div className="search">
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
};
