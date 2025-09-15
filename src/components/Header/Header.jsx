import React from 'react'
import styles from './Header.module.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logoDelivery}></div>
        {/* Logo */}
        <div className={styles.logoDelivery}>
        <div className={styles.logo}>
          <a href="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="amazon logo"
            />
          </a>
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
          <a href="/" className={styles.account}>
            Hello, Sign in
            <br />
            <strong>Account & Lists</strong>
          </a>

          {/* Orders */}
          <a href="/" className={styles.orders}>
            Returns
            <br />
            <strong>& Orders</strong>
          </a>

          {/* Cart */}
          <a href="/" className={styles.cart}>
            <AddShoppingCartOutlinedIcon />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header