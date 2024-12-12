"use client";
import { useState, useEffect } from "react";
import IDE from "./components/IDE";

const Home = () => {
  return (
    <main className="w-screen h-screen bg-slate-100 flex flex-row">
      <div className="w-1/2 h-full">
        <iframe
          src="/2024/CompSciP_StudyPacket_A_24.pdf" // Replace with your PDF file's path
          className="w-full h-full"
          title="PDF Viewer"
        />
      </div>
      <div className="w-1/2 h-full">
        <IDE />
      </div>
    </main>
  );
};

export default Home;
