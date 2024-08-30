"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import cookies from "js-cookie";
const Context = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(null);
  const API = "/api/auth";


  const create = useCallback(async (payload) => {
    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { data } = await res.json();
        setError(null);
        setUser(data?.loginUser?.user);
        setStatus("loggedIn");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid login");
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { user, token } = await res.json();
        console.log(error);
        if (error) throw new Error(error[0].message);
        setError(null);
        cookies.set("token", token, { expires: 7 });
        // console.log(token);
        setUser(user);
        setStatus("loggedIn");
        return user;
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid login");
      }
    } catch (error) {
      setError(error.message);
      throw new Error("An error occurred while attempting to login.");
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = cookies.get("token");
        const res = await fetch(`${API}/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const { user: meUser } = await res.json();
          setUser(meUser || null);
          setStatus(meUser ? "loggedIn" : undefined);
        } else {
          setUser(null);
          setStatus(undefined);
        }
      } catch (e) {
        setUser(null);
        setStatus(undefined);
        console.error(e);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/auth/login";
        setUser(null);
        setStatus("loggedOut");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Forgot password
  const forgotPassword = useCallback(async (args) => {
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: args.email,
        }),
      });

      if (res.ok) {
        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setUser(data);
      } else {
        throw new Error("Error in forgot password process.");
      }
    } catch (e) {
      console.error(e);
      throw new Error(
        "An error occurred while attempting to reset the password."
      );
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (args) => {
    try {
      const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      });

      if (res.ok) {
        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setUser(data);
        console.log(user);
        setStatus(data ? "loggedIn" : undefined);
      } else {
        throw new Error("Error in reset password process.");
      }
    } catch (e) {
      console.error(e);
      throw new Error(
        "An error occurred while attempting to reset the password."
      );
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        handleLogout,
        create,
        resetPassword,
        forgotPassword,
        status,
        setError,
        error
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
