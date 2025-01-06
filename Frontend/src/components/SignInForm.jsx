import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/userSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, status, error } = useSelector((state) => state.user);

  // État local pour capturer l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Redirection après connexion réussie
  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <div className="sign-in-content">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className="sign-in-button"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
