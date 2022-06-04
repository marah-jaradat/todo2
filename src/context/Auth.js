import React, { useState, useEffect } from "react";
import JWT from "jwt-decode";
import base64 from "base-64";
import cookie from "react-cookies";
import axios from "axios";
import form from "../components/form";

export const AuthContext = React.createContext();

export default function Auth(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signUp = (username, password, role) => {
    axios
      .post("https://api-integration-server.herokuapp.com/signup", {
        username: username,
        password: password,
        role: role,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const signIn = async (username, password) => {
    if (username === "" || password === "") {
      return false;
    }
    try {
      let res = await axios.post(
        "https://api-integration-server.herokuapp.com/signin",
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );
      setLoginState(true, res.data.user);
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const setLoginState = (loggedIn, user) => {
    cookie.save("auth", user?.token);
    setIsLoggedIn(loggedIn);
    setUser(user);
  };
  const signOut = () => {
    setIsLoggedIn(false);
    setUser({});
    cookie.remove("dataUser");
  };
  const authurized = (action) => {
    return user?.actions?.includes(action);
  };
  const validateToken = (res) => {
    if (res) {
      const valid = JWT(res.token);
      if (valid) {
        setIsLoggedIn(true);
        setUser(res);
        cookie.save("dataUser", res);
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    } else {
      setIsLoggedIn(false);
      setUser({});
    }
  };
  const state = {
    user,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
    authurized,
    setUser,
    setIsLoggedIn,
    form,
  };
  useEffect(() => {
    const data = cookie.load("dataUser");
    if (data) {
      validateToken(data);
    }
  }, []);
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
