import React, { useState } from "react";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Error from "./components/Error";
import ProtectedLayouts from "./routes/ProtectedLayouts";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <Routes>
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Navigate to="error" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedLayouts Component={Home} />} />
      </Routes>
    </div>
  );
}

export default App;
