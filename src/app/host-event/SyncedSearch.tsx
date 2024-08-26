"use client";

import { useCallback, useState } from "react";

import {
  HostEvent,
  SearchEmbed,
  useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

import { StyleContext } from "@/contexts/StyleContext";

import styles from "./SyncedSearch.module.css";

const SyncedSearch = () => {
  const [tml, setTML] = useState("");

  const chartRef = useEmbedRef<typeof SearchEmbed>();

  const onChartDataUpdate = useCallback(() => {
    chartRef.current?.trigger(HostEvent.GetTML, tml).then((response) => {
      console.log(response.answer.search_query);
      setTML(response.answer.search_query);
    });
  }, []);

  return (
    <>
      <ChartSearch chartRef={chartRef} onChartDataUpdate={onChartDataUpdate} />
      {tml && <TableSearch searchTokenString={tml} />}
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
    <StyleContext.Consumer>
      {(style) => (
        <div className={styles.chartEmbed}>
          <SearchEmbed
            ref={props.chartRef}
            dataSource={"4d98d3f5-5c6a-44eb-82fb-d529ca20e31f"}
            collapseSearchBarInitially={true}
            collapseDataSources={true}
            searchOptions={{
              searchTokenString:
                "[sales] [product type] top 30 [sales date].monthly",
              executeSearch: true,
            }}
            onData={props.onChartDataUpdate}
          ></SearchEmbed>
        </div>
      )}
    </StyleContext.Consumer>
  );
};

interface TableSearchProps {
  searchTokenString: string;
}

const TableSearch = (props: TableSearchProps) => {
  console.log("Rendering TableSearch");

  return (
    <StyleContext.Consumer>
      {(style) => (
        <div className={styles.chartEmbed}>
          <SearchEmbed
            dataSource={"4d98d3f5-5c6a-44eb-82fb-d529ca20e31f"}
            collapseDataSources={true}
            searchOptions={{
              searchTokenString: props.searchTokenString,
              executeSearch: true,
            }}
            forceTable={true}
            visibleActions={[]}
            hideDataSources={true}
            hideSearchBar={true}
          ></SearchEmbed>
        </div>
      )}
    </StyleContext.Consumer>
  );
};

export default SyncedSearch;
