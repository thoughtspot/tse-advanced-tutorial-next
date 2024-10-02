"use client";

import {useCallback, useState} from "react";

import {
    HostEvent,
    SearchEmbed,
    useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

import styles from "./SyncedSearch.module.css";

const SyncedSearch = () => {
    const [tml, setTML] = useState("");

    const chartRef = useEmbedRef<typeof SearchEmbed>();

    // 2.2 Function to handle chart updates and update the table.
    const onChartDataUpdate = useCallback(() => {
        chartRef.current?.trigger(HostEvent.GetTML, tml).then((response) => {
            console.log(response.answer.search_query);
            setTML(response.answer.search_query);
        });
    }, []);

    return (
        <>
            <ChartSearch chartRef={chartRef} onChartDataUpdate={onChartDataUpdate}/>
            {tml && <TableSearch searchTokenString={tml}/>}
        </>
    );
};

interface ChartSearchProps {
    chartRef: any;
    onChartDataUpdate?: () => void;
}

const ChartSearch = (props: ChartSearchProps) => {
    console.log("Rendering ChartSearch");

    return (
        /*  2.1 Embed a search embed component for the chart inside the following div.
            <SearchEmbed
                ref={props.chartRef}
                ...
                onData={props.onChartDataUpdate}
            ></SearchEmbed>
         */
        <div className={styles.chartEmbed}>
            <p>Not yet implemented</p>
        </div>
    );
};

interface TableSearchProps {
    searchTokenString: string;
}

const TableSearch = (props: TableSearchProps) => {

    return (
        /*  2.3 Embed a search embed component for the chart inside the following div.
            <SearchEmbed ...
            ></SearchEmbed>
         */
        <div className={styles.chartEmbed}>
            <p>Not yet implemented</p>
        </div>
    );
};

export default SyncedSearch;
