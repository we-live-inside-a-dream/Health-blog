import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from "firebase/auth";
import React, { createContext, useMemo } from "react";
import { useFirebase } from "./FirebaseContext";

const APIContext = createContext();
export const useAPI = () => React.useContext(APIContext);
const APIProvider = ({ children }) => {
  const fbContext = useFirebase();
  const { auth } = fbContext;
  const authAPI = {
    login: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
    register: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    resetPassword: (email) => sendPasswordResetEmail(auth, email),
    updatePassword: (user, password) => updatePassword(user, password),
    updateEmail: (user, email) => updateEmail(user, email),
    getAuthListener: () => (setter) => {
      auth.onAuthStateChanged((user) => {
        setter(user);
      });
    }
  };

  const userAPI = {
    getAll: fbContext.getCollectionListener("users"),

    add: fbContext.getDocAdder("users"),

    update: fbContext.getDocUpdater("users"),

    get: fbContext.getDocListener("users")
  };
  const postAPI = {
    getAll: fbContext.getCollectionListener("posts"),

    add: fbContext.getDocAdder("posts"),

    update: fbContext.getDocUpdater("posts"),

    get: fbContext.getDocListener("posts")
  };
  const fileAPI = {
    add: fbContext.getFileAdder("files"),

    addToCollection: fbContext.getDocAdder("files"),

    getAll: fbContext.getCollectionListener("files")
  };

  const APIs = useMemo(
    () => ({
      userAPI,
      postAPI,
      authAPI,
      fileAPI
    }),
    [userAPI, postAPI, authAPI]
  );
  return <APIContext.Provider value={APIs}>{children}</APIContext.Provider>;
};

export default APIProvider;
