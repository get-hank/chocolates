import React, { MouseEvent, useMemo } from "react";
import styled from "styled-components";
import { useTable, useFlexLayout } from "react-table";
import { space } from "../util/layout";
import { passThroughRule } from "../util/helpers";
import { Item } from "./grid";
import { fontSize } from "./typography";

type TableProps = {
  cols: any;
  data: any;
  onRowClick?: (e: MouseEvent, row: any) => any;
  defaultColumn?: object;
};

type TableStyleProps = {
  rowsClickable: boolean;
};
const TableStyle = styled.div<TableStyleProps>`
  width: 100%;
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.baseType)}

  .thead .tr .th {
    padding-bottom: ${space(1)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
    text-align: left;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray};
    text-transform: uppercase;
  }

  .tbody .tr {
    overflow: hidden;
    ${({ rowsClickable }) => (rowsClickable ? "cursor: pointer;" : "")}

    .td {
      align-items: center;
      justify-content: flex-start;
      display: flex;
      padding: ${space(1)} ${space(1)} ${space(1)} 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
      min-height: ${space(8)};
    }
  }
`;

type CellContentsProps = {
  wrapText: boolean;
};

const CellContents = styled.span<CellContentsProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ wrapText }) => (wrapText ? "" : "white-space: nowrap;")}
`;

const Table = ({ cols, data, onRowClick, defaultColumn = {} }: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: cols,
      data,
      defaultColumn: useMemo(
        () => ({
          width: 50,
          minWidth: 10,
          maxWidth: 300,
          wrap: true,
          ...defaultColumn,
        }),
        []
      ),
    },
    useFlexLayout
  );

  return (
    <TableStyle rowsClickable={!!onRowClick}>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div className="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <div className="th" {...column.getHeaderProps()}>
                  <CellContents wrapText={column.wrap}>
                    {column.render("Header")}
                  </CellContents>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody" {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div
                className="tr"
                {...row.getRowProps()}
                onClick={
                  onRowClick
                    ? (e: MouseEvent) => onRowClick(e, row.original)
                    : null
                }
              >
                {row.cells.map((cell: any) => (
                  <div className="td" {...cell.getCellProps()}>
                    <CellContents wrapText={cell.column.wrap}>
                      {cell.render("Cell")}
                    </CellContents>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </TableStyle>
  );
};

export default Table;
