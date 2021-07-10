import jwt from "jsonwebtoken";

const url = "http://localhost:5000";
let token;
let decodedToken;

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
