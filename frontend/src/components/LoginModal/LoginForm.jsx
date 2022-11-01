import React, { useState } from "react";
import { useAuth } from "../../api/AuthContext";


const LoginForm = () => {

    const authContext = useAuth();
    const { login } = authContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


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
        <h1>Sign in to AgahioSalamati</h1>
        <label htmlFor="email"> email
        <input
          type="email"
          id="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          />
          </label>
          <label htmlFor="password"> Password
        <input
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
