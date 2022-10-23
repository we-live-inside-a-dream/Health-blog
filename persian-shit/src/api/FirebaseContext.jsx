import React, { createContext, useContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  collection,
  connectFirestoreEmulator
} from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6WsfsWhrXnkIU85RDGawDXqeV7ffBKOc",
  authDomain: "persian-shit.firebaseapp.com",
  projectId: "persian-shit",
  storageBucket: "persian-shit.appspot.com",
  messagingSenderId: "409189508251",
  appId: "1:409189508251:web:f7956eeb6b81ef148b123e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const FirebaseProvider = ({ children }) => {
  const getCollectionListener = (collectionName) => (setter) => {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (docSnap) => {
      const data = docSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setter(data);
    });
    return unsubscribe;
  };

  const getDocListener = (collectionName) => (document, setter) => {
    const docRef = doc(db, collectionName, document);
    const unsubscribe = onSnapshot(docRef, (d) => {
      if (d.exists()) {
        return setter(d.data());
      }
      return setter(null);
    });
    return unsubscribe;
  };

  const getDocAdder = (collectionName) => async (data) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
  };

  const getDocUpdater = (collectionName) => async (data) => {
    const docRef = doc(db, collectionName, doc);
    await updateDoc(docRef, data);
  };

  // storage
  const getFileAdder = (folder) => async (file) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // useMemo for functions
  const funcs = useMemo(
    () => ({
      auth,
      getCollectionListener,
      getDocListener,
      getDocAdder,
      getDocUpdater,
      getFileAdder
    }),
    [db]
  );
  return (
    <FirebaseContext.Provider value={funcs}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
