import React, { useState } from "react"
import styles from './Lowereader.module.css'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
const Lowerheader = () =>  {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      {/* Hamburger always visible */}
      <button
        className={styles.hammenu}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <MenuOutlinedIcon /> All
      </button>

      {/* Menu list */}
      <ul className={`${styles.menu} ${open ? styles.active : ""}`}>
        <li><a href="/">Best Sellers</a></li>
        <li><a href="/">Today's Deals</a></li>
        <li><a href="/">New Releases</a></li>
        <li><a href="/">Customer Service</a></li>
        <li><a href="/">Gift Cards</a></li>
        <li><a href="/">Registry</a></li>
      </ul>
    </nav>
  )
}

export default Lowerheader
