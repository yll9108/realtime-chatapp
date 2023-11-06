import React, { useContext } from "react";
import Login from "./components/users/Login";
import Chat from "./components/chats/Chat";
import SignUp from "./components/users/SignUp";
import NavBar from "./components/shared/NavBar";
import ForgettingPW from "./components/users/ForgettingPW";
import ResetPW from "./components/users/ResetPW";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
// import Sidebar from "./components/shared/Sidebar";
// import { auth } from "./fireBaseConfig";

function App() {
  // State to track login status
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Handler for logging in
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // // Using useEffect to log updated state
  // useEffect(() => {
  //   console.log("Updated isLoggedIn value:", isLoggedIn);
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       handleLogin();
  //     } else {
  //       handleLogout();
  //     }
  //   });
  // }, [isLoggedIn]);

  // const handleLogout = () => {
  //   auth.signOut().then(() => {
  //     setIsLoggedIn(false);
  //   });
  // };

  const { user } = useContext(AuthContext);
  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <SignUp />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/forgot-password" element={<ForgettingPW />} />
            <Route path="/reset/:resetToken" element={<ResetPW />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </>
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           isLoggedIn ? (
    //             <Chat handleLogout={handleLogout} />
    //           ) : (
    //             <Login handleLogin={handleLogin} />
    //           )
    //         }
    //       />
    //       <Route path="/forgot-password" element={<ForgettingPW />}></Route>
    //       <Route path="/signup" element={<SignUp />}></Route>
    //       <Route path="/reset/:resetToken" element={<ResetPW />}></Route>
    //     </Routes>
    //   </div>
    // </Router>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default App;
