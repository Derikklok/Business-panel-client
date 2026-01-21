import { UserOutlined, FileTextOutlined, CalculatorOutlined, ShoppingOutlined } from "@ant-design/icons";
import "../styles/dashboard.css";

const DashboardOverviewPage = () => {
  return (
    <div className="dashboard-overview">
      <div className="overview-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your Business Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon customers-icon">
            <UserOutlined />
          </div>
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-value">2</p>
            <span className="stat-label">Active Customers</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon invoices-icon">
            <FileTextOutlined />
          </div>
          <div className="stat-content">
            <h3>Invoices</h3>
            <p className="stat-value">2</p>
            <span className="stat-label">This Month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon estimates-icon">
            <CalculatorOutlined />
          </div>
          <div className="stat-content">
            <h3>Estimates</h3>
            <p className="stat-value">2</p>
            <span className="stat-label">Outstanding</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <ShoppingOutlined />
          </div>
          <div className="stat-content">
            <h3>Purchase Orders</h3>
            <p className="stat-value">2</p>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>

      <div className="overview-info">
        <h3>Quick Start</h3>
        <ul>
          <li>Navigate to Customer Management to manage your customers</li>
          <li>
            Use Document Management to create and track invoices, estimates,
            purchase orders, and rentals
          </li>
          <li>Monitor your business operations from this dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
