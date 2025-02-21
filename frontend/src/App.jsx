import React from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Selector from "./components/visuazizer/Selector";
import Show from './components/visuazizer/Show';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/visualizer/show" element={<Show />} />
          <Route path="/visualizer/select" element={<Selector />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
