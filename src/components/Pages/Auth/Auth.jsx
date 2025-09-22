import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/firebase";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { DotLoader, ClipLoader } from "react-spinners";
import { useCart } from "../../Utility/CartContext";
import { ACTIONS } from "../../Utility/actions";
import styles from "./Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const [loadingAction, setLoadingAction] = useState(""); 

  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setMessage(location.state.successMessage);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const action = e.nativeEvent.submitter.name;
    setLoading(true);          
    setLoadingAction(action);  

    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      setLoadingAction("");
      return;
    }

    try {
      if (action === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        dispatch({ type: ACTIONS.SET_USER, payload: user });

        setLoading(false);
        setLoadingAction("");

        navigate("/signin", {
          state: {
            successMessage: "created successfully! Please login",
           }});
       
      } else if (action === "signin") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        dispatch({ type: ACTIONS.SET_USER, payload: user });

        setLoading(false);
        setLoadingAction("");

        navigate(location.state?.redirectTo || "/"); 
      }
    } catch (err) {
      setLoading(false);
      setLoadingAction("");

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (loading && !loadingAction) {
   
    return (
      <div className={styles.pageLoader}>
        <DotLoader size={60} color="#36d7b7" loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className={styles.logo}
        />
      </Link>

      <h2>Amazon Authentication</h2>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={loading}
        />

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            name="signup"
            className={styles.buttonPrimary}
            disabled={loading}
          >
            {loadingAction === "signup" ? (
              <ClipLoader size={20} color="#fff" loading={true} />
            ) : (
              "Create Account"
            )}
          </button>

          <button
            type="submit"
            name="signin"
            className={styles.buttonSecondary}
            disabled={loading}
          >
            {loadingAction === "signin" ? (
              <ClipLoader size={20} color="#000" loading={true} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
