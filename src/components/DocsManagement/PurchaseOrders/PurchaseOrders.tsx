import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Popconfirm, message, DatePicker, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
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
    form.setFieldsValue({
      ...po,
      date: dayjs(po.date),
      expectedDelivery: dayjs(po.expectedDelivery),
    });
    setIsModalVisible(true);
  };

  const handleDeletePO = (key: string) => {
    setPurchaseOrders(purchaseOrders.filter((po) => po.key !== key));
    message.success("Purchase Order deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        expectedDelivery: values.expectedDelivery.format("YYYY-MM-DD"),
      };

      if (editingPO) {
        setPurchaseOrders(
          purchaseOrders.map((po) =>
            po.key === editingPO.key ? { ...po, ...formattedValues } : po
          )
        );
        message.success("Purchase Order updated successfully");
      } else {
        const newPO: PurchaseOrder = {
          key: Date.now().toString(),
          id: `PO${Math.floor(Math.random() * 10000)}`,
          ...formattedValues,
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
      width: 120,
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
      render: (_: unknown, record: PurchaseOrder) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditPO(record)}
              className="action-btn edit-btn"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Purchase Order"
            description="Are you sure you want to delete this purchase order?"
            onConfirm={() => handleDeletePO(record.key)}
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
    <div className="purchase-orders">
      <div className="purchase-orders-header">
        <h3 className="section-subtitle">Purchase Orders</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddPO}
          className="create-doc-btn"
        >
          Create PO
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={purchaseOrders}
        pagination={{ pageSize: 8 }}
        className="purchase-orders-table"
      />

      <Modal
        title={
          <div className="modal-header">
            <ShoppingOutlined style={{ marginRight: 8, color: "#6366f1" }} />
            {editingPO ? "Edit PO" : "Create New PO"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
        okText={editingPO ? "Update" : "Create"}
        cancelText="Cancel"
        className="docs-modal"
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item
            label="Vendor Name"
            name="vendorName"
            rules={[{ required: true, message: "Please enter vendor name" }]}
          >
            <Input placeholder="Enter vendor name" size="large" />
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
                  { label: "Pending", value: "pending" },
                  { label: "Ordered", value: "ordered" },
                  { label: "Delivered", value: "delivered" },
                  { label: "Cancelled", value: "cancelled" },
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
              label="Expected Delivery"
              name="expectedDelivery"
              rules={[{ required: true, message: "Please select delivery date" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PurchaseOrders;
