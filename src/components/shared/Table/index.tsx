import { Table as AntTable } from "antd";
import type { TableProps } from "antd";

interface ReusableTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>["columns"];
  rowKey?: string;
  currentPage?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

function Table<T extends object>({
  data,
  columns,
  rowKey = "id",
  currentPage = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  ...rest
}: ReusableTableProps<T>) {
  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
        onChange: onPageChange,
      }}
      scroll={{ x: 2000, y: 400 }}
      virtual
      className="no-vertical-border"
      {...rest}
    />
  );
}

export default Table;