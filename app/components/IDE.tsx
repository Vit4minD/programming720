import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { stdin } from "process";
import { RiArrowDropDownLine } from "react-icons/ri";

const IDE = () => {
  const [code, setCode] = useState(`import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
  const [output, setOutput] = useState<string>("");

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: "java",
          version: "15.0.2",
          files: [{ content: code }],
          // stdin: "10\n7\n100\n63\n42\n2520\n1\n23\n72\n60\n625",
        }
      );
      setOutput(response.data.run.output); // Adjust based on the API's response structure\
      console.log(response.data.run.output);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col shadow-inner">
      <div className="p-4 w-full bg-[#1E1E1E]">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn bg-white btn-outline btn-md p-2 btn-neutral text-xl">1. Akansha<RiArrowDropDownLine className="text-3xl" /></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 w-52 shadow">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
      <div className="h-full w-full flex ">
        <form onSubmit={handleRun}>
          <Editor
            width="49vw"
            height="75vh"
            className="flex h-full w-full"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 16, // Change this value to adjust the text size
              lineNumbers: "on", // Additional customization (optional)
              minimap: { enabled: false }, // Hide the minimap (optional)
            }}
          />
        </form>
      </div>
      <div className="mt-2 p-2 shadow-inner w-full h-full rounded-lg border-slate-300 border-2">
        <div className="flex flex-row gap-x-2 ">
          <label className="font-semibold">Test Case</label>
          <label>|</label>
          <label className="font-semibold">Test Output</label>
        </div>
      </div>
    </div>
  );
};

export default IDE;
