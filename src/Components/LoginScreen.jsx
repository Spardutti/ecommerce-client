import { useContext, useState } from "react";
import { localUser } from "../API/API";
import { userContext } from "../Context/Contexts";
import Spinner from "./Styled/Spinner";
import { NewAccount } from "./NewAccount";

export const LoginScreen = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [loginError, setLogginErros] = useState("");
  const { setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [newAccount, setNewAccount] = useState(false);

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

  // NEW ACCOUNT FORM
  const toggleAccountForm = () => {
    setNewAccount(!newAccount);
  };

  // LOGIN BUTTON
  const LoginBtn = () => {
    return (
      <div className="btn-container">
        <button
          className="btn btn-black"
          onClick={async (e) => {
            setLoading(true);
            e.preventDefault();
            const response = await localUser(email, password);
            if (response.status === 200) {
              setLogged(true);
              setUser(response.data.user);
            }
            if (response.status === 500) setLogginErros(response.data);
            setLoading(false);
          }}
        >
          Log in
        </button>
      </div>
    );
  };

  return newAccount ? (
    <NewAccount setNewAccount={setNewAccount} />
  ) : (
    <div className="overlay" onClick={hideForm}>
      <div className="form" onClick={(e) => e.stopPropagation()}>
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
          <div className="error">
            <label>{loginError}</label>
          </div>
        ) : null}

        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <div>
            <LoginBtn />
            <div className="google-container">
              <div className="btn btn-google">
                <div className="google-icon-wrapper">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt=""
                    className=""
                  />
                </div>
                <div>
                  <a
                    onClick={() => setLoading(true)}
                    href="https://ecommercedemosite.herokuapp.com/user/google/login"
                    className="btn-text"
                  >
                    Google Login
                  </a>
                </div>
              </div>
            </div>
            <div className="new-account">
              <button className="btn btn-black" onClick={toggleAccountForm}>
                Create Account
              </button>
            </div>
          </div>
        )}
        {logged ? setLogin(false) : null}
        {newAccount ? <NewAccount /> : null}
      </div>
    </div>
  );
};
