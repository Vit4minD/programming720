"use client";
import { useState, useEffect } from "react";
import IDE from "./components/IDE";
import { FaRegPlayCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import data from "./constants/data";

const Home = () => {
  const [run, setRun] = useState<boolean>(false);
  return (
    <main className="w-screen h-screen max-h-screen overflow-x-hidden overflow-y-hidden bg-[#F0F0F0] flex flex-col">
      <div className="bg-white w-full flex flex-row justify-center gap-x-2 p-2">
        <button
          onClick={() => {
            setRun(!run);
          }}
          className="btn btn-sm btn-outline text-lg"
        >
          <FaRegPlayCircle className="text-lg" />
          Run
        </button>
        <button className="btn btn-sm btn-outline btn-success text-lg">
          <IoCloudUploadOutline className="text-xl" />
          Submit
        </button>
      </div>
      <div className="w-full h-full flex flex-row shadow-inner">
        <div className="w-1/2 h-full flex-row flex p-3 rounded-md shadow-inner">
          <iframe 
            src="/2024/invitationalA/CompSciP_StudyPacket_A_24.pdf#toolbar=0&navpanes=0"
            className="w-full h-full rounded-lg"
            title="PDF Viewer"
          />
        </div>
        <div className="w-1/2 h-full p-3 rounded-lg shadow-2xl">
          <IDE run={run} setRun={setRun} />
        </div>
      </div>
    </main>
  );
};

export default Home;
