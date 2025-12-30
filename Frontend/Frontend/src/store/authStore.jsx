// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("authUser");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const loginUser = (data) => {
//     localStorage.setItem("authUser", JSON.stringify(data));
//     setUser(data);
//   };

//   const logoutUser = async () => {
//     if (!user?.token) return;

//     localStorage.removeItem("authUser");
//     setUser(null);
//     return true;
//   };

//   const isAdmin = user?.role === "Admin"; 

//   return (
//     <AuthContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const authHook = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("authHook must be used inside AuthProvider");
//   }
//   return context;
// };



import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = (data) => {
    localStorage.setItem("authUser", JSON.stringify(data));
    setUser(data);
  };

  const logoutUser = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const authHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("authHook must be used inside AuthProvider");
  }
  return context;
};
