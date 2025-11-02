import React from "react";

type TableProps = {
  data: Record<string, string>[];
};

const DynamicTable: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="text-center py-4">No data available.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-gray-50 sticky top-0">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-4 py-2 text-left text-sm font-bold uppercase tracking-wider w-48"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr
            key={index}
            className={
              index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
            }
          >
            {headers.map((header) => (
              <td
                key={header}
                className="px-4 py-2 text-sm text-gray-700 truncate whitespace-nowrap"
                title={row[header]} // show full text on hover
              >
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
