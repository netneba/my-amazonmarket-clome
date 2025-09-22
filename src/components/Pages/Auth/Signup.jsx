import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utility/firebase"; 
import { useNavigate, Link } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // alert("Account created successfully!");
      navigate("/signin"); // redirect to login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Amazon Logo */}
      <Link to="/" className={styles.logoLink}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className={styles.logo}
        />
      </Link>

      <h2>Create Account</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>

      <p>
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
