import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Chat from './components/Chat';

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
    }, [isLoggedIn]);

    // Handler for logging out
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="App">
            { isLoggedIn ? <Chat handleLogout={handleLogout} /> : <Login handleLogin={handleLogin} /> }
        </div>
    );
}

export default App;
