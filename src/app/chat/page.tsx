"use client";

import React, { useState, useRef, useMemo } from "react";
import "flowbite";
import "tailwindcss/tailwind.css";

import {
  SpotterAgentEmbed,
  SpotterAgentEmbedViewConfig,
} from "@thoughtspot/visual-embed-sdk";

const DataWizard = () => {
  const [prompt, setPrompt] = useState("");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const chatWorksheetID = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";
  const responseHeight = "400px";

  const conversation = useMemo(() => {
    // Lesson 4.1 - Create a bodyless conversation object to chat with.
    return "";
  }, []);

  const handlePromptSubmit = async () => {
    try {
      if (prompt.trim()) {
        addUserMessage(prompt);
        setPrompt("");

        // Add "working..." message
        const workingElement = document.createElement("div");
        workingElement.className =
          "p-3 mb-4 bg-gray-100 text-gray-800 rounded-lg italic";
        workingElement.textContent = "working...";
        resultsRef.current?.appendChild(workingElement);
        scrollToBottom();

        // Lesson 4.2 - Send the message to ThoughtSpot and await the response

        // Remove the "working..." message
        resultsRef.current?.removeChild(workingElement);

        if (container) {
          // Lesson 4.3 - Add the response that came back from ThoughtSpot.
        } else if (error) {
          throw new Error(`Error from conversation: ${error.message}`);
        }
      }
    } catch (err) {
      // Remove "working..." in case of error
      const workingElement = resultsRef.current?.querySelector("div.italic");
      if (workingElement && workingElement.textContent === "working...") {
        resultsRef.current?.removeChild(workingElement);
      }
      if (workingElement) resultsRef.current?.removeChild(workingElement);

      showError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    }
  };
  const showError = (message: string) => {
    const errorElement = document.createElement("div");
    errorElement.className = "p-3 mb-4 bg-red-100 text-red-800 rounded-lg";
    errorElement.textContent = message;
    resultsRef.current?.appendChild(errorElement);
    scrollToBottom();
  };

  const addUserMessage = (message: string) => {
    const userElement = document.createElement("div");
    userElement.className = "p-3 mb-4 bg-black-100 text-black-800 rounded-lg";
    userElement.textContent = message;
    resultsRef.current?.appendChild(userElement);
    scrollToBottom();
  };

  const sizeDivContent = (content: HTMLDivElement): void => {
    // Set some style items on the incoming div
    content.style.height = "400px";
    content.style.overflowY = "scroll";

    const iframe = content.querySelector("iframe");
    if (iframe) {
      // Apply the scaling styles to the iframe.
      iframe.style.transform = "scale(0.75)";
      iframe.style.transformOrigin = "top left";
      iframe.style.width = "140%";
      iframe.style.height = "150%";
      iframe.style.border = "none";
    } else {
      console.log("No iframe found inside the provided <div>.");
    }
  };

  // Lesson 4.4 - Review the following to understand how to add the new content.
  const addConversationResponse = (content: HTMLDivElement) => {
    sizeDivContent(content);
    console.log("Adding content", content);

    const responseElement = document.createElement("div");
    responseElement.className =
      "p-3 mb-4 bg-slate-200 rounded-lg overflow-y-scroll ";
    responseElement.appendChild(content); // Adds a child to the results area.
    resultsRef.current?.appendChild(responseElement);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (resultsRef.current) {
      resultsRef.current!.scrollTop = resultsRef.current!.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 w-full">
      {/* Title */}
      <h1 className="text-4xl font-bold text-black-600 mb-6">Data Wizard</h1>

      {/* Results Area */}
      <div
        ref={resultsRef}
        className="w-4/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-6 overflow-y-auto"
        style={{ maxHeight: "55vh" }}
      >
        <p className="text-gray-500 text-center">
          Ask the Data Wizard a question to get started.
        </p>
      </div>

      {/* Prompt Box */}
      <div className="w-4/5 flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePromptSubmit()}
          placeholder="Ask the Data Wizard a question..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black-500"
        />
        <button
          onClick={handlePromptSubmit}
          className="px-6 py-2 bg-black text-white font-medium rounded-r-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default DataWizard;
