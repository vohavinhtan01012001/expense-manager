import { Table as AntTable } from "antd";
import type { TableProps } from "antd";

interface ReusableTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>["columns"];
  rowKey?: string;
}

function Table<T extends object>({
  data,
  columns,
  rowKey = "id", 
  ...rest
}: ReusableTableProps<T>) {
  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={{ pageSize: 10 }}
      className="no-vertical-border"
      {...rest}
    />
  );
}

export default Table;