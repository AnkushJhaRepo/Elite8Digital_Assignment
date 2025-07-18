import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllStudents from "./pages/AllStudents";
import Profile from "./pages/Profile";
import PayFees from "./pages/PayFees";
import Navbar from './components/Navbar';
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Navigate to="/login" />
          </PublicRoute>} />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>} />
        <Route path="/all-students" element={<AllStudents />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
        <Route path="/pay-fees" element={
          <ProtectedRoute>
            <PayFees />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
