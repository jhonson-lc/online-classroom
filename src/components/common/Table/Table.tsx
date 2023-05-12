import React, { ReactNode } from "react";
import classNames from "classnames";

export const Table = ({ headers, rows }: { headers?: string[]; rows: ReactNode[][] }) => {
  return (
    <table className="min-w-full table-fixed divide-y divide-gray-200">
      {headers && (
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
      )}

      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={classNames(
                    "text-sm font-medium text-gray-900",
                    headers ? "px-6 py-4" : "",
                  )}
                >
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
