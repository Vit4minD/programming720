import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import data from "../constants/data";
import { toast } from "react-toastify";

const IDE = ({
  year,
  comp,
  run,
  setRun,
  submit,
  setSubmit,
  correct,
  setCorrect,
}: {
  year: string;
  comp: string;
  run: boolean;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  submit: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  correct: boolean;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [code, setCode] = useState(`import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
  const [output, setOutput] = useState<string>("");
  const [question, setQuestion] = useState<string>(
    "1. " + data[year]?.[comp]?.problems[0]
  );
  const [input, setInput] = useState<any>();

  async function readDatFile(fileName: string): Promise<string> {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
    }
    return response.text();
  }

  useEffect(() => {
    if (run) {
      handleRun();
      const timeoutId = setTimeout(() => {
        setRun(false);
      }, 1000); // Delay of 2000 ms (2 seconds)
      return () => clearTimeout(timeoutId);
    }
  }, [run, setRun]);

  useEffect(() => {
    if (submit) {
      handleSubmit();
      const timeoutId = setTimeout(() => {
        setSubmit(false);
      }, 1000); // Delay of 2000 ms (2 seconds)
      return () => clearTimeout(timeoutId);
    }
  }, [submit, setSubmit]);

  const handleSubmit = async () => {
    try {
      let dat;
      if (question.indexOf("1") == 0) {
        dat = "";
      } else {
        dat = await readDatFile(
          year+"/"+comp+"/judgeData/" +
            question.substring(question.indexOf(" ") + 1) +
            ".dat"
        ).then((fileContent) => {
          return fileContent;
        });
      }
      const sol = await readDatFile(
        year+"/"+comp+"/judgeData/" +
          question.substring(question.indexOf(" ") + 1) +
          ".out"
      ).then((fileContent) => {
        return fileContent;
      });
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: "java",
          version: "15.0.2",
          files: [{ content: code }],
          stdin: dat,
        }
      );
      const submitOutput =
        (await response.data.run.output) || response.data.output || "No output";
      setCorrect(submitOutput == sol);
      if (!(submitOutput == sol)) toast.error("Bruh");
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  const handleRun = async () => {
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: "java",
          version: "15.0.2",
          files: [{ content: code }],
          stdin: input,
        }
      );
      console.log(response.data); // Log the entire response for debugging
      // Adjust based on the actual response structure
      setOutput(
        response.data.run.output || response.data.output || "No output"
      );
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col shadow-inner">
      <div className="p-4 w-full bg-[#1E1E1E]">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-white btn-outline btn-md p-2 btn-neutral text-lg"
          >
            {question}
            <RiArrowDropDownLine className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 w-52 shadow"
          >
            {data[year]?.[comp]?.problems.map((item: any, index: any) => (
              <li key={index}>
                <a
                  onClick={() => {
                    setQuestion("" + (index + 1) + ". " + item);
                  }}
                >
                  {index + 1 + ". "}
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-full w-full flex ">
        <Editor
          width="49vw"
          height="65vh"
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
      </div>
      <div className="overflow-x-hidden overflow-y-auto mt-2 p-2 shadow-inner w-full h-full rounded-lg border-slate-300 border-2">
        <div className="flex flex-col gap-x-2">
          <label className="font-semibold underline">Test Input :</label>
          <textarea
            className="textarea textarea-bordered mt-2"
            placeholder="Input Test Case"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              console.log(input);
            }}
          ></textarea>
        </div>
        <div className="flex flex-col gap-x-2 mb-12">
          <label className="font-semibold underline">Test Output :</label>
          <textarea
            className="textarea textarea-bordered mt-2"
            placeholder="Output"
            value={output}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default IDE;
