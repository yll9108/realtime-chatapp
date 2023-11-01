
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import ForgettingPW from "./components/ForgettingPW";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './fireBaseConfig';

function App() {
    // State to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handler for logging in
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Using useEffect to log updated state
    useEffect(() => {
        console.log("Updated isLoggedIn value:", isLoggedIn);
        auth.onAuthStateChanged(user => {
            if (user) {
                handleLogin();
            } else {
                handleLogout();
            }
        });
    }, [isLoggedIn]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false);
        });
      };
      

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Chat handleLogout={handleLogout} />
                            ) : (
                                <Login handleLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgettingPW />}
                    ></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;