"use client";

// Wrapper component for embedding ThoughtSpot content in a React application.
import {
    AuthStatus,
    AuthType,
    customCssInterface,
    init,
} from "@thoughtspot/visual-embed-sdk";

import {getAuthToken} from "@/lib/utils";
import {constants, cssFiles} from "@/lib/constants";

import {useStyle} from "../contexts/StyleContext";

export default function ThoughtSpotEmbed({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const {style, setStyle} = useStyle();

    const tsInitialize = () => {
        console.log("Initializing ThoughtSpot SDK");

        // Lesson 5.2 - Review for custom CSS settings.
        let customCss: customCssInterface;
        if (style === "dark") {
            // dark mode requires a special CSS rule for tables.
            customCss = {
                rules_UNSTABLE: {
                    ".bk-outline .ag-theme-alpine .ag-row": {
                        color: "white",
                    },
                },
            };
        } else {
            customCss = {};
        }

        // Lesson 1.2 - Add an init block to authenticate using trusted authentication.
        // Lesson 5.3 - Add the customizations for styles.
        // Lesson 5.4 - Add the customization for strings.
        const ee = undefined;

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
