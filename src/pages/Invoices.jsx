
import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import InvoiceForm from "./InvoiceForm";
import axios from "axios";
import "../styles/Invoices.css";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { ModalComponent } from "../components/model";
import { InputComponent } from "../components/input";
import { ButtonComponent } from "../components/Button";
import { apiGet } from "../services/api";
import { SearchComponent } from "../components/SerachBar";

const Invoices = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [customerId,setCustomerId]=useState("");

  useEffect(() => {
    // fetchInvoices();
  }, []);
   const [isClicked, setIsClicked] = useState(false);
   const [invoicedetail,setInvoicedetail]=useState([{}]);
  // const fetchInvoices = async () => {
  //   try {
  //     // const response = await axios.get("http://localhost:5003/api/invoices/submit");
  //     const response=await apiGet("invoices/submit");
  //     setInvoicesData(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching invoices:", error);
  //   }
  // }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/invoices/${id}`);
      setInvoicesData(invoicesData.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  }

  const handleInvoiceAdded = (newInvoice) => {
    setInvoicesData([...invoicesData, newInvoice]);
    setShowForm(false); // Hide form after adding invoice
  }
  function closeBtn(){
    setIsClicked(false);
  }
  function handleModalClick(){
    setIsClicked(true);
  }
  function customerIdGet(e){
    debounceCall(e.target.value);    
}
const debounceCall=debounce((value=>{
    console.log(value);
    setCustomerId(value);
  }),500)
  function handleGenerateFn(){
    navigate("/generate-bill",{state:{data:invoicedetail}})
  }
  function handleInvoiceCheck(){
          console.log("clicked");
          const fetchApiInvoice=async ()=>{
              const token=localStorage.getItem("token");
              try{
                  // const res=await axios.get(`http://localhost:5003/api/invoices/invoicesdetails/${customerId}`,{
                  //   headers:{
                  //     Authorization :`Bearer ${token}`,
                  //   }
                  // })
                  const res=await apiGet(`invoices/invoicesdetails/${customerId}`)
                  console.log(res);
                  setInvoicedetail(res);
                  setIsClicked(false);
              }
              catch(error)
              {
                console.log(error);
              }
          }
          fetchApiInvoice();
    }
    const fetchInvoiceDetail=invoicedetail.filter((invoice)=>
      `${invoice.invoice_id}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
  return (
    <div className="gop gopal">
      <Sidebar />
      <div className="mt-2 header-topper gopal">
        <h1 className="gopa">Invoices</h1>
        {/* <input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        /> */}
        <SearchComponent onChange={(e) => setSearchTerm(e.target.value)}/>
        {/* <button className="add-customer-button">
          <NavLink to="/add-invoice" className="text-white text-decoration-none">Invoices</NavLink>
        </button> */}
        <div>
        <button
          type="button"
          onClick={handleModalClick}
          className="btn btn-primary"
        >
          Get Invoice
        </button>
          <ModalComponent style={{display:isClicked?"inline-block":"none"}} 
                    model_title="Enter your Customer number:-"
                    onClick={closeBtn}
                    modal_body={<InputComponent type="text" onChange={customerIdGet} classNameInput="form-control" placeholder="Enter customer id" />}
                    modal_footer={<ButtonComponent type="button" className="btn btn-primary" label="Search Challan's" value="challan" onClick={handleInvoiceCheck}></ButtonComponent>}
                   ></ModalComponent>
        </div>
        <NavLink to="/add-invoice" className="text-white text-decoration-none">
        <ButtonComponent className="add-customer-button" label="Invoices" value="invoices"></ButtonComponent>
        </NavLink>
      </div>
      <table className="customer-table gopal">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchInvoiceDetail.length>0?(
            // .filter((invoice) => invoice.invoice_id.toLowerCase().includes(searchTerm.toLowerCase()))
            fetchInvoiceDetail.map((invoice) => (
              <tr key={invoice.invoice_id}>
                <td>{invoice.invoice_id}</td>
                <td>{invoice.invoice_date}</td>
                <td>{invoice.tax_amount}</td>
                <td>{invoice.status}</td>
                <td>
                {/* <button onClick={() => navigate("/add-invoice")}>Add Invoice</button> */}
                </td>
              </tr>
            )))
          :(
<tr>
      <td colSpan="6" style={{ textAlign: "center"}}>
        Please insert cutomer mobile no from get invoice button
      </td>
    </tr>
          )
          }
            
        </tbody>
      </table>
      <button className="btn btn-warning" onClick={handleGenerateFn}>generate-invoice</button>
    </div>
  );
};

export default Invoices;
