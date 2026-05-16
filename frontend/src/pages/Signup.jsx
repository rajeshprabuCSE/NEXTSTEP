import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await signupUser(formData);

      alert(data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>NEXTSTEP</h1>

        <p>
          Create your intelligent opportunity
          dashboard.
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Signup"}
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}