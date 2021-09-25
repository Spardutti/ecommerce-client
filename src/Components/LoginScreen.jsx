import "../Styles/google-btn.css";
import { useContext, useState, useEffect } from "react";
import { localUser } from "../API/API";
import { Redirect, Link } from "react-router-dom";
import { userContext } from "../Context/Contexts";
import "../Styles/login.css";

export const LoginScreen = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [loginError, setLogginErros] = useState("");
  const { setUser } = useContext(userContext);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // HIDE FORM
  const hideForm = () => {
    setLogin(false);
  };

  // LOGIN BUTTON
  const Button = () => {
    return (
      <div className="btn-container">
        <button
          className="btn btn-black"
          onClick={async (e) => {
            e.preventDefault();
            const response = await localUser(email, password);
            console.log(response);
            if (response.status === 200) {
              setLogged(true);
              setUser(response.data.user);
            }
            if (response.status === 500) setLogginErros(response.data);
          }}
        >
          Log in
        </button>
      </div>
    );
  };

  return (
    <div className="login-overlay" onClick={hideForm}>
      <form className="form" onClick={(e) => e.stopPropagation()}>
        <div className="input-container">
          <input
            type="text"
            name="email"
            value={email}
            onChange={emailHandler}
            autoComplete="off"
            required
          />
          <label>Email</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
            required
          />
          <label>Password</label>
        </div>
        {loginError ? (
          <div className="text-center pt-1">
            <label>{loginError}</label>
          </div>
        ) : null}
        <Button />
        <div className="d-flex justify-content-center pt-2">
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt=""
                className="google-icon"
              />
            </div>
            {/* CHANGE URL ON */}
            <a
              href="https://ecommercedemosite.herokuapp.com/user/google/login"
              className="btn-text"
            >
              <b>Log in with google</b>
            </a>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <Link to="/newaccount" className="btn bg-success">
            Crear cuenta
          </Link>
        </div>
        {logged ? <Redirect to="/" /> : null}
      </form>
    </div>
  );
};
