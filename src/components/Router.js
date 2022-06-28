import React from "react";
import { Route, Routes } from "react-router-dom";
import VideoChat from "../page/videoChat";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VideoChat />} />
      </Routes>
    </>
  );
}
