"use client";
import { useState } from "react";
import Landing from "./components/landing";

const Home = () => {
  const [year, setYear] = useState<string>("");
  const [comp, setComp] = useState<string>("");

  return (
    <>
      {year.length == 0 || comp.length == 0 ? (
        <div className="flex font-serif gap-y-2 underline flex-col text-6xl font-bold w-screen h-screen items-center justify-center">
          {year.length == 0 ? (
            <>
              <button
                onClick={() => {
                  setYear("2024");
                }}
              >
                2024
              </button>
              <button
                onClick={() => {
                  setYear("2023");
                }}
              >
                2023
              </button>
              <button
                onClick={() => {
                  setYear("2022");
                }}
              >
                2022
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setComp("state");
                }}
              >
                state
              </button>
              <button
                onClick={() => {
                  setComp("region");
                }}
              >
                region
              </button>
              {year == "2022" ? null : (
                <button
                  onClick={() => {
                    setComp("district");
                  }}
                >
                  district
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <Landing year={year} comp={comp} />
      )}
    </>
  );
};

export default Home;
