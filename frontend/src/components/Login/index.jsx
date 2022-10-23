import React, { useState } from "react";
import { useAuth } from "../../api/AuthContext";

const Login = () => {
  const authContext = useAuth();
  const { login, register } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <button type="button" onClick={() => register(email, password)}>
        Register
      </button>
    </div>
  );
};

export default Login;
