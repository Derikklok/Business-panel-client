# Routing Structure - Business Panel

## Overview
The application now uses React Router for proper navigation and routing. All navigation is handled through URL routes instead of component state.

## Route Configuration

### Main Routes
All routes are configured in `src/App.tsx` and wrapped with the `LayoutWrapper` component which provides the sidebar navigation.

```
/                    → Dashboard Overview Page (DashboardOverviewPage.tsx)
/dashboard           → Dashboard Overview Page (DashboardOverviewPage.tsx)
/customers           → Customer Management Page (CustomerManagementPage.tsx)
/documents           → Document Management Page (DocumentManagementPage.tsx)
*                    → Redirects to / (404 handling)
```

## File Structure

### Pages (src/pages/)
Each page component represents a route and is responsible for rendering the content for that route.

- `DashboardOverviewPage.tsx` - Dashboard overview with statistics and quick start guide
- `CustomerManagementPage.tsx` - Customer management interface
- `DocumentManagementPage.tsx` - Document management with tabs for different document types
- `Dashboard.tsx` - Legacy file (deprecated, kept for backward compatibility)

### Layout (src/components/Layout/)
- `LayoutWrapper.tsx` - Main layout component with sidebar navigation
  - Wraps all pages
  - Handles sidebar collapse/expand
  - Manages active menu item based on current route
  - Uses React Router's `Outlet` for rendering page content

### Navigation

#### Sidebar Navigation
The sidebar menu in `LayoutWrapper.tsx` contains three main items:
1. **Dashboard Overview** - navigates to `/`
2. **Customer Management** - navigates to `/customers`
3. **Document Management** - navigates to `/documents`

#### Programmatic Navigation
Use `useNavigate()` hook from React Router:
```tsx
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();
  
  const goToDashboard = () => navigate("/");
  const goToCustomers = () => navigate("/customers");
  const goToDocuments = () => navigate("/documents");
};
```

#### Link Navigation
Use `Link` or `useNavigate` from React Router:
```tsx
import { Link } from "react-router-dom";

<Link to="/customers">Go to Customers</Link>
```

## Document Management Sub-routes

The Document Management page uses Ant Design Tabs internally (not URL routes). The tabs within Document Management are:

1. **All Documents** - View all documents across all categories
2. **Invoices** - Manage invoices
3. **Estimates** - Manage estimates
4. **Purchase Orders** - Manage purchase orders
5. **Rentals** - Manage equipment rentals

These tabs are handled within the `DocsManagement.tsx` component using component state, not URL routing.

## Route Detection

The `LayoutWrapper` component automatically highlights the correct sidebar menu item based on the current URL:

```tsx
const getSelectedKey = () => {
  if (location.pathname === "/" || location.pathname === "/dashboard") {
    return "1"; // Dashboard Overview
  } else if (location.pathname.startsWith("/customers")) {
    return "2"; // Customer Management
  } else if (location.pathname.startsWith("/documents")) {
    return "3"; // Document Management
  }
  return "1"; // Default to Dashboard
};
```

## Styling

- Layout styles: `src/styles/layout.css`
- Dashboard styles: `src/styles/dashboard.css`
- Component-specific styles: Each component has its own `.css` file

## Future Route Expansion

To add new routes:

1. Create a new page component in `src/pages/` (e.g., `SettingsPage.tsx`)
2. Add a new Route in `src/App.tsx`
3. Add a menu item in `LayoutWrapper.tsx`
4. Update `getSelectedKey()` function to include the new route

Example:
```tsx
// In App.tsx
<Route path="/settings" element={<SettingsPage />} />

// In LayoutWrapper.tsx
{
  key: "4",
  icon: <SettingOutlined />,
  label: "Settings",
  onClick: () => navigate("/settings"),
}

// Update getSelectedKey()
else if (location.pathname.startsWith("/settings")) {
  return "4";
}
```

## Active Route Detection

The active menu item is automatically determined by comparing the current pathname with route patterns. The system updates in real-time as the user navigates.

---

## Summary

✅ Clean separation of concerns with page-based routing
✅ Sidebar navigation with automatic active state highlighting
✅ Proper use of React Router hooks and components
✅ Scalable architecture for adding new routes
✅ Responsive layout that works across all routes
