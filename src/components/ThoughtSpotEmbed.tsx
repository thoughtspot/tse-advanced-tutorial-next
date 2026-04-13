"use client";

// Wrapper component for embedding ThoughtSpot content in a React application.
import { useEffect, useState } from "react";

// Module-level guard: prevents init() from running more than once
// even under React StrictMode's double-mount in development.
let tsSDKInitialized = false;

import { AuthStatus, AuthType, init } from "@thoughtspot/visual-embed-sdk";

import { getAuthToken } from "@/lib/trusted_auth";
import { constants } from "@/lib/constants";

export default function ThoughtSpotEmbed({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);

  const tsInitialize = () => {
    console.log("Initializing ThoughtSpot SDK");

    // Lesson 1.2 - Add an init block to authenticate using trusted authentication.
    const ee = undefined;

    if (ee) {
      ee.on(AuthStatus.SUCCESS, () => {
        console.log("Success");
      })
        .on(AuthStatus.SDK_SUCCESS, () => {
          console.log("SDK Success");
          setInitialized(true);
        })
        .on(AuthStatus.FAILURE, (reason) => {
          console.log("Failure:  " + reason);
        });
    }
  };

  useEffect(() => {
    if (!tsSDKInitialized) {
      tsSDKInitialized = true;
      tsInitialize();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full" id="ts-embed">
        {initialized ? (
          children
        ) : (
          <div className="flex items-center justify-center w-full" style={{ height: "85vh" }}>
            <p className="text-gray-500 text-xl">ThoughtSpot is not initialized.</p>
          </div>
        )}
      </div>
    </div>
  );
}
