import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <ConfigProvider
    theme={{
      // 2. Enable Dark Mode Algorithm
      algorithm: theme.darkAlgorithm,

      token: {
        // Seed Token
        // colorPrimary: "#000CEB",
        borderRadius: 10,

        // Alias Token
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
    <App />
  </ConfigProvider>
  </BrowserRouter>,
);
