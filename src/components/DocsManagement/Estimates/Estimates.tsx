import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CalculatorOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import "./Estimates.css";

interface Estimate {
  key: string;
  id: string;
  customerName: string;
  amount: number;
  status: "quoted" | "accepted" | "rejected";
  date: string;
  validUntil: string;
}

const Estimates = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      key: "1",
      id: "EST001",
      customerName: "Tech Corp",
      amount: 7500,
      status: "quoted",
      date: "2026-01-15",
      validUntil: "2026-02-15",
    },
    {
      key: "2",
      id: "EST002",
      customerName: "Design Co",
      amount: 4200,
      status: "accepted",
      date: "2026-01-18",
      validUntil: "2026-02-18",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<Estimate | null>(null);
  const [form] = Form.useForm();

  const handleAddEstimate = () => {
    setEditingEstimate(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditEstimate = (estimate: Estimate) => {
    setEditingEstimate(estimate);
    form.setFieldsValue({
      ...estimate,
      date: dayjs(estimate.date),
      validUntil: dayjs(estimate.validUntil),
    });
    setIsModalVisible(true);
  };

  const handleDeleteEstimate = (key: string) => {
    setEstimates(estimates.filter((est) => est.key !== key));
    message.success("Estimate deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        validUntil: values.validUntil.format("YYYY-MM-DD"),
      };

      if (editingEstimate) {
        setEstimates(
          estimates.map((est) =>
            est.key === editingEstimate.key ? { ...est, ...formattedValues } : est
          )
        );
        message.success("Estimate updated successfully");
      } else {
        const newEstimate: Estimate = {
          key: Date.now().toString(),
          id: `EST${Math.floor(Math.random() * 10000)}`,
          ...formattedValues,
        };
        setEstimates([...estimates, newEstimate]);
        message.success("Estimate created successfully");
      }
      setIsModalVisible(false);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "green";
      case "quoted":
        return "blue";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Estimate ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: string) => (
        <span>
          <CalculatorOutlined /> {text}
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
      title: "Valid Until",
      dataIndex: "validUntil",
      key: "validUntil",
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
      render: (_: unknown, record: Estimate) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditEstimate(record)}
              className="action-btn edit-btn"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Estimate"
            description="Are you sure you want to delete this estimate?"
            onConfirm={() => handleDeleteEstimate(record.key)}
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
    <div className="estimates">
      <div className="estimates-header">
        <h3 className="section-subtitle">Estimates</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddEstimate}
          className="create-doc-btn"
        >
          Create Estimate
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={estimates}
        pagination={{ pageSize: 8 }}
        className="estimates-table"
      />

      <Modal
        title={
          <div className="modal-header">
            <CalculatorOutlined style={{ marginRight: 8, color: "#6366f1" }} />
            {editingEstimate ? "Edit Estimate" : "Create New Estimate"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
        okText={editingEstimate ? "Update" : "Create"}
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
                  { label: "Quoted", value: "quoted" },
                  { label: "Accepted", value: "accepted" },
                  { label: "Rejected", value: "rejected" },
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
              label="Valid Until"
              name="validUntil"
              rules={[{ required: true, message: "Please select validity date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Estimates;
