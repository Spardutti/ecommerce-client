import jwt from "jsonwebtoken";
import { NavbarText } from "reactstrap";

const url = "http://localhost:5000";
let token;
let decodedToken;
const params = {
  Authorization: token,
  "Content-Type": "application/json",
};

// CHECK FOR LOCAL TOKEN
export const checkForToken = () => {
  token = localStorage.getItem("token");
  if (token) {
    decodedToken = jwt.decode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    if (expiresAt < new Date(Date.now())) {
      localStorage.clear();
    } else {
      return (token = "Bearer " + token);
    }
  } else return null;
};

// GET THE USER DATA
export const userData = async () => {
  try {
    let id = decodedToken._id;
    const response = await fetch(url + "/user/" + id);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// LOGOUT USER
export const logout = async () => {
  await fetch(url + "/logout");
  localStorage.clear();
};

// LOG IN LOCAL USER
export const localUser = async (email, password) => {
  const response = await fetch(url + "/user/login", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (response.status === 200) localStorage.setItem("token", data.token);
  return { data, status: response.status };
};

// CREATE LOCAL USER
export const newUser = async (email, username, password, confirm) => {
  const response = await fetch(url + "/user/new", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      email,
      username,
      password,
      confirm,
    }),
  });
  const data = await response.json();
  return { response, data };
};

// GET PRODUCTS
export const getProducts = async () => {
  try {
    const response = await fetch(url + "/products");
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// ADD NEW PRODUCT
export const addNewProduct = async (
  name,
  category,
  price,
  color,
  size,
  quantity,
  image
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("color", color);
  formData.append("size", size);
  formData.append("quantity", quantity);
  formData.append("image", image);
  try {
    const response = await fetch(url + "/product/new", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (err) {
    return err;
  }
};

// PRODUCT DETAIL
export const productDetail = async (productId) => {
  try {
    const response = await fetch(url + "/product/" + productId, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// DELETE PRODUCT WITH ALL INFO AND IMAGES
export const deleteProduct = async (id) => {
  const response = await fetch(url + "/product/" + id, {
    method: "DELETE",
    headers: params,
  });
  const data = await response.json();
  console.log(data);
};

// EDIT PRODUCT PRICE STOCK
export const updateProduct = async (
  id,
  size,
  quantity,
  price,
  color,
  description
) => {
  try {
    const response = await fetch(url + "/product/update/" + id, {
      method: "PUT",
      headers: params,
      body: JSON.stringify({ size, quantity, color, price, description }),
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (err) {
    return err;
  }
};

// DELETE PRODUCT INFO
export const deleteProductInfo = async (id, index) => {
  try {
    const response = await fetch(url + "/product/details/" + id, {
      method: "DELETE",
      headers: params,
      body: JSON.stringify({
        index,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// GET ALL CATEGORIES
export const getCategories = async () => {
  try {
    const response = await fetch(url + "/categories");
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
