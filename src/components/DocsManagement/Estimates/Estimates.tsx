import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
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
    form.setFieldsValue(estimate);
    setIsModalVisible(true);
  };

  const handleDeleteEstimate = (key: string) => {
    setEstimates(estimates.filter((est) => est.key !== key));
    message.success("Estimate deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingEstimate) {
        setEstimates(
          estimates.map((est) =>
            est.key === editingEstimate.key ? { ...est, ...values } : est
          )
        );
        message.success("Estimate updated successfully");
      } else {
        const newEstimate: Estimate = {
          key: Date.now().toString(),
          id: `EST${Math.floor(Math.random() * 10000)}`,
          ...values,
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
      title: "Valid Until",
      dataIndex: "validUntil",
      key: "validUntil",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Estimate) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditEstimate(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Estimate"
            description="Are you sure you want to delete this estimate?"
            onConfirm={() => handleDeleteEstimate(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="estimates">
      <div className="estimates-header">
        <h3>Estimates</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEstimate}>
          Create Estimate
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={estimates}
        pagination={{ pageSize: 8 }}
        className="estimates-table"
        size="small"
      />

      <Modal
        title={editingEstimate ? "Edit Estimate" : "Create New Estimate"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber prefix="$" min={0} placeholder="0.00" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Valid Until"
            name="validUntil"
            rules={[{ required: true, message: "Please select validity date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              options={[
                { label: "Quoted", value: "quoted" },
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Estimates;
