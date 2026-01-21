import { Table, Tag, Space, Button, Popconfirm, message, Tooltip } from "antd";
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
    },
    {
      key: "2",
      docId: "INV002",
      docType: "Invoice",
      relatedTo: "Design Co",
      amount: 3500,
      status: "pending",
      date: "2026-01-18",
    },
    {
      key: "3",
      docId: "EST001",
      docType: "Estimate",
      relatedTo: "Tech Corp",
      amount: 7500,
      status: "quoted",
      date: "2026-01-15",
    },
    {
      key: "4",
      docId: "EST002",
      docType: "Estimate",
      relatedTo: "Design Co",
      amount: 4200,
      status: "accepted",
      date: "2026-01-18",
    },
    {
      key: "5",
      docId: "PO001",
      docType: "Purchase Order",
      relatedTo: "Supplier Inc",
      amount: 8500,
      status: "ordered",
      date: "2026-01-15",
    },
    {
      key: "6",
      docId: "PO002",
      docType: "Purchase Order",
      relatedTo: "Parts Co",
      amount: 5200,
      status: "pending",
      date: "2026-01-18",
    },
    {
      key: "7",
      docId: "REN001",
      docType: "Rental",
      relatedTo: "Tech Corp",
      amount: 50,
      status: "active",
      date: "2026-01-15",
    },
    {
      key: "8",
      docId: "REN002",
      docType: "Rental",
      relatedTo: "Design Co",
      amount: 75,
      status: "active",
      date: "2026-01-18",
    },
  ];

  const getDocIcon = (docType: string) => {
    switch (docType) {
      case "Invoice": return <FileTextOutlined style={{ marginRight: 8, color: "#1890ff" }} />;
      case "Estimate": return <CalculatorOutlined style={{ marginRight: 8, color: "#faad14" }} />;
      case "Purchase Order": return <ShoppingOutlined style={{ marginRight: 8, color: "#722ed1" }} />;
      case "Rental": return <CarOutlined style={{ marginRight: 8, color: "#eb2f96" }} />;
      default: return null;
    }
  };

  const getStatusColor = (docType: string, status: string) => {
    switch (docType) {
      case "Invoice":
        switch (status) {
          case "paid": return "green";
          case "pending": return "orange";
          case "overdue": return "red";
          default: return "blue";
        }
      case "Estimate":
        switch (status) {
          case "accepted": return "green";
          case "quoted": return "blue";
          case "rejected": return "red";
          default: return "default";
        }
      case "Purchase Order":
        switch (status) {
          case "delivered": return "green";
          case "ordered": return "blue";
          case "pending": return "orange";
          case "cancelled": return "red";
          default: return "default";
        }
      case "Rental":
        switch (status) {
          case "active": return "green";
          case "completed": return "blue";
          case "cancelled": return "red";
          default: return "default";
        }
      default: return "default";
    }
  };

  const columns = [
    {
      title: "Document ID",
      dataIndex: "docId",
      key: "docId",
      width: 140,
      render: (text: string, record: AllDoc) => (
        <span>
          {getDocIcon(record.docType)}
          {text}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "docType",
      key: "docType",
      width: 130,
      render: (docType: string) => (
        <Tag className="doc-type-tag" color="purple">{docType}</Tag>
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
      width: 110,
      render: (_: unknown, record: AllDoc) => (
        <Space size="small">
          <Tooltip title="Edit Document">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => message.info(`Edit ${record.docId}`)}
              className="action-btn edit-btn"
            />
          </Tooltip>
          <Tooltip title="Delete Document">
            <Popconfirm
              title="Delete Document"
              description="Are you sure you want to delete this document?"
              onConfirm={() => message.success(`${record.docId} deleted`)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                className="action-btn delete-btn"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="all-docs-container">
      <Table
        columns={columns}
        dataSource={allDocuments}
        pagination={{ pageSize: 12, size: "small" }}
        className="all-docs-table"
      />
    </div>
  );
};

export default AllDocs;
