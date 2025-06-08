"use client";

// Wrapper component for embedding ThoughtSpot content in a React application.
import { AuthStatus, AuthType, init } from "@thoughtspot/visual-embed-sdk";

import { getAuthToken } from "@/lib/trusted_auth";
import { constants } from "@/lib/constants";

import { useStyle } from "@/contexts/StyleContext";

export default function ThoughtSpotEmbed({
  children,
}: {
  children: React.ReactNode;
}) {
  const { style, setStyle } = useStyle();

  const tsInitialize = () => {
    console.log("Initializing ThoughtSpot SDK");

    // Custom CSS for the pop-up embed.  Add to the init.
    const customizations = {
      style: {
        customCSS: {
          variables: {},
          rules_UNSTABLE: {
            ".embed-module__tsEmbedContainer": {
              "min-height": "0px !important",
              "min-width": "0px !important",
            },
          },
        },
      },
    };

    // Lesson 1.2 - Add an init block to authenticate using trusted authentication.
    // const ee = undefined;

    const ee = init({
      thoughtSpotHost: constants.tsURL,
      authType: AuthType.TrustedAuthTokenCookieless,
      username: constants.username,
      getAuthToken: getAuthToken,
      disableTokenVerification: true,
      callPrefetch: true,
      customizations: customizations,
    });

    if (ee) {
      ee.on(AuthStatus.SUCCESS, () => {
        console.log("Success");
      })
        .on(AuthStatus.SDK_SUCCESS, () => {
          console.log("SDK Success");
        })
        .on(AuthStatus.FAILURE, (reason) => {
          console.log("Failure:  " + reason);
        });
    }
  };

  tsInitialize();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full" id="ts-embed">
        {children}
      </div>
    </div>
  );
}
