// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ([children]) => {
//   const [user, setUser] = useState({
//     name: "soojin",
//   });
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { auth, googleAuthProvider } from './../fireBaseConfig';

// Create the context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        axios.post('http://localhost:8080/api/users/google-login', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const value = {
    user,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
