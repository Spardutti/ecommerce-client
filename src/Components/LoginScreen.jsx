import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../Styles/google-btn.css";
import { useContext, useState, useEffect } from "react";
import { localUser } from "../API/API";
import { Redirect, Link } from "react-router-dom";
import { userContext } from "../Context/Contexts";

export const LoginScreen = () => {
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

  return (
    <Form className="container  mt-4 bg-dark text-light p-4 rounded">
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email.."
          value={email}
          onChange={emailHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label for="passowrd">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password.."
          value={password}
          onChange={passwordHandler}
        />
      </FormGroup>
      {loginError ? (
        <FormGroup className="text-center pt-1">
          <Label>{loginError}</Label>
        </FormGroup>
      ) : null}
      <FormGroup className="text-center">
        <Button
          className="mt-2 mb-1 bg-primary w-25"
          onClick={async () => {
            const response = await localUser(email, password);
            if (response.status === 200) {
              setLogged(true);
              setUser(response.data.user);
            }
            if (response.status === 500) setLogginErros(response.data);
          }}
        >
          Log in
        </Button>
      </FormGroup>
      <FormGroup className="d-flex justify-content-center pt-2">
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
      </FormGroup>
      <hr />
      <FormGroup className="text-center">
        <Link to="/ecommerce-client/newaccount" className="btn bg-success">
          Crear cuenta
        </Link>
      </FormGroup>
      {logged ? <Redirect to="/ecommerce-client/" /> : null}
    </Form>
  );
};
