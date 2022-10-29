import React, { useState } from "react";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginModal = ({ toggleModal }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <div
        aria-label="overlay"
        role="button"
        tabIndex={0}
        onClick={toggleModal}
        onKeyPress={({ key }) => {
          if (key === " ") {
            toggleModal();
          }
        }}
        className={styles.overlay}
      />
      <div className={styles.modal}>
        {!isRegister && <LoginForm />}
        {isRegister && <RegisterForm />}
        <div>
          <button type="button" onClick={() => setIsRegister(true)}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
