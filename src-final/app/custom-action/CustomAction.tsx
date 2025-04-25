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
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const chartRef = useEmbedRef<typeof LiveboardEmbed>();

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

    // Extracts the state from the payload.
    const onShowDetails = (payload: {}) => {
        const contextActionData = ContextActionData.createFromJSON(
            payload as ContextActionDataType
        );
        const table = contextActionData.getDataAsTable(["State"]); // Gets a table of the data for just the state column
        const state = table[0][0]; // Get the actual state.  One column with one value.
        props.onShowDetails?.(state);
    };

    return (
        <LiveboardEmbed
            chartRef={chartRef}
            liveboardId="879252b1-510c-4fed-a4ae-ad8d14e40d90"
            vizId="c17072a9-8f4b-4016-9dcf-920c5ec65eda"
            // @ts-ignore -- visibleActions can also take strings in addition to the enum values.
            visibleActions={["show-details"]}
            onCustomAction={onShowDetails}
        ></LiveboardEmbed>
    );
};

interface ShowDetailsProps {
    filter: string[];
    hideDetailsModal: () => void;
}

const ShowDetailsPopup = (props: ShowDetailsProps) => {
    return (
        <div className={styles.modalBox}>
            <div className={styles.modalContent}>
                <button
                    onClick={() => props.hideDetailsModal()}
                    className={styles.closeButton}
                >
                    Close
                </button>
                <LiveboardEmbed
                    frameParams={{height: "90%"}}
                    liveboardId="879252b1-510c-4fed-a4ae-ad8d14e40d90"
                    vizId="4a002bae-8e3c-4bcd-8bbf-1e74cea4e41e"
                    runtimeFilters={[
                        {
                            columnName: "state",
                            operator: RuntimeFilterOp.EQ,
                            values: props.filter,
                        },
                    ]}
                ></LiveboardEmbed>
            </div>
        </div>
    );
};

export default CustomAction;
