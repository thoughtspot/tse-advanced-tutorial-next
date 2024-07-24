/**
 * This file contains type definitions for the JSON data objects that are sent from ThoughtSpot.  Note that the types are simplified to only
 * include the attributes needed by the data-classes.ts file.  The types are not complete and may need to be updated in the future.
 * That said, all data is saved in each of the classes, so the object can be queried directly.
 */

// Sent by menu actions on answers, including individual visualizations in a liveboard.
export interface ActionDataType {
  embedAnswerData: {
    columns: {
      __typename: string;
      column: {
        __typename: string;
        dataType: string;
        id: string;
        name: string;
        referencedColumns: {
          __typename: string;
          displayName: string;
        }[];
        type: string;
      };
    }[];
    data: {
      columnDataLite: {
        columnDataType: string;
        columnId: string;
        dataValue: (string | number)[];
      }[];
      completionRatio: number;
      samplingRatio: number;
      totalRowCount: string;
    }[];
  };
}

// Sent by context actions on answers.
export interface ContextActionDataType {
  data: {
    contextMenuPoints: {
      selectedPoints: {
        selectedAttributes: {
          column: {
            dataType: string;
            name: string;
          };
          value: string;
        }[];
        selectedMeasures: {
          column: {
            dataType: string;
            name: string;
          };
          value: number;
        }[];
      }[];
    };
  };
}

// Sent by the liveboard data API.
export interface LiveboardDataType {
  metadata_id: string;
  metadata_name: string;
  contents: {
    available_data_row_count: number;
    column_names: string[];
    data_rows: (string | number)[][];
    record_offset: number;
    record_size: number;
    returned_data_row_count: number;
    sampling_ratio: number;
    visualization_id: string;
    visualization_name: string;
  }[];
}

// Sent by the search data API.
export interface SearchDataType {
  contents: {
    available_data_row_count: number;
    column_names: string[];
    data_rows: [string, number][];
    record_offset: number;
    record_size: number;
    returned_data_row_count: number;
    sampling_ratio: number;
  }[];
}

// Sent by the fetch answer data API.
export interface AnswerDataType {
  metadata_id: string;
  metadata_name: string;
  contents: {
    available_data_row_count: number;
    column_names: string[];
    data_rows: [string, number][];
    record_offset: number;
    record_size: number;
    returned_data_row_count: number;
    sampling_ratio: number;
  }[];
}
