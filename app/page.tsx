"use client";
import { useState } from "react";
import IDE from "./components/IDE";

const Home = () => {
  const [width, setWidth] = useState(50); // initial width as a percentage of screen width
  const [height, setHeight] = useState(50); // initial height as a percentage of screen height
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);

  const startDraggingHorizontal = () => {
    setIsDraggingHorizontal(true);
  };

  const stopDraggingHorizontal = () => {
    setIsDraggingHorizontal(false);
  };

  const startDraggingVertical = () => {
    setIsDraggingVertical(true);
  };

  const stopDraggingVertical = () => {
    setIsDraggingVertical(false);
  };

  const handleDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingHorizontal) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setWidth(newWidth);
    }
    if (isDraggingVertical) {
      const newHeight = (e.clientY / window.innerHeight) * 100;
      setHeight(newHeight);
    }
  };

  return (
    <>
      <h1>hey</h1>
      <div
        className="w-screen h-screen bg-gray-300 flex flex-row justify-center"
        onMouseMove={handleDragging}
        onMouseUp={() => {
          stopDraggingHorizontal();
          stopDraggingVertical();
        }}
      >
        {/* Left side section with vertical adjustability */}
        <div
          className="h-screen"
          style={{
            width: `${width}%`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>problems</div>
        </div>

        {/* Horizontal resizable divider */}
        <div
          className="w-[.1rem] mx-1 hover:bg-blue-500 bg-white cursor-col-resize"
          onMouseDown={startDraggingHorizontal}
          onMouseUp={stopDraggingHorizontal}
        ></div>

        {/* Right side section containing IDE component */}
        <div
          className="flex flex-col"
          style={{ width: `${100 - width}%`, height: `${height}%` }}
        >
          <div style={{ height: `${height}%` }}>
            <IDE width={`${100 - width}vw`} />
          </div>

          {/* Vertical resizable divider */}
          <div
            className="h-[.1rem] mt-2 bg-blue-500 cursor-row-resize"
            onMouseDown={startDraggingVertical}
            onMouseUp={stopDraggingVertical}
          ></div>

          <div style={{ height: `${100 - height}%` }}>Additional Section</div>
        </div>
      </div>
    </>
  );
};

export default Home;
