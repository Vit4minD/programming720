import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { stdin } from "process";

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
    <div className="h-full w-full flex shadow-inner">
      <form onSubmit={handleRun}>
        <Editor
          width="49vw"
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
  );
};

export default IDE;
