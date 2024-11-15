import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const IDE = () => {
  const [code, setCode] = useState(`public class Main {
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
        }
      );
      setOutput(response.data.run.output); // Adjust based on the API's response structure
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleRun}>
        <Editor
          height="80vh"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
        <button type="submit" className="bg-indigo-600 text-white p-2 mt-2">
          Run
        </button>
      </form>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default IDE;
