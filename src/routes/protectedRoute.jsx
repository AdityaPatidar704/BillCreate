// ProtectedRoutes.js
import { Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomerForm from "../pages/customerForm";
import ProductForm from "../pages/ProductForm";
import CustomerDisplay from "../pages/customerDisplay";
import CustomerProfile from "../pages/customerProfile";
import EditCustomer from "../pages/editCustomer";
import Invoices from "../pages/Invoices";
import InvoiceForm from "../pages/InvoiceForm";
import Payments from "../pages/Payments";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import { Challan } from "../pages/challan";
import { ChallanForm } from "../pages/challan_form";

const ProtectedRoute = ({ isAuthenticated,element }) => {
    return isAuthenticated?element:<Navigate to="/"></Navigate>;
};

export default ProtectedRoute; 