import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import "./Invoices.css";

interface Invoice {
  key: string;
  id: string;
  customerName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      key: "1",
      id: "INV001",
      customerName: "Tech Corp",
      amount: 5000,
      status: "paid",
      date: "2026-01-15",
      dueDate: "2026-02-15",
    },
    {
      key: "2",
      id: "INV002",
      customerName: "Design Co",
      amount: 3500,
      status: "pending",
      date: "2026-01-18",
      dueDate: "2026-02-18",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [form] = Form.useForm();

  const handleAddInvoice = () => {
    setEditingInvoice(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    form.setFieldsValue({
      ...invoice,
      date: dayjs(invoice.date),
      dueDate: dayjs(invoice.dueDate),
    });
    setIsModalVisible(true);
  };

  const handleDeleteInvoice = (key: string) => {
    setInvoices(invoices.filter((inv) => inv.key !== key));
    message.success("Invoice deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        dueDate: values.dueDate.format("YYYY-MM-DD"),
      };

      if (editingInvoice) {
        setInvoices(
          invoices.map((inv) =>
            inv.key === editingInvoice.key ? { ...inv, ...formattedValues } : inv
          )
        );
        message.success("Invoice updated successfully");
      } else {
        const newInvoice: Invoice = {
          key: Date.now().toString(),
          id: `INV${Math.floor(Math.random() * 10000)}`,
          ...formattedValues,
        };
        setInvoices([...invoices, newInvoice]);
        message.success("Invoice created successfully");
      }
      setIsModalVisible(false);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      case "overdue":
        return "red";
      default:
        return "blue";
    }
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (text: string) => (
        <span>
          <FileTextOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ minWidth: "80px", textAlign: "center" }}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "right" as const,
      render: (_: unknown, record: Invoice) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditInvoice(record)}
              className="action-btn edit-btn"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Invoice"
            description="Are you sure you want to delete this invoice?"
            onConfirm={() => handleDeleteInvoice(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button 
                type="text" 
                danger 
                size="small" 
                icon={<DeleteOutlined />} 
                className="action-btn delete-btn"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="invoices">
      <div className="invoices-header">
        <h3 className="section-subtitle">Invoices</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddInvoice}
          className="create-doc-btn"
        >
          Create Invoice
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={invoices}
        pagination={{ pageSize: 8 }}
        className="invoices-table"
      />

      <Modal
        title={
          <div className="modal-header">
            <FileTextOutlined style={{ marginRight: 8, color: "#6366f1" }} />
            {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
        okText={editingInvoice ? "Update" : "Create"}
        cancelText="Cancel"
        className="docs-modal"
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Enter customer name" size="large" />
          </Form.Item>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter amount" }]}
            >
              <InputNumber prefix="$" min={0} style={{ width: "100%" }} size="large" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select
                size="large"
                options={[
                  { label: "Paid", value: "paid" },
                  { label: "Pending", value: "pending" },
                  { label: "Overdue", value: "overdue" },
                ]}
              />
            </Form.Item>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Invoices;
