import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../api/AuthContext";
import styles from "./NavBar.module.css";

const NavBar = ({ toggleModal }) => {
  const authContext = useAuth();
  const { user, logout } = authContext;

  return (
    <div className={styles.nav}>
      <div className={styles.navLogo}>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>
      <div className={styles.navLeft}>
        <Link to="/">
          <button type="button" className={styles.navButton}>
            Home
          </button>
        </Link>
        <Link to="/about">
          <button type="button" className={styles.navButton}>
            About
          </button>
        </Link>
        <Link to="/posts">
          <button type="button" className={styles.navButton}>
            Posts
          </button>
        </Link>
        {user && (
          <>
            <Link to="/admin/upload">
              <button type="button" className={styles.navButton}>
                Upload
              </button>
            </Link>
            <Link to="/admin/users">
              <button type="button" className={styles.navButton}>
                Users
              </button>
            </Link>
          </>
        )}
      </div>
      <div className={styles.navRight}>
        {user ? (
          <button
            type="button"
            className={styles.navButton}
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            className={styles.navButton}
            onClick={toggleModal}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
