import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Card, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined, UserOutlined, BuildOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./CustomerManagement.css";

interface Customer {
  key: string;
  registrationNo: string;
  name: string;
  company: string;
  email: string;
  address: string;
  description: string;
  status: "active" | "inactive" | "pending";
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      key: "1",
      registrationNo: "REG-2026-001",
      name: "John Doe",
      company: "Tech Corp",
      email: "john@example.com",
      address: "123 Business St, New York, NY 10001",
      description: "Enterprise customer with multiple projects",
      status: "active",
    },
    {
      key: "2",
      registrationNo: "REG-2026-002",
      name: "Jane Smith",
      company: "Design Co",
      email: "jane@example.com",
      address: "456 Creative Ave, Los Angeles, CA 90001",
      description: "Creative agency focusing on branding",
      status: "active",
    },
    {
      key: "3",
      registrationNo: "REG-2026-003",
      name: "Mike Johnson",
      company: "Startup Hub",
      email: "mike@example.com",
      address: "789 Innovation Blvd, San Francisco, CA 94102",
      description: "Early-stage startup in tech industry",
      status: "pending",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleDeleteCustomer = (key: string) => {
    setCustomers(customers.filter((cust) => cust.key !== key));
    message.success("Customer deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingCustomer) {
        setCustomers(
          customers.map((cust) =>
            cust.key === editingCustomer.key ? { ...cust, ...values } : cust
          )
        );
        message.success("Customer updated successfully");
      } else {
        const newCustomer: Customer = {
          key: Date.now().toString(),
          registrationNo: `REG-2026-${String(customers.length + 1).padStart(3, "0")}`,
          ...values,
          status: "pending",
        };
        setCustomers([...customers, newCustomer]);
        message.success("Customer added successfully");
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
      width: 160,
      render: (text: string) => (
        <div className="cell-with-copy">
          <span className="cell-text">{text}</span>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(text);
              message.success("Copied to clipboard");
            }}
            className="copy-btn"
          />
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 170,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 240,
      render: (text: string) => (
        <div className="cell-with-copy">
          <Tooltip title={text}>
            <span className="cell-text cell-truncate">{text}</span>
          </Tooltip>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(text);
              message.success("Copied to clipboard");
            }}
            className="copy-btn"
          />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right" as const,
      render: (_: unknown, record: Customer) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditCustomer(record)}
          />
          <Popconfirm
            title="Delete Customer"
            description="Are you sure you want to delete this customer?"
            onConfirm={() => handleDeleteCustomer(record.key)}
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
    <div className="customer-management">
      <Card className="customer-card">
        <div className="customer-header">
          <div className="header-content">
            <h2 className="header-title">Customer Management</h2>
            <p className="header-subtitle">Manage and track all your business customers</p>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />} 
            onClick={handleAddCustomer}
            className="add-customer-btn"
          >
            Add New Customer
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={customers}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
          className="customer-table"
          rowClassName="customer-row"
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={
          <div className="modal-header">
            <UserOutlined style={{ marginRight: 8 }} />
            {editingCustomer ? "Edit Customer" : "Add New Customer"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={520}
        okText={editingCustomer ? "Update" : "Create"}
        cancelText="Cancel"
        className="customer-modal"
        style={{ maxHeight: "90vh" }}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <div className="form-row">
            <Form.Item
              label="Company Name"
              name="company"
              rules={[{ required: true, message: "Please enter company name" }]}
              style={{ width: "100%" }}
            >
              <Input 
                placeholder="Enter company name" 
                prefix={<BuildOutlined />}
                size="large"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter valid email" },
              ]}
              style={{ width: "100%" }}
            >
              <Input 
                placeholder="Enter email address" 
                prefix={<MailOutlined />}
                size="large"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
              style={{ width: "100%" }}
            >
              <Input 
                placeholder="Enter full address" 
                prefix={<HomeOutlined />}
                size="large"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
              style={{ width: "100%" }}
            >
              <Input.TextArea 
                placeholder="Enter customer description (business type, requirements, etc.)" 
                rows={4}
                maxLength={500}
                showCount
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
