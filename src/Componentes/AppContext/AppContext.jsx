import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AppContext = ({ children }) => {
  const collectionUsersRef = collection(db, "users");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionUsersRef, where("iud", "==", user.uid));
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        await addDoc(collectionUsersRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: popup?.providerId,
        });
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const loginWithUserAndEmail = async (name, email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await addDoc(collectionUsersRef, {
        uid: user.uid,
        name,
        providerId: "email/password",
        email: user.email,
      });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const sendPasswordToUser = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Se ha enviado un correo para cambiar tu constraseña.");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async () => {
      if (user) {
        const q = query(collectionUsersRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    userStateChanged();
    if (user || userData) {
      navigate("/");
    } else {
      navigate("login");
    }
    return () => userStateChanged();
  }, []);

  const initialState = {
    signInWithGoogle: signInWithGoogle,
    loginWithUserAndEmail: loginWithUserAndEmail,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPasswordToUser: sendPasswordToUser,
    signOutUser: signOutUser,
    user: user,
    userData: userData,
  };

  return (
    <div>
      <AuthContext.Provider value={initialState}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AppContext;
