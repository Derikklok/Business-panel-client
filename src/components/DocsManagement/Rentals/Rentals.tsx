import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CarOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import "./Rentals.css";

interface Rental {
  key: string;
  id: string;
  customerName: string;
  equipment: string;
  amount: number;
  status: "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
}

const Rentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([
    {
      key: "1",
      id: "REN001",
      customerName: "Tech Corp",
      equipment: "Laptop - Dell XPS",
      amount: 50,
      status: "active",
      startDate: "2026-01-15",
      endDate: "2026-02-15",
    },
    {
      key: "2",
      id: "REN002",
      customerName: "Design Co",
      equipment: "Projector - Sony 4K",
      amount: 75,
      status: "active",
      startDate: "2026-01-18",
      endDate: "2026-01-25",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);
  const [form] = Form.useForm();

  const handleAddRental = () => {
    setEditingRental(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRental = (rental: Rental) => {
    setEditingRental(rental);
    form.setFieldsValue({
      ...rental,
      startDate: dayjs(rental.startDate),
      endDate: dayjs(rental.endDate),
    });
    setIsModalVisible(true);
  };

  const handleDeleteRental = (key: string) => {
    setRentals(rentals.filter((rent) => rent.key !== key));
    message.success("Rental deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };

      if (editingRental) {
        setRentals(
          rentals.map((rent) =>
            rent.key === editingRental.key ? { ...rent, ...formattedValues } : rent
          )
        );
        message.success("Rental updated successfully");
      } else {
        const newRental: Rental = {
          key: Date.now().toString(),
          id: `REN${Math.floor(Math.random() * 10000)}`,
          ...formattedValues,
        };
        setRentals([...rentals, newRental]);
        message.success("Rental created successfully");
      }
      setIsModalVisible(false);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Rental ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: string) => (
        <span>
          <CarOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Equipment",
      dataIndex: "equipment",
      key: "equipment",
    },
    {
      title: "Rate/Day",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
      render: (_: unknown, record: Rental) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditRental(record)}
              className="action-btn edit-btn"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Rental"
            description="Are you sure you want to delete this rental?"
            onConfirm={() => handleDeleteRental(record.key)}
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
    <div className="rentals">
      <div className="rentals-header">
        <h3 className="section-subtitle">Rentals</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddRental}
          className="create-doc-btn"
        >
          Create Rental
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={rentals}
        pagination={{ pageSize: 8 }}
        className="rentals-table"
      />

      <Modal
        title={
          <div className="modal-header">
            <CarOutlined style={{ marginRight: 8, color: "#6366f1" }} />
            {editingRental ? "Edit Rental" : "Create New Rental"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
        okText={editingRental ? "Update" : "Create"}
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
          <Form.Item
            label="Equipment"
            name="equipment"
            rules={[{ required: true, message: "Please enter equipment" }]}
          >
            <Input placeholder="Enter equipment name" size="large" />
          </Form.Item>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              label="Rate / Day"
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
                  { label: "Active", value: "active" },
                  { label: "Completed", value: "completed" },
                  { label: "Cancelled", value: "cancelled" },
                ]}
              />
            </Form.Item>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Rentals;
