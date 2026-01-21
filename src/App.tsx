import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ConfigProvider, theme } from "antd";
import LayoutWrapper from "./components/Layout/LayoutWrapper";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import CustomerManagementPage from "./pages/CustomerManagementPage";
import DocumentManagementPage from "./pages/DocumentManagementPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const customTheme = useMemo(() => ({
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#6366f1",
      borderRadius: 8,
      fontFamily: "'Inter', sans-serif",
      colorBgBase: isDarkMode ? "#0f172a" : "#f8fafc",
      colorBgContainer: isDarkMode ? "#1e293b" : "#ffffff",
      colorTextBase: isDarkMode ? "#f8fafc" : "#0f172a",
    },
    components: {
      Layout: {
        siderBg: isDarkMode ? "#0f172a" : "#ffffff",
        headerBg: isDarkMode ? "#1e293b" : "#ffffff",
      },
      Menu: {
        itemBg: "transparent",
        itemSelectedBg: isDarkMode ? "#334155" : "#f1f5f9",
        itemSelectedColor: "#6366f1",
      },
      Card: {
        colorBgContainer: isDarkMode ? "#1e293b" : "#ffffff",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }
    }
  }), [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ConfigProvider theme={customTheme}>
      <Routes>
        <Route element={<LayoutWrapper isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
          <Route path="/" element={<DashboardOverviewPage />} />
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/customers" element={<CustomerManagementPage />} />
          <Route path="/documents" element={<DocumentManagementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
