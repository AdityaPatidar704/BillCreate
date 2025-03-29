// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import LoginRegister from "../pages/loginRegister";
// import CustomerForm from "../pages/customerForm";
// import CustomerProfile from "../pages/customerProfile";
// import CustomerDisplay from "../pages/customerDisplay";
// import EditCustomer from "../pages/editCustomer";
// import Dashboard from "../pages/Dashboard";
// import Invoices from "../pages/Invoices";
// import Payments from "../pages/Payments";
// import Products from "../pages/Products";
// import Reports from "../pages/Reports";
// import Settings from "../pages/Settings";
// import ProductForm from "../pages/ProductForm";
// import Sidebar from "../layouts/Sidebar";
// import InvoiceForm from "../pages/InvoiceForm";  // InvoiceForm import karo
// import "../styles/index.css"
// import { Challan } from "../pages/challan";
// import { ChallanForm } from "../pages/challan_form";
// // Protected Route Component
// const ProtectedRoute = ({ element, isAuthenticated }) => {
//     return isAuthenticated ? element : <Navigate to="/" />;
// };

// function ProtectedRouteComponent() {
//     // Load authentication state from localStorage
//     const [isAuthenticated, setIsAuthenticated] = useState(
//         localStorage.getItem("isAuthenticated") === "true"
//     );

//     // Update localStorage when authentication state changes
//     useEffect(() => {
//         localStorage.setItem("isAuthenticated", isAuthenticated);
//     }, [isAuthenticated]);

//     return (
//         <Router>
//             <Routes>
//                 {/* Default route: Login Page */}
//                 <Route path="/" element={<LoginRegister setAuth={setIsAuthenticated} />} />

//                 {/* Protected Routes (Accessible only if authenticated) */}
//                 <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />
//                 <Route path="/sidebar" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Sidebar />} />} />
//                 <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerForm />} />} />
//                 <Route path="/add-product" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProductForm />} />} />
//                 <Route path="/display" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerDisplay />} />} />
//                 <Route path="/profile/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerProfile />} />} />
//                 <Route path="/edit/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<EditCustomer />} />} />
//                 <Route path="/invoices" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Invoices />} />} />
//                 <Route path="/add-invoice" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<InvoiceForm />} />} />
//                 <Route path="/challan" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Challan />} />} />
//                 <Route path="/add-challan" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ChallanForm />} />} />

//                 <Route path="/payments" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Payments />} />} />
//                 <Route path="/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Products />} />} />
//                 <Route path="/reports" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Reports />} />} />
//                 <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Settings />} />} />
//             </Routes>
//         </Router>
//     );
// }

// export default ProtectedRouteComponent;


