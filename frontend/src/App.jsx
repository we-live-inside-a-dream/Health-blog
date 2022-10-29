import React, { useState } from "react";
import APIProvider from "./api/APIContext";
import AppRoutes from "./routes/AppRoutes";
import FirebaseProvider from "./api/FirebaseContext";
import AuthProvider from "./api/AuthContext";
import "./App.css";
import LoginModal from "./components/LoginModal";

const App = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const toggleModal = () => {
    setLoginModalVisible(!loginModalVisible);
  };

  return (
    <FirebaseProvider>
      <APIProvider>
        <AuthProvider>
          {loginModalVisible && <LoginModal toggleModal={toggleModal} />}
          <AppRoutes toggleModal={toggleModal} />
        </AuthProvider>
      </APIProvider>
    </FirebaseProvider>
  );
};

export default App;
