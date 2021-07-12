import jwt from "jsonwebtoken";

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
  return { token: data.token, user: data.user, status: response.status };
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
export const addNewProduct = async (productName, category) => {
  try {
    const response = await fetch(url + "/product/new", {
      method: "POST",
      headers: params,
      body: JSON.stringify({
        productName,
        productCategory: category,
      }),
    });
    const data = await response.json();
    return { status: response.status, data };
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
