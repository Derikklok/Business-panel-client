import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CarOutlined } from "@ant-design/icons";
import { useState } from "react";
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
    form.setFieldsValue(rental);
    setIsModalVisible(true);
  };

  const handleDeleteRental = (key: string) => {
    setRentals(rentals.filter((rent) => rent.key !== key));
    message.success("Rental deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingRental) {
        setRentals(
          rentals.map((rent) =>
            rent.key === editingRental.key ? { ...rent, ...values } : rent
          )
        );
        message.success("Rental updated successfully");
      } else {
        const newRental: Rental = {
          key: Date.now().toString(),
          id: `REN${Math.floor(Math.random() * 10000)}`,
          ...values,
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
      width: 100,
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
      render: (amount: number) => `$${amount}`,
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
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Rental) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRental(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Rental"
            description="Are you sure you want to delete this rental?"
            onConfirm={() => handleDeleteRental(record.key)}
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
    <div className="rentals">
      <div className="rentals-header">
        <h3>Rentals</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRental}>
          Create Rental
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={rentals}
        pagination={{ pageSize: 8 }}
        className="rentals-table"
        size="small"
      />

      <Modal
        title={editingRental ? "Edit Rental" : "Create New Rental"}
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
            label="Equipment"
            name="equipment"
            rules={[{ required: true, message: "Please enter equipment name" }]}
          >
            <Input placeholder="Enter equipment name" />
          </Form.Item>
          <Form.Item
            label="Rate/Day"
            name="amount"
            rules={[{ required: true, message: "Please enter daily rate" }]}
          >
            <InputNumber prefix="$" min={0} placeholder="0.00" />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
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
                { label: "Active", value: "active" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rentals;
