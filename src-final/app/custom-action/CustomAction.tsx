"use client";

import { useCallback } from "react";

import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";
import {
  CustomActionTarget,
  CustomActionsPosition,
} from "@thoughtspot/visual-embed-sdk";

import { ActionData } from "@/lib/data-classes";
import { ActionDataType } from "@/lib/data-classes-types";

const CustomAction = () => {
  // 3.2 - Handle custom action callback
  const handleCustomAction = useCallback((payload: any) => {
    console.log("Custom action triggered:", payload);

    // Check if this is the order-inventory action we want to handle
    const actionId = payload.id || payload.data?.id;
    if (actionId !== "order-inventory") {
      console.log("Not an order-inventory action, ignoring");
      return;
    }

    try {
      // Use ActionData class to convert from JSON
      const actionData = ActionData.createFromJSON(payload as ActionDataType);

      // Get column names and check if SKU column exists (case insensitive)
      const columnNames = actionData.columnNames;
      const skuColumnExists = columnNames.some(
        (name: string) => name.toLowerCase() === "sku"
      );

      if (!skuColumnExists) {
        // Show error message to user
        alert(
          "Error: SKU column not found in the selected data. Please ensure your data includes a SKU column."
        );
        return;
      }

      // Extract SKU data using getDataAsTable method
      const skuTable = actionData.getDataAsTable(["sku"]);

      // Create URL with SKU parameters
      const baseUrl = "https://tse-order-inventory.vercel.app/order";
      const skuParams = skuTable
        .map((row) => `sku=${encodeURIComponent(row[0])}`)
        .join("&");
      const fullUrl = `${baseUrl}?${skuParams}`;

      console.log("Opening URL:", fullUrl);

      // Open URL in new tab
      window.open(fullUrl, "_blank");
    } catch (error) {
      console.error("Error processing custom action:", error);
      alert("Error processing the custom action. Please try again.");
    }
  }, []);

  return (
    // 3.1 Embed a search embed to use the custom action.
    /*
    <SearchEmbed
      ...
      onCustomAction={handleCustomAction}
    />
   */

    /*
    <>
      <p>Not yet implemented.</p>
    </>
    */

    <>
      <SearchEmbed
        dataSource="4d98d3f5-5c6a-44eb-82fb-d529ca20e31f"
        searchOptions={{
          searchTokenString:
            "[Quantity Purchased] [Product] [SKU] sum [Quantity Purchased] > 150000",
          executeSearch: true,
        }}
        forceTable={true}
        customActions={[
          {
            id: "order-inventory",
            name: "Order Inventory",
            position: CustomActionsPosition.MENU,
            target: CustomActionTarget.ANSWER,
            dataModelIds: {
              modelColumnNames: ["4d98d3f5-5c6a-44eb-82fb-d529ca20e31f::SKU"],
            },
          },
        ]}
        onCustomAction={handleCustomAction}
      />
    </>
  );
};

export default CustomAction;
