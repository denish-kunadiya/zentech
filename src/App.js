import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
// import boardsSlice from "./redux/boardsSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import ProtectedLayouts from "./routes/ProtectedLayouts";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  // const dispatch = useDispatch();
  // const boards = useSelector((state) => state.boards);
  // const activeBoard = boards.find((board) => board.isActive);
  // if (!activeBoard && boards.length > 0)
  //   dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <Routes>
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Navigate to="error" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/home" element={<ProtectedLayouts Component={<Home />} /> } /> */}
        <Route path="/home" element={<ProtectedLayouts Component={Home} />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
