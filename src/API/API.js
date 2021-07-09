import jwt from "jsonwebtoken";

const url = "http://localhost:5000";
let userToken;

// CHECK FOR LOCAL TOKEN
export const checkForToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt.decode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    if (expiresAt < new Date(Date.now())) {
      localStorage.clear();
    } else {
      userToken = decodedToken;
      return token;
    }
  } else return null;
};

// GET THE USER DATA
export const userData = async () => {
  try {
    let id = userToken._id;
    console.log(id);
    const user = await fetch(url + "/user" + id);
    console.log(user);
  } catch (err) {}
};
