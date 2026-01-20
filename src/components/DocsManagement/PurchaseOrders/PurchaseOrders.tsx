import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./PurchaseOrders.css";

interface PurchaseOrder {
  key: string;
  id: string;
  vendorName: string;
  amount: number;
  status: "pending" | "ordered" | "delivered" | "cancelled";
  date: string;
  expectedDelivery: string;
}

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      key: "1",
      id: "PO001",
      vendorName: "Supplier Inc",
      amount: 8500,
      status: "ordered",
      date: "2026-01-15",
      expectedDelivery: "2026-01-25",
    },
    {
      key: "2",
      id: "PO002",
      vendorName: "Parts Co",
      amount: 5200,
      status: "pending",
      date: "2026-01-18",
      expectedDelivery: "2026-01-28",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null);
  const [form] = Form.useForm();

  const handleAddPO = () => {
    setEditingPO(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPO = (po: PurchaseOrder) => {
    setEditingPO(po);
    form.setFieldsValue(po);
    setIsModalVisible(true);
  };

  const handleDeletePO = (key: string) => {
    setPurchaseOrders(purchaseOrders.filter((po) => po.key !== key));
    message.success("Purchase Order deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingPO) {
        setPurchaseOrders(
          purchaseOrders.map((po) =>
            po.key === editingPO.key ? { ...po, ...values } : po
          )
        );
        message.success("Purchase Order updated successfully");
      } else {
        const newPO: PurchaseOrder = {
          key: Date.now().toString(),
          id: `PO${Math.floor(Math.random() * 10000)}`,
          ...values,
        };
        setPurchaseOrders([...purchaseOrders, newPO]);
        message.success("Purchase Order created successfully");
      }
      setIsModalVisible(false);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "green";
      case "ordered":
        return "blue";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "PO ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (text: string) => (
        <span>
          <ShoppingOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
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
      title: "Expected Delivery",
      dataIndex: "expectedDelivery",
      key: "expectedDelivery",
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
      render: (_: unknown, record: PurchaseOrder) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditPO(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Purchase Order"
            description="Are you sure you want to delete this purchase order?"
            onConfirm={() => handleDeletePO(record.key)}
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
    <div className="purchase-orders">
      <div className="purchase-orders-header">
        <h3>Purchase Orders</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPO}>
          Create Purchase Order
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={purchaseOrders}
        pagination={{ pageSize: 8 }}
        className="purchase-orders-table"
        size="small"
      />

      <Modal
        title={editingPO ? "Edit Purchase Order" : "Create New Purchase Order"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Vendor Name"
            name="vendorName"
            rules={[{ required: true, message: "Please enter vendor name" }]}
          >
            <Input placeholder="Enter vendor name" />
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
            label="Expected Delivery"
            name="expectedDelivery"
            rules={[{ required: true, message: "Please select delivery date" }]}
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
                { label: "Pending", value: "pending" },
                { label: "Ordered", value: "ordered" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PurchaseOrders;
