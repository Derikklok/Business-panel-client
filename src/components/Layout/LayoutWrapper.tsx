import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "../../styles/layout.css";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine selected menu key based on current route
  const getSelectedKey = () => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return "1";
    } else if (location.pathname.startsWith("/customers")) {
      return "2";
    } else if (location.pathname.startsWith("/documents")) {
      return "3";
    }
    return "1";
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard Overview",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Customer Management",
      onClick: () => navigate("/customers"),
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: "Document Management",
      onClick: () => navigate("/documents"),
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Sider
        collapsible={false}
        className="dashboard-sider"
        width={250}
      >
        <div className="logo">
          <DashboardOutlined className="logo-icon" />
          <span className="logo-text">Business Panel</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          className="dashboard-menu"
        />
      </Sider>

      <Layout className="dashboard-content-layout">
        <Header className="dashboard-header">
          <h1 className="dashboard-header-title">Business Management System</h1>
        </Header>

        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
