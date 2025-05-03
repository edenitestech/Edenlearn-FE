// import { createContext, useContext, useState, useEffect } from 'react';
// import { auth, db } from '../firebase';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut, 
//   onAuthStateChanged 
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function signup(email, password, additionalData) {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await setDoc(doc(db, 'users', userCredential.user.uid), {
//       uid: userCredential.user.uid,
//       email,
//       ...additionalData
//     });
//     return userCredential.user;
//   }

//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function logout() {
//     return signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
//         setCurrentUser({ uid: user.uid, ...userDoc.data() });
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }



import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Mock authentication functions
  const signup = (email, password) => {
    setCurrentUser({ email, uid: 'mock-user-id' });
    return Promise.resolve();
  };

  const login = (email, password) => {
    setCurrentUser({ email, uid: 'mock-user-id' });
    return Promise.resolve();
  };

  const logout = () => {
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}