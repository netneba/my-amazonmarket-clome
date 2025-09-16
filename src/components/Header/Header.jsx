import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logoDelivery}></div>

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

          {/* Delivery */}
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
          {/* Language */}
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
          <Link to="/login" className={styles.account}>
            Hello, Sign in
            <br />
            <strong>Account & Lists</strong>
          </Link>

          {/* Orders */}
          <Link to="/order" className={styles.orders}>
            Returns
            <br />
            <strong>& Orders</strong>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.cart}>
            <AddShoppingCartOutlinedIcon />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
