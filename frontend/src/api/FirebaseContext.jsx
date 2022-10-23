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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBISOZb7p-4Jgbf2CxQ2_437G9wZsxI8w",
  authDomain: "agahiosalamati-52aef.firebaseapp.com",
  projectId: "agahiosalamati-52aef",
  storageBucket: "agahiosalamati-52aef.appspot.com",
  messagingSenderId: "658715392034",
  appId: "1:658715392034:web:7f97c8e50ea2cb55e4727b"
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
