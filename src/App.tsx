import { Routes, Route, Navigate } from "react-router-dom";
import LayoutWrapper from "./components/Layout/LayoutWrapper";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import CustomerManagementPage from "./pages/CustomerManagementPage";
import DocumentManagementPage from "./pages/DocumentManagementPage";

function App() {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<DashboardOverviewPage />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/customers" element={<CustomerManagementPage />} />
        <Route path="/documents" element={<DocumentManagementPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
