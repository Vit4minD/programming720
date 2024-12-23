"use client";
import { useState, useEffect } from "react";
import IDE from "./IDE";
import Timer from "./timer";
import { FaRegPlayCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import data from "../constants/data";
import { ToastContainer, toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

type PDFInfo = {
  year: string;
  comp: string;
};

const Landing = ({ year, comp }: PDFInfo) => {
  const [run, setRun] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<any>(0);
  useEffect(() => {
    if (correct) {
      toast.success("Correct!");
      setScore(score + 60);
      setCorrect(false);
    }
  }, [correct]);
  return (
    <main className="w-screen h-screen max-h-screen overflow-x-hidden overflow-y-hidden bg-[#F0F0F0] flex flex-col">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-white w-full flex flex-row items-center justify-between p-2">
        <p className="font-bold text-xl ml-2">Score: {score}</p>
        <div className="flex flex-row gap-x-2 items-center">
          <button
            onClick={() => {
              setRun(!run);
            }}
            className="btn btn-sm btn-outline text-lg"
          >
            {run ? (
              <HashLoader size="25" />
            ) : (
              <FaRegPlayCircle className="text-lg" />
            )}
          </button>
          <button
            onClick={() => {
              setSubmit(!submit);
            }}
            className="btn btn-sm btn-outline btn-success text-lg"
          >
            {submit ? (
              <HashLoader size="25" color="green" />
            ) : (
              <>
                <IoCloudUploadOutline className="text-xl" />
                Submit
              </>
            )}
          </button>
        </div>
        <Timer />
      </div>
      <div className="w-full h-full flex flex-row shadow-inner">
        <div className="w-1/2 h-full flex-row flex p-3 rounded-md shadow-inner">
          <iframe
            src={"/" + year + "/"+ comp +"/packet.pdf#toolbar=0&navpanes=0"}
            className="w-full h-full rounded-lg"
            title="PDF Viewer"
          />
        </div>
        <div className="w-1/2 h-full p-3 rounded-lg shadow-2xl">
          <IDE
            year={year}
            comp={comp}
            correct={correct}
            setCorrect={setCorrect}
            run={run}
            setRun={setRun}
            submit={submit}
            setSubmit={setSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default Landing;
