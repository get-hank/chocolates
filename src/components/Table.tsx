import React, { MouseEvent } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { space } from "../util/layout";
import { passThroughRule } from "../util/helpers";
import { Item } from "./grid";
import { fontSize } from "./typography";

type TableProps = {
  cols: any;
  data: any;
  onRowClick?: (e: MouseEvent, row: any) => any;
};

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.baseType)}

  thead tr th {
    padding-bottom: ${space(1)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
    text-align: left;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray};
    text-transform: uppercase;
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  }
`;

const CellInner = styled(Item)`
  min-height: ${space(8)};
`;

const Table = ({ cols, data, onRowClick }: TableProps) => {
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
            <tr
              {...row.getRowProps()}
              onClick={
                onRowClick
                  ? (e: MouseEvent) => onRowClick(e, row.original)
                  : null
              }
            >
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
