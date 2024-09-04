"use client";

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

import {
  createBearerAuthenticationConfig,
  ThoughtSpotRestApi,
} from "@thoughtspot/rest-api-sdk";

import { constants } from "@/lib/constants";
import { getAuthToken } from "@/lib/utils";
import { SearchData } from "@/lib/data-classes";

const tmlquery = "[sales] [product type] [product]";
const worksheetId = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";

// API configuration using the same token call as the embed.
const tokenConfig = createBearerAuthenticationConfig(constants.tsURL, () => {
  return getAuthToken(constants.username);
});

export default function GetData() {
  const [searchData, setSearchData] = useState<SearchData | null>();

  useEffect(() => {
    // Get the data using the search API.
    const api = new ThoughtSpotRestApi(tokenConfig);
    api
      .searchData({
        query_string: tmlquery,
        logical_table_identifier: worksheetId,
        record_size: 50, // just get 50 rows.
      })
      .then((data) => {
        const searchData = SearchData.createFromJSON(data);
        console.log(searchData);
        setSearchData(searchData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <div>
        <p className="px-0.5 my-5">
          Search Data ID: {worksheetId} -- Query: {tmlquery}
        </p>
      </div>
      {!searchData && <p>Loading.....</p>}
      {searchData && (
        <Table striped>
          <Table.Head>
            {searchData.columnNames.map((cn) => (
              <Table.HeadCell className="font-bold" key={cn}>
                {cn}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {searchData &&
              searchData.getDataAsTable().map((row, rindex) => (
                <Table.Row
                  key={rindex}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {row.map((cell, cindex) => (
                    <Table.Cell
                      key={"" + rindex + "_" + cindex}
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      {cell}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
