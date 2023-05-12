import React, { ReactNode } from "react";

export const Table = ({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) => {
  return (
    <table className="min-w-full table-fixed divide-y divide-gray-200">
      <thead className="bg-primary/10">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
              scope="col"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 text-sm font-medium text-gray-900">
                  {column}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
