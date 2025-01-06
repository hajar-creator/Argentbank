import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserProfile } from "../slices/userSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, loading, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

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
        <button className="sign-in-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
