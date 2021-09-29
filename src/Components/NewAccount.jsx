import { useState, useEffect } from "react";
import { newUser } from "../API/API";
import Spinner from "./Styled/Spinner";

export const NewAccount = ({ setNewAccount }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [createAccErrors, setCreateAccErrors] = useState(false);
  const [accCreated, setAccCreated] = useState(false);
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setCreateAccErrors(false);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setCreateAccErrors(false);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setCreateAccErrors(false);
  };

  const confirmHandler = (e) => {
    setConfirm(e.target.value);
    setCreateAccErrors(false);
  };

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
    if (count === 0) setNewAccount(false);
  }, [count, setNewAccount]);

  // CLOSE NEW ACCOUNT FORM
  const hideForm = () => {
    setNewAccount(false);
  };

  // CONST CREATE ACCOUNT
  const CreateAccBtn = () => {
    return (
      <div className="btn-container">
        <button
          className="btn btn-black"
          onClick={async (e) => {
            setLoading(true);
            e.preventDefault();
            const response = await newUser(email, username, password, confirm);
            if (response.response.status === 500) {
              setCreateAccErrors(response.data.errors);
              setLoading(false);
            }
            if (response.response.status === 200) {
              setLoading(false);
              setAccCreated(true);
            }
          }}
        >
          Create
        </button>
      </div>
    );
  };

  // SHOW ERRORS
  const ShowErrors = () => {
    return createAccErrors.map((error) => {
      return (
        <div className="errors">
          <label>{error.msg}</label>
        </div>
      );
    });
  };

  // ACCOUNT SUCCESS
  const AccountSuccess = () => {
    return (
      <div className="success-container">
        <p>Account Created!</p>
        <p>Closing in... {count}</p>
      </div>
    );
  };

  return (
    <div className="overlay" onClick={hideForm}>
      <form action="" className="form " onClick={(e) => e.stopPropagation()}>
        <div className="input-container new-acc">
          <input
            type="text"
            name="email"
            value={email}
            onChange={emailHandler}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-container new-acc">
          <input
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
            required
          />
          <label>Username</label>
        </div>
        <div className="input-container new-acc">
          <input
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
            required
          />
          <label>Password</label>
        </div>
        <div className="input-container new-acc">
          <input
            type="password"
            name="password"
            value={confirm}
            onChange={confirmHandler}
            required
          />
          <label>Confirm Password</label>
        </div>
        {createAccErrors ? (
          <ShowErrors />
        ) : loading ? (
          <Spinner />
        ) : accCreated ? (
          <AccountSuccess />
        ) : (
          <CreateAccBtn />
        )}
      </form>
    </div>
  );
};
