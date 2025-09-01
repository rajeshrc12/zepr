import React from "react";

type TableFormatProps = {
  dataString: string;
};

type RowData = Record<string, string>;

const TableFormat: React.FC<TableFormatProps> = ({ dataString }) => {
  let data: RowData[] = [];

  try {
    const parsed = JSON.parse(dataString);
    if (Array.isArray(parsed)) {
      data = parsed as RowData[];
    }
  } catch {
    // fallback: invalid JSON
    data = [];
  }

  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  if (headers.length === 0) return null;

  return (
    <table className="w-full table-fixed border">
      <thead className="bg-gray-100 font-bold">
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              className={`border-y p-2 text-left ${
                i === 0
                  ? "rounded-tl"
                  : i === headers.length - 1
                  ? "rounded-tr"
                  : ""
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className="border-y p-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableFormat;
