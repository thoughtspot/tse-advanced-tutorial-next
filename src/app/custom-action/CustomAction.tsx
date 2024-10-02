"use client";

import {useCallback, useState} from "react";

import styles from "./CustomAction.module.css";

import {
    LiveboardEmbed,
    RuntimeFilterOp,
    useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

import {ContextActionData} from "@/lib/data-classes";
import {ContextActionDataType} from "@/lib/data-classes-types";

const CustomAction = () => {
    const chartRef = useEmbedRef<typeof LiveboardEmbed>();

    // If true, then the popup with details is shown.
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Filter for the state clicked on.
    const [stateFilter, setStateFilter] = useState("");

    // TODO - handle the callback, get the filter, and then enable show-modal.
    const showDetailsCallback = useCallback((state: string) => {
        setStateFilter(state);

        setShowDetailsModal(true);
    }, []);

    const closeDetailsModalCallback = useCallback(() => {
        console.log("Show details modal callback");
        setShowDetailsModal(false);
    }, []);

    return (
        <>
            <StateSales onShowDetails={showDetailsCallback}></StateSales>
            {showDetailsModal && (
                <ShowDetailsPopup
                    filter={[stateFilter]}
                    hideDetailsModal={closeDetailsModalCallback}
                ></ShowDetailsPopup>
            )}
        </>
    );
};

// The state sales allows the user to select the state filter.
interface StateSalesProps {
    onShowDetails?: (state: string) => void;
}

const StateSales = (props: StateSalesProps) => {
    const chartRef = useEmbedRef<typeof LiveboardEmbed>();

    // Lesson 3.2 - Extract the filter for the state clicked using the dataclasses.
    const onShowDetails = (payload: {}) => {
        const contextActionData = ContextActionData.createFromJSON(
            payload as ContextActionDataType
        );
        const table = contextActionData.getDataAsTable(["State"]); // Gets a table of the data for just the state column
        const state = table[0][0]; // Get the actual state.  One column with one value.
        props.onShowDetails?.(state);
    };

    // Lesson 3.1 - Embed a liveboard visualization that shows the state chart and handles the custom action.
    // <LiveboardEmbed
    //     chartRef={chartRef}
    //     ...
    //     onCustomAction={onShowDetails}
    // ></LiveboardEmbed>

    return (
        <>
            <p>Not yet implemented</p>
        </>
    );
};

interface ShowDetailsProps {
    filter: string[];
    hideDetailsModal: () => void;
}

const ShowDetailsPopup = (props: ShowDetailsProps) => {

    // Lesson 3.3 - Embed a liveboard visualization that shows the details chart with the state filter.
    // </button>
    // <LiveboardEmbed
    //     ...
    // ></LiveboardEmbed>
    // NOTE: use values: props.filter for the state filter.
    return (
        <div className={styles.modalBox}>
            <div className={styles.modalContent}>
                <button
                    onClick={() => props.hideDetailsModal()}
                    className={styles.closeButton}
                >
                    X
                </button>
                <p>Not yet implemented.</p>
            </div>
        </div>
    );
};

export default CustomAction;
