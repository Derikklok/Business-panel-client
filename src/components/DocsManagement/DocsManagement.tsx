import { Tabs, Card } from "antd";
import { FileTextOutlined, ShoppingOutlined, CarOutlined, CalculatorOutlined, AppstoreOutlined } from "@ant-design/icons";
import Invoices from "./Invoices/Invoices";
import Estimates from "./Estimates/Estimates";
import PurchaseOrders from "./PurchaseOrders/PurchaseOrders";
import Rentals from "./Rentals/Rentals";
import AllDocs from "./AllDocs/AllDocs";
import "./DocsManagement.css";

const DocsManagement = () => {
  const items = [
    {
      key: "0",
      label: (
        <span>
          <AppstoreOutlined /> All Documents
        </span>
      ),
      children: <AllDocs />,
    },
    {
      key: "1",
      label: (
        <span>
          <FileTextOutlined /> Invoices
        </span>
      ),
      children: <Invoices />,
    },
    {
      key: "2",
      label: (
        <span>
          <CalculatorOutlined /> Estimates
        </span>
      ),
      children: <Estimates />,
    },
    {
      key: "3",
      label: (
        <span>
          <ShoppingOutlined /> Purchase Orders
        </span>
      ),
      children: <PurchaseOrders />,
    },
    {
      key: "4",
      label: (
        <span>
          <CarOutlined /> Rentals
        </span>
      ),
      children: <Rentals />,
    },
  ];

  return (
    <Card className="docs-management-card">
      <h2 className="docs-management-title">Document Management</h2>
      <Tabs items={items} defaultActiveKey="0" className="docs-tabs" />
    </Card>
  );
};

export default DocsManagement;
