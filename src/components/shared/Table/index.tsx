import { Table as AntTable } from "antd";
import type { TableProps } from "antd";

interface ReusableTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>["columns"];
  rowKey?: string;
  showInternalPagination?: boolean;
  pagination?: boolean;
  currentPage?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

function Table<T extends object>({
  data,
  columns,
  showInternalPagination = false,
  rowKey = "id",
  currentPage = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  pagination = true,
  ...rest
}: ReusableTableProps<T>) {
  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={pagination === false ? false : showInternalPagination ? {
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
        onChange: onPageChange,
      } : undefined}
      virtual={pagination === false}
      className="no-vertical-border"
      {...rest}
    />
  );
}

export default Table;