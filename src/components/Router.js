import React from "react";
import { Route, Routes } from "react-router-dom";
import VideoChat from "../page/VideoChat";
import QnAList from "../page/QnAList";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VideoChat />} />
        <Route path="/qnalist" element={<QnAList />} />
      </Routes>
    </>
  );
}
