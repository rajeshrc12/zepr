export const GRAPH_DATA = {
  query_analyzer: { query: "" },
  normal_query: { content: "" },
  analysis_query: { sql: "" },
  generate_table: { table: [] },
  generate_chart: {
    chart: {
      type: "",
      x_axis: "",
      y_axis: "",
    },
  },
  generate_summary: { summary: "" },
};

export type GraphDataType = typeof GRAPH_DATA;
