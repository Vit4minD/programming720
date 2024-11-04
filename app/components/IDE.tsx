"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface Project {
  id: string;
  // Add other relevant properties if needed
}

export default function IDE() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
  }`);
  const [output, setOutput] = useState("");

  const handleRun = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/execute", { code });
      setOutput(response.data);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code");
    }
  };

  return (
    <>
      <div className="flex justify-center items-start pt-10 h-screen">
        <div className="w-full max-w-4xl p-4 border">
          <form onSubmit={handleRun}>
            <div>
              <label htmlFor="comment" className="sr-only">
                Add your code
              </label>
              <Editor
                height="50vh"
                defaultLanguage="java"
                defaultValue={code}
                onChange={(value) => setCode(value || "")} // Update code on change
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-5"></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Run
                </button>
              </div>
            </div>
          </form>
          {output && (
            <div className="mt-4 p-2 border border-gray-300">
              <h3>Output:</h3>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
