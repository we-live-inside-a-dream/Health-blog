import React from "react";
import APIProvider from "./api/APIContext";
import AppRoutes from "./routes/AppRoutes";
import FirebaseProvider from "./api/FirebaseContext";
import AuthProvider from "./api/AuthContext";
import "./App.css";

const App = () => (
  <FirebaseProvider>
    <APIProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </APIProvider>
  </FirebaseProvider>
);

export default App;
