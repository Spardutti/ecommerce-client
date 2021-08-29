import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useEffect } from "react";
import { newUser } from "../API/API";
import { Redirect } from "react-router-dom";

export const NewAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [createAccErrors, setCreateAccErrors] = useState([]);
  const [accCreated, setAccCreated] = useState(false);
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmHandler = (e) => {
    setConfirm(e.target.value);
  };

  useEffect(() => {
    setAccCreated(false);
  }, []);

  useEffect(() => {
    if (accCreated) {
      if (count > 0) {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      }
    }
  }, [accCreated, count]);

  useEffect(() => {
    if (count === 0) setRedirect(true);
  }, [count]);

  return (
    <Form className="container mt-5 text-light p-2 bg-dark rounded">
      {accCreated ? (
        <FormGroup className="text-center">
          <div className="p-5">
            <Label className="p-5">Account created</Label>
            <br />
            <Label>Redirecting in {count}</Label>
          </div>
        </FormGroup>
      ) : (
        <div>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={emailHandler}
              vaue={email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Usuario</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={usernameHandler}
              value={username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={passwordHandler}
              value={password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassowrd">Email</Label>
            <Input
              type="password"
              name="confirm"
              placeholder="Confirm password"
              onChange={confirmHandler}
              value={confirm}
            />
          </FormGroup>
          {createAccErrors
            ? createAccErrors.map((error) => {
                return (
                  <FormGroup className="text-center">
                    <Label>{error.msg}</Label>
                  </FormGroup>
                );
              })
            : null}
          <FormGroup className="d-flex justify-content-center">
            <Button
              className="btn bg-primary mt-3 w-25"
              onClick={async () => {
                let info = await newUser(email, username, password, confirm);
                if (info.response.status === 500) {
                  setCreateAccErrors(info.data.errors);
                }
                if (info.response.status === 200) setAccCreated(true);
              }}
            >
              Crear
            </Button>
          </FormGroup>
        </div>
      )}
      {redirect ? <Redirect to="/ecommerce-client/login" /> : null}
    </Form>
  );
};
