import jwt from "jsonwebtoken";
import { NavbarText } from "reactstrap";

const url = "http://localhost:5000";
let token;
let decodedToken;
const params = {
  Authorization: token,
  "Content-Type": "application/json",
};

/**************************************************** USER  ***************************************************************/
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

/********************************************************* PRODUCTS ****************************************/
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
  image,
  description
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("color", color);
  formData.append("size", size);
  formData.append("quantity", quantity);
  formData.append("image", image);
  formData.append("description", description);
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
  await fetch(url + "/product/" + id, {
    method: "DELETE",
    headers: params,
  });
};

// UPDATE DESCRIPTION
export const updateDescription = async (id, description) => {
  await fetch(url + "/product/description/" + id, {
    method: "PUT",
    headers: params,
    body: JSON.stringify({
      description,
    }),
  });
};

// EDIT PRODUCT PRICE STOCK
export const updateProduct = async (id, size, quantity, color, description) => {
  try {
    const response = await fetch(url + "/product/update/" + id, {
      method: "PUT",
      headers: params,
      body: JSON.stringify({ size, quantity, color, description }),
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (err) {
    return err;
  }
};

// ADD IMAGES TO PRODUCT
export const addImagesToProduct = async (id, image) => {
  const formData = new FormData();
  for (let img of image) {
    formData.append("image", img);
  }
  try {
    const response = await fetch(url + "/product/image/" + id, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// DELETE PRODUCT IMAGE
export const deleteProductImage = async (index, id) => {
  try {
    const response = await fetch(url + "/product/delete/image/" + id, {
      method: "DELETE",
      headers: params,
      body: JSON.stringify({ imageToDeleteIndex: index }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// DELETE PRODUCT DETAIL
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

// ADD PRODUC TO USER CART
export const addToCart = async (id, productId, size, color, quantity) => {
  const response = await fetch(url + "/product/cart/" + id, {
    method: "PUT",
    headers: params,
    body: JSON.stringify({
      id: productId,
      size,
      color,
      quantity,
    }),
  });
  const data = await response.json();
  return data;
};

// UPDATE USER CART
export const updateUserCart = async (id, cart) => {
  try {
    const response = await fetch(url + "/user/product/cart/" + id, {
      method: "PUT",
      headers: params,
      body: JSON.stringify({
        cart,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// CHECK STOCK BEFORE CHECKOUT AND REDIRECT
export const checkStock = async (id) => {
  try {
    const response = await fetch(url + "/checkout/" + id, {
      method: "POST",
      headers: params,
    });
    const data = await response.json();
    return { data, status: response.status };
  } catch (err) {
    return err;
  }
};

// UPDATE USER PURCHASES ARRAY
export const updatePurchases = async (userId, purchase) => {
  try {
    const response = await fetch(url + "/user/purchases/" + userId, {
      method: "PUT",
      headers: params,
      body: JSON.stringify({
        purchase,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/****************************************************************** CHECKOUT    *******************************************************************/

//SUCCESS TEST
export const success = async () => {
  try {
    const resposne = await fetch(url + "/success");
    const data = await resposne.json();
    console.log(data);
  } catch (err) {
    return err;
  }
};

/******************************************************************* CATEGORIES  *******************************************************************/

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

// GET PRODUCT BY CATEGORY
export const getProductByCat = async (category) => {
  try {
    const response = await fetch(url + "/category/product", {
      method: "POST",
      headers: params,
      body: JSON.stringify({ category }),
    });
    const data = await response.json();
    return data;
  } catch (err) {}
};

// NEW CATEGORY
export const newCategory = async (name) => {
  try {
    const response = await fetch(url + "/category/new", {
      method: "POST",
      headers: params,
      body: JSON.stringify({
        name,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {}
};
