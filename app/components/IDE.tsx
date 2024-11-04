import { useState } from "react";
import Editor from "@monaco-editor/react";

interface IDEProps {
  width: string;
}

const IDE: React.FC<IDEProps> = ({ width }) => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
  }`);
  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    // Code to handle the run action
  };

  return (
    <div className="h-full">
      <form onSubmit={handleRun}>
        <Editor
          height="80vh"
          width={width} // dynamically sets the width
          defaultLanguage="java"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
        {/* Uncomment the button if needed */}
        {/* <button type="submit" className="bg-indigo-600 text-white p-2 mt-2">
          Run
        </button> */}
      </form>
    </div>
  );
};

export default IDE;
