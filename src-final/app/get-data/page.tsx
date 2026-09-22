"use client";

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

import {
  createBearerAuthenticationConfig,
  ThoughtSpotRestApi,
} from "@thoughtspot/rest-api-sdk";

import { constants } from "@/lib/constants";
import { getAuthToken } from "@/lib/trusted_auth";
import { SearchData } from "tse-data-classes";

const tmlquery = "[sales] [product type] [product]";
const worksheetId = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";

// API configuration using the same token call as the embed.
const tokenConfig = createBearerAuthenticationConfig(constants.tsURL, () => {
  return getAuthToken();
});

export default function GetData() {
  const [searchData, setSearchData] = useState<SearchData | null>();
  const [error, setError] = useState<string | null>(null);

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
        // The factory does not throw: a payload it could not read comes back
        // with isValid === false.
        const searchData = SearchData.createFromJSON(data);

        if (!searchData.isValid) {
          console.error("Could not read the search data:", searchData.errors);
          setError("Unable to read the search results.");
          return;
        }

        if (searchData.warnings.length) {
          // Non-fatal adjustments, e.g. a duplicate column renamed or a short row padded.
          console.warn("Adjustments made to the search data:", searchData.warnings);
        }

        console.log(searchData);
        setSearchData(searchData);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load the search results.");
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <div>
        <p className="px-0.5 my-5">
          Search Data ID: {worksheetId} -- Query: {tmlquery}
        </p>
      </div>
      {error && <p className="px-0.5 my-5">{error}</p>}
      {!searchData && !error && <p>Loading.....</p>}
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
