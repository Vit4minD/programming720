"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState, FormEvent } from "react";

interface Project {
  id: string;
  // Add other relevant properties if needed
}

export default function IDE() {
  const [project, setProject] = useState<Project | null>(null); // Specify type here
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const createProject = async () => {
      try {
        const response = await fetch("/api/createproject", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const responseData = await response.json();
        setProject(responseData);
      } catch (error) {
        console.error("Failed to create project: ", error);
      }
    };

    createProject();
  }, []);

  const project_id = project ? project.id : ""; // Safely access project ID

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms)); // Type 'ms' correctly

  const pollDeploymentStatus = async (deploymentId: any) => {
    let response;
    try {
      response = await fetch("/api/getdeployment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deploymentId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
    return response ? await response.json() : null; // Handle possible undefined response
  };

  const updateStatus = (message: string | null) => {
    const messageElement = document.querySelector(".ide-message");
    if (messageElement) {
      messageElement.textContent = message;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateStatus("Deploying code...");

    const codeText = (event.target as HTMLFormElement).querySelector(".monaco-scrollable-element")?.textContent;
    try {
      const response = await fetch("/api/createdeployment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeText, project: project_id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let responseData = await response.json();
      while (responseData["status"] === "pending") {
        await sleep(3000); // Use sleep instead of delay
        responseData = await pollDeploymentStatus(responseData["id"]);
      }

      if (responseData["status"] === "success") {
        setURL(`http://${responseData.domains[0]}`);
        updateStatus("Successfully deployed.");
      } else {
        updateStatus("Deployment failed.");
        throw new Error("Deployment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start pt-10 h-screen">
        <div className="w-full max-w-4xl p-4 border">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="comment" className="sr-only">
                Add your code
              </label>
              <Editor
                height="50vh"
                defaultLanguage="java"
                defaultValue={`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
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
        </div>
        <div className="flex justify-center items-start pt-10 h-screen">
        <div className="w-full max-w-4xl p-4 border">
          <div className="mt-4">
            <p className="ide-message mb-4"></p>
            {isLoading && (
              <p className="text-center">Deployed code will run here.</p>
            )}
            {URL.length !== 0 ?
              <iframe
                src={URL}
                title="Deployed Project"
                width="100%"
                height="300px"
                onLoad={handleLoad}
                onError={handleError}
                style={{ display: isLoading ? "none" : "block" }}
              /> : null}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
