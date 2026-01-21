import { Layout, Menu, Button, Space, Typography, Tooltip } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "../../styles/layout.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface LayoutWrapperProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LayoutWrapper = ({ isDarkMode, toggleTheme }: LayoutWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
    },
    {
      key: "/documents",
      icon: <FileTextOutlined />,
      label: "Documents",
    },
  ];

  const currentKey = location.pathname === "/" ? "/dashboard" : location.pathname;

  return (
    <Layout className="dashboard-layout" style={{ minHeight: "100vh" }}>
      <Sider
        collapsible={false}
        className="dashboard-sider"
        width={250}
        theme={isDarkMode ? "dark" : "light"}
        style={{
          borderRight: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
        }}
      >
        <div className="logo">
          <DashboardOutlined className="logo-icon" style={{ color: "#6366f1" }} />
          <span className="logo-text" style={{ color: "#6366f1", fontWeight: 700 }}>Biz Panel</span>
        </div>
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
          className="dashboard-menu"
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
        <div className="sider-footer" style={{ position: "absolute", bottom: 0, width: "100%", padding: "16px" }}>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            block
            style={{ textAlign: "left", display: "flex", alignItems: "center" }}
          >
            Logout
          </Button>
        </div>
      </Sider>

      <Layout className="dashboard-content-layout">
        <Header className="dashboard-header" style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Title level={4} className="dashboard-header-title" style={{ margin: 0 }}>
            {menuItems.find(item => item.key === currentKey)?.label || "Page"}
          </Title>
          
          <Space size="middle">
            <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <Button
                shape="circle"
                icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
                onClick={toggleTheme}
                type="text"
                style={{ fontSize: 18, color: "#6366f1" }}
              />
            </Tooltip>
            <div className="user-profile" style={{ cursor: "pointer" }}>
              <UserOutlined style={{ fontSize: 20, color: "#6366f1" }} />
            </div>
          </Space>
        </Header>

        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
