import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Space } from "antd";
import Table from "../components/shared/Table";
import type { ColumnsType } from "antd/es/table";
import type { ExpenseType } from "../types/expense";
import { useEffect, useState } from "react";
import { expenseApi } from "../api/expenses";
import ExpenseModal from "../components/features/home/ExpenseModal";
import dayjs from 'dayjs';


export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(null)
  const [showModal, setShowModal] = useState(false)

  const columns: ColumnsType<ExpenseType> = [
    {
      title: "Ngày/Chí (dd/mm/yyyy)",
      dataIndex: "date",
      key: "date",
      width: 140,
      fixed: "left",
    },
    {
      title: "Loại Chi Phí",
      dataIndex: "expenseType",
      key: "expenseType",
      fixed: "left",
      width: 140,
      render: (text: string) => {
        if (text.startsWith("- ")) {
          return <div style={{ paddingLeft: 16 }}>{text}</div>;
        }
        return text;
      },
    },
    {
      title: "Số Tiền (vnđ)",
      dataIndex: "cost",
      key: "cost",
      width: 180,
      render: (value: number) => (
        <div>
          {new Intl.NumberFormat('vi-VN').format(value)}
        </div>
      ),
    },
    //   {
    //   title: "Số Lượng (cái)",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   width: 130,
    //   align: "center",
    //   render: (value?: number) => value ?? "-",
    // },
    // {
    //   title: "Ghi Chú",
    //   dataIndex: "note",
    //   key: "note",
    //   render: (text: string) => {
    //     return text.split('\n').map((line, i) => (
    //       <div key={i}>
    //         {line.startsWith("- ") ? (
    //           <div style={{ paddingLeft: 16 }}>{line}</div>
    //         ) : (
    //           line
    //         )}
    //       </div>
    //     ));
    //   },
    // },
    {
      title: "Số Lượng (cái)",
      dataIndex: "quantity",
      key: "quantity",
      width: 130,
      align: "center",
      render: (value?: number) => value ?? "-",
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      key: "note",
      render: (text: string) => {
        return text.split('\n').map((line, i) => (
          <div key={i}>
            {line.startsWith("- ") ? (
              <div style={{ paddingLeft: 16 }}>{line}</div>
            ) : (
              line
            )}
          </div>
        ));
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button
            type="link"
            size="small"
            htmlType="button"
            danger
            onClick={() => record?.id && handleDelete(record?.id)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const fetchExpenses = async () => {
    try {
      const data = await expenseApi.fetchExpenses();
      setExpenses(data);
      setExpenses(
        data.sort((a, b) =>
          dayjs(b.date, "DD/MM/YYYY").diff(dayjs(a.date, "DD/MM/YYYY"))
        )
      );
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa mục chi phí này?",
      okButtonProps: {
        htmlType: "button",
      },
      onOk: async () => {
        try {
          await expenseApi.deleteExpense(id);
          setExpenses(expenses.filter((expense) => expense.id !== id));
          notification.success({
            message: "Thành công",
            description: "Chi phí đã được xóa.",
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          notification.error({
            message: "Lỗi",
            description: "Đã có lỗi xảy ra khi xóa chi phí.",
          });
        }
      },
    });
  };
  const handleEdit = (expense: ExpenseType) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };


  const handleSubmit = async (values: ExpenseType) => {
    try {
      let result: ExpenseType;

      if (selectedExpense && selectedExpense.id) {
        const updatedData = {
          ...selectedExpense,
          ...values,
        };

        result = await expenseApi.updateExpense(selectedExpense.id, updatedData);
        notification.success({
          message: "Cập nhật thành công",
          description: "Chi phí đã được cập nhật.",
        });
      } else {
        result = await expenseApi.addExpense(values);
        notification.success({
          message: "Thêm mới thành công",
          description: "Chi phí mới đã được thêm.",
        });
      }

      setExpenses((prevExpenses) => {
        if (selectedExpense && selectedExpense.id) {
          return prevExpenses.map((expense) =>
            expense.id === result.id ? result : expense
          );
        }
        return [result, ...prevExpenses];
      });
      handleClose();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã có lỗi xảy ra khi lưu chi phí.",
      });
      console.error("Error submitting expense:", error);
    }
  };


  const handleClose = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="p-6 shadow-lg rounded-2xl bg-white max-w-7xl mx-auto min-h-[calc(100vh-300px)] w-full ">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-2xl font-bold uppercase tracking-tight">Chi phí</h1>
          <Button variant="solid" color="cyan" iconPosition="start" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
            Thêm chi phi
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            data={expenses}
            className="h-full"
            // scroll={{ x: 2000, y: 400 }}
          />
        </div>
      </div>
      <ExpenseModal
        onClose={handleClose}
        open={showModal}
        defaultValues={selectedExpense}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
