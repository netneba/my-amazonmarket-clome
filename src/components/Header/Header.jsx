import React from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useCart } from "../Utility/CartContext";
import styles from "./Header.module.css";



const Header = () => {
  const { state, dispatch } = useCart();
  const user = state.user; 
  const totalItems = state?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch({ type: "CLEAR_USER" });
    
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        {/* Logo + Delivery */}
        <div className={styles.logoDelivery}>
          <div className={styles.logo}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>
          </div>
          <div className={styles.delivery}>
            <LocationOnOutlinedIcon fontSize="small" />
            <div>
              <p>Delivery</p>
              <span>USA</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <select>
            <option value="All">All</option>
          </select>
          <input className={styles.searchInput} placeholder="Search Amazon" />
          <button className={styles.searchBtn}>
            <SearchOutlinedIcon />
          </button>
        </div>

        {/* Right side */}
        <div className={styles.right}>
          <div className={styles.lang}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
              alt="usa flag"
            />
            <select>
              <option value="EN">EN</option>
              <option value="ET">ET</option>
            </select>
          </div>

          {/* Account */}
          {user ? (
            <div className={styles.account}>
              Hello, {user.email.split("@")[0]}
              <br />
              <strong onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</strong>
            </div>
          ) : (
            <Link to="/auth" className={styles.account}>
              Hello, Sign in
              <br />
              <strong>To Account</strong>
            </Link>
          )}

          <Link to="/order" className={styles.orders}>
            Returns
            <br />
            <strong>& Orders</strong>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.cart}>
            <AddShoppingCartOutlinedIcon />
            <span className={styles.cartCount}>{totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;