import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { space } from "../util/layout";
import { passThroughRule } from "../util/helpers";
import { Item } from "./grid";
import { fontSize } from "./typography";

type TableProps = {
  cols: any;
  data: any;
};

const TableStyle = styled.table`
  width: 100%;
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.baseType)}

  thead tr th {
    padding-bottom: ${space(2)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
    text-align: left;
    font-weight: 400;
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  }
`;

const CellInner = styled(Item)`
  min-height: ${space(8)};
`;

const Table = ({ cols, data }: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: cols,
    data,
  });

  return (
    <TableStyle {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  <CellInner justify="flex-start" align="center">
                    {cell.render("Cell")}
                  </CellInner>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableStyle>
  );
};

export default Table;
