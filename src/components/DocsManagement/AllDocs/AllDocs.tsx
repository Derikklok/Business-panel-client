import { Table, Tag, Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, FileTextOutlined, CalculatorOutlined, ShoppingOutlined, CarOutlined } from "@ant-design/icons";
import "./AllDocs.css";

interface AllDoc {
  key: string;
  docId: string;
  docType: "Invoice" | "Estimate" | "Purchase Order" | "Rental";
  relatedTo: string;
  amount: number;
  status: string;
  date: string;
  icon: React.ReactNode;
}

const AllDocs = () => {
  const allDocuments: AllDoc[] = [
    {
      key: "1",
      docId: "INV001",
      docType: "Invoice",
      relatedTo: "Tech Corp",
      amount: 5000,
      status: "paid",
      date: "2026-01-15",
      icon: <FileTextOutlined />,
    },
    {
      key: "2",
      docId: "INV002",
      docType: "Invoice",
      relatedTo: "Design Co",
      amount: 3500,
      status: "pending",
      date: "2026-01-18",
      icon: <FileTextOutlined />,
    },
    {
      key: "3",
      docId: "EST001",
      docType: "Estimate",
      relatedTo: "Tech Corp",
      amount: 7500,
      status: "quoted",
      date: "2026-01-15",
      icon: <CalculatorOutlined />,
    },
    {
      key: "4",
      docId: "EST002",
      docType: "Estimate",
      relatedTo: "Design Co",
      amount: 4200,
      status: "accepted",
      date: "2026-01-18",
      icon: <CalculatorOutlined />,
    },
    {
      key: "5",
      docId: "PO001",
      docType: "Purchase Order",
      relatedTo: "Supplier Inc",
      amount: 8500,
      status: "ordered",
      date: "2026-01-15",
      icon: <ShoppingOutlined />,
    },
    {
      key: "6",
      docId: "PO002",
      docType: "Purchase Order",
      relatedTo: "Parts Co",
      amount: 5200,
      status: "pending",
      date: "2026-01-18",
      icon: <ShoppingOutlined />,
    },
    {
      key: "7",
      docId: "REN001",
      docType: "Rental",
      relatedTo: "Tech Corp",
      amount: 50,
      status: "active",
      date: "2026-01-15",
      icon: <CarOutlined />,
    },
    {
      key: "8",
      docId: "REN002",
      docType: "Rental",
      relatedTo: "Design Co",
      amount: 75,
      status: "active",
      date: "2026-01-18",
      icon: <CarOutlined />,
    },
  ];

  const getStatusColor = (docType: string, status: string) => {
    switch (docType) {
      case "Invoice":
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
      case "Estimate":
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
      case "Purchase Order":
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
      case "Rental":
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
      default:
        return "default";
    }
  };

  const getDocTypeColor = (docType: string) => {
    switch (docType) {
      case "Invoice":
        return "cyan";
      case "Estimate":
        return "gold";
      case "Purchase Order":
        return "purple";
      case "Rental":
        return "magenta";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Document ID",
      dataIndex: "docId",
      key: "docId",
      width: 120,
      render: (text: string, record: AllDoc) => (
        <span>
          {record.icon} {text}
        </span>
      ),
    },
    {
      title: "Document Type",
      dataIndex: "docType",
      key: "docType",
      width: 140,
      render: (docType: string) => (
        <Tag color={getDocTypeColor(docType)}>{docType}</Tag>
      ),
    },
    {
      title: "Related To",
      dataIndex: "relatedTo",
      key: "relatedTo",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: AllDoc) => (
        <Tag color={getStatusColor(record.docType, status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_: unknown, record: AllDoc) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => message.info(`Edit ${record.docId}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Document"
            description="Are you sure you want to delete this document?"
            onConfirm={() => message.success(`${record.docId} deleted`)}
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
    <div className="all-docs">
      <Table
        columns={columns}
        dataSource={allDocuments}
        pagination={{ pageSize: 10 }}
        className="all-docs-table"
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default AllDocs;
