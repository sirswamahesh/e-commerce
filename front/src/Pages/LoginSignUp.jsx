import React, { useState } from "react";
import "./CSS/LoginSignUp.css";
import { SERVER_URL } from "../serverurl";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFromData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login function", formData);
    let responseData;
    await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("signup function", formData);
    let responseData;
    await fetch(`${SERVER_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    console.log(responseData);
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <div className="loginsignup">
      <div className="login-signup-container">
        <h2>{state}</h2>
        <div className="login-signup-feilds">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          ) : (
            ""
          )}
          <input
            name="email"
            onChange={changeHandler}
            value={formData.email}
            type="email"
            placeholder="Your Email"
          />
          <input
            name="password"
            onChange={changeHandler}
            value={formData.password}
            type="password"
            placeholder="Password"
          />
        </div>
        <div
          className="login-signup-btn"
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </div>
        {state === "Sign Up" ? (
          <div className="login-signup-already">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </div>
        ) : (
          <div className="login-signup-already">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </div>
        )}

        <div className="login-signup-agree">
          <input type="checkbox" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
