import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
// ..........................................................................
import Home from "./pages/home";
import Navbar from "./components/nav";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useAuthContext } from "./Hooks/UseAuthCintext";

// .............................................................................
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
            <Route path="/Login" element={!user ? <Login /> :<Navigate to="/" />} />
            <Route path="/Signup" element={!user ? <Signup /> :<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
