import { Table, Button, Modal, Form, Input, Space, Tag, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./CustomerManagement.css";

interface Customer {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive";
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      key: "1",
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      status: "active",
    },
    {
      key: "2",
      id: "C002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      company: "Design Co",
      status: "active",
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
          id: `C${Math.floor(Math.random() * 10000)}`,
          ...values,
          status: "active",
        };
        setCustomers([...customers, newCustomer]);
        message.success("Customer added successfully");
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="customer-name">
          <UserOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Customer) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditCustomer(record)}
          >
            Edit
          </Button>
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
      <div className="customer-header">
        <h2>Customer Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={customers}
        pagination={{ pageSize: 10 }}
        className="customer-table"
      />

      <Modal
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
