# Business Panel - Frontend Dashboard

A professional business management dashboard built with React, TypeScript, Vite, and Ant Design. Manage customers, invoices, estimates, purchase orders, and equipment rentals all in one place.

## 🎯 Features

### 1. **Customer Management**
   - View all customers in a data table
   - Add new customers with comprehensive details (Name, Email, Phone, Company)
   - Edit existing customer information
   - Delete customers with confirmation
   - Real-time customer status tracking (Active/Inactive)

### 2. **Document Management**
   Organized into four sub-modules:

   #### **Invoices**
   - Create and manage customer invoices
   - Track invoice status (Paid, Pending, Overdue)
   - Monitor payment dates and due dates
   - Filter and search invoices

   #### **Estimates**
   - Generate and send business estimates to customers
   - Track estimate status (Quoted, Accepted, Rejected)
   - Set validity periods for estimates
   - Convert estimates to invoices

   #### **Purchase Orders**
   - Create purchase orders for suppliers/vendors
   - Track order status (Pending, Ordered, Delivered, Cancelled)
   - Monitor expected delivery dates
   - Manage vendor relationships

   #### **Rentals**
   - Track equipment rentals to customers
   - Set rental rates per day
   - Monitor active and completed rentals
   - Track equipment availability

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomerManagement/
│   │   ├── CustomerManagement.tsx
│   │   └── CustomerManagement.css
│   └── DocsManagement/
│       ├── DocsManagement.tsx
│       ├── DocsManagement.css
│       ├── Invoices/
│       │   ├── Invoices.tsx
│       │   └── Invoices.css
│       ├── Estimates/
│       │   ├── Estimates.tsx
│       │   └── Estimates.css
│       ├── PurchaseOrders/
│       │   ├── PurchaseOrders.tsx
│       │   └── PurchaseOrders.css
│       └── Rentals/
│           ├── Rentals.tsx
│           └── Rentals.css
├── pages/
│   └── Dashboard.tsx
├── styles/
│   └── dashboard.css
├── App.tsx
├── main.tsx
├── index.css
└── ...
```

## 🎨 Design Features

### Dark Theme UI
- Professional dark mode with carefully chosen color palette
- Ant Design dark algorithm integrated throughout
- Smooth transitions and hover effects
- Responsive grid layout for stat cards

### Component Hierarchy
```
Dashboard (Main Layout)
├── Sidebar Navigation
│   ├── Dashboard Overview
│   ├── Customer Management
│   └── Document Management
├── Header with Collapse Toggle
└── Content Area
    ├── Dashboard Overview (Stats & Quick Start)
    ├── CustomerManagement (Full CRUD)
    └── DocsManagement
        ├── Invoices (Full CRUD)
        ├── Estimates (Full CRUD)
        ├── PurchaseOrders (Full CRUD)
        └── Rentals (Full CRUD)
```

## 🚀 Key Technologies

- **React 19.2.0** - UI Framework
- **TypeScript 5.9** - Type Safety
- **Vite 7.2** - Build Tool
- **Ant Design 6.2** - UI Component Library
- **Ant Design Icons 6.1** - Icon Set
- **React Router DOM 7.12** - Navigation

## 💻 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Server runs at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm lint
```

## 🎯 Component Features

### Customer Management
- **Table Display**: Paginated table with search and sort capabilities
- **CRUD Operations**: Create, Read, Update, Delete customers
- **Modal Forms**: Clean form interfaces for data entry
- **Status Tags**: Visual indicators for customer status
- **Action Buttons**: Quick edit and delete actions

### Invoices
- Dynamic invoice creation and management
- Status tracking with color-coded badges
- Amount formatting with currency symbol
- Date-based filtering
- Real-time CRUD operations

### Estimates
- Professional estimate generation
- Validity period tracking
- Multi-status support (Quoted, Accepted, Rejected)
- Customer-linked estimates
- Responsive table layout

### Purchase Orders
- Vendor management integration
- Expected delivery date tracking
- Order status monitoring
- Amount tracking for budget control
- Quick action buttons

### Rentals
- Equipment tracking system
- Daily rate management
- Active rental monitoring
- Start and end date management
- Equipment utilization tracking

## 🎨 Styling Approach

Each component has its own CSS file with:
- Component-specific styling
- Dark theme color variables
- Ant Design integration overrides
- Hover effects and transitions
- Responsive design patterns

## 📊 Dashboard Overview

The main dashboard displays:
- Quick stats for all major features
- Customer count
- Active invoices count
- Outstanding estimates count
- In-progress purchase orders count
- Quick start guide for new users

## 🔧 Customization

### Colors
The dashboard uses a dark theme with primary blue (#1890ff). Modify colors in:
- Individual component CSS files
- `dashboard.css` for global styles
- `index.css` for root styles

### Add New Features
1. Create a new component folder under `src/components/`
2. Add `.tsx` and `.css` files
3. Import in Dashboard.tsx
4. Add menu item in navigation
5. Update renderContent() function

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (Below 768px)

## 🎯 Best Practices Implemented

✅ Component-based architecture
✅ Separate styling per component
✅ Type-safe with TypeScript
✅ RESTful state management patterns
✅ Dark theme accessibility
✅ Consistent UI/UX patterns
✅ Icon integration for visual hierarchy
✅ Modal-based forms for clean data entry
✅ Confirmation dialogs for destructive actions
✅ Toast notifications for user feedback

## 📝 Sample Data

The application comes with sample data pre-populated:
- 2 sample customers
- 2 sample invoices
- 2 sample estimates
- 2 sample purchase orders
- 2 sample rentals

This allows you to test the interface immediately without data entry.

## 🔐 Future Enhancements

Potential additions:
- Backend API integration
- Authentication/Authorization
- Data persistence with database
- PDF export for invoices
- Email notifications
- Advanced reporting
- User roles and permissions
- File upload support
- Search and filtering across modules
- Bulk operations

---

Built with ❤️ as a professional business management solution.
