import React, { useContext } from "react";
import Settings from "./components/settings/Settings";
import Login from "./components/users/Login";
import Chat from "./components/chats/Chat";
import SignUp from "./components/users/SignUp";
import NavBar from "./components/shared/NavBar";
import ForgettingPW from "./components/users/ForgettingPW";
import ResetPW from "./components/users/ResetPW";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container className="text-secondary">
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <SignUp />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/settings" element={user ? <Settings /> : <Login />} />
            <Route path="/forgot-password" element={<ForgettingPW />} />
            <Route path="/reset/:resetToken" element={<ResetPW />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </>
  );
}

export default App;
