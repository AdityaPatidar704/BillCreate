// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginRegister from "../pages/loginRegister";
import CustomerForm from "../pages/customerForm";
import CustomerProfile from "../pages/customerProfile";
import CustomerDisplay from "../pages/customerDisplay";
import EditCustomer from "../pages/editCustomer";
import Dashboard from "../pages/Dashboard";
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProductForm from "../pages/ProductForm";
import Sidebar from "../layouts/Sidebar";
import InvoiceForm from "../pages/InvoiceForm";  // InvoiceForm import karo
import "../styles/index.css"
import { Challan } from "../pages/challan";
import { ChallanForm } from "../pages/challan_form";
import PublicRoutes from "./publicRoute";
import ProtectedRoute from "./protectedRoute";
import "../styles/index.css";
import { GenerateInvoice } from "../pages/generateInvoice";
import { GenerateBillComponent } from "../pages/generateBill";
import CustomerFormDetailDisplay from "../pages/cutsomer_form_detail";
import Customer_detail_edit from "../pages/Customer_edit";
import { Product_detail } from "../pages/product_detail";
import { Product_edit } from "../pages/product_edit";
import { QuotationFrom } from "../pages/QuotationForm";
import { QuotationComponent } from "../pages/quotation";
import { GenerateQuotation } from "./generateQuotation";
import { ChallanPreview } from "../pages/challan_preview";
import { ChallanEdit } from "../pages/challan_edit";
import { Bussiness_profile } from "../pages/bussiness_profile";
import { Bussiness_profile_from } from "../pages/bussiness_profile_form";
import { Quotation_edit } from "../pages/quotation_edit";

function RouteComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    return (
            <Routes>
                {/* Public Routes */}
                
                <Route path="/" element={<PublicRoutes setAuth={setIsAuthenticated}></PublicRoutes>} />
                
                
                {/* Protected Routes */}

                <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />
                <Route path="/sidebar" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Sidebar />} />} />
                <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerForm />} />} />
                <Route path="/add-product" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProductForm />} />} />
                <Route path="/display" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerDisplay />} />} />
                <Route path="/profile/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerProfile />} />} />
                <Route path="/edit/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<EditCustomer />} />} />
                <Route path="/invoices" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Invoices />} />} />
                <Route path="/add-invoice" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<InvoiceForm />} />} />
                <Route path="/challan" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Challan />} />} />
                <Route path="/add-challan" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ChallanForm />} />} />
                <Route path="/payments" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Payments />} />} />
                <Route path="/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Products />} />} />
                <Route path="/reports" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Reports />} />} />
                <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Settings />} />} />
                <Route path="/generate-invoice" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<GenerateInvoice />} />} />
                <Route path="/generate-quotation" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<GenerateQuotation />} />} />
                <Route path="/generate-bill" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<GenerateBillComponent />} />} />
                <Route path="/customer-detail-display" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerFormDetailDisplay />} />} />
                <Route path="/customer_detail_edit" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Customer_detail_edit />} />} />
                <Route path="/product_detail_display" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Product_detail />} />} />
                <Route path="/product_detail_edit" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Product_edit />} />} />
                <Route path="/quotation" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<QuotationComponent />} />} />
                <Route path="/add-quotation" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<QuotationFrom />} />} />
                <Route path="/challan-preview" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ChallanPreview />} />} />
                <Route path="/challan-edit" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ChallanEdit />} />} />
                <Route path="/quotation-edit" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Quotation_edit />} />} />
                <Route path="/bussiness-profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Bussiness_profile />} />} />
                <Route path="/profile_form" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Bussiness_profile_from />} />} />
            </Routes>
    );
}

export default RouteComponent;