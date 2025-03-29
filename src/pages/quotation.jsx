import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../layouts/Sidebar"; // Make sure Sidebar is correctly imported
import InvoiceForm from "./InvoiceForm";
import "../styles/Invoices.css";
import "../styles/customerDisplay.css"; // Import the CSS file
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { debounce } from "lodash";
import { useReactToPrint } from "react-to-print";
import { data } from "jquery";
import { InputComponent } from "../components/input.jsx";
import { ButtonComponent } from "../components/Button.jsx";
import { apiGet } from "../services/api.js";
import { SearchComponent } from "../components/SerachBar.jsx";
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
export function QuotationComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [quotation, setQuotation] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const [checked, setChecked] = useState([]); // Changed to an array to hold checked items
  const navigate = useNavigate();
  const contentRef=useRef();

  // function handleModalClick() {
  //   setIsClicked(true);
  // }

  // function closeBtn() {
  //   setIsClicked(false);
  // }

  // const debounceCall = debounce((value) => {
  //   // console.log(value);
  //   setCustomerId(value);
  // }, 500);

  // function customerIdGet(e) {
  //   debounceCall(e.target.value);
  // }
  useEffect(()=>{ 
    const fetchQuotation = async () => {
      const token = localStorage.getItem("token");
      try {
        // const res = await axios.get(`http://localhost:5003/api/challandetails/provideing`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        // const res=await apiRequestChallandetail("challandetails/provideing",token);
        const res=await apiGet("/quotation/getallquotation")
        console.log(JSON.stringify(res));
        setQuotation(res);
        // console.log(res.data[0].challan_date);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuotation();
    setIsClicked(false);
  },[])

  const fetchQuotationDetail = quotation.filter((quotation) =>
    `${quotation.challan_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteCustomer = async (id) => {
    console.log(id);
    alert(id);
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:5003/api/customers/${id}`, { method: "DELETE" });

      if (response.ok) {
        alert("Customer deleted successfully");
        // handleChallanCheck();
      } else {
        alert("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  function handleGenerateQuotation(e){
    if(checked.length>0)
    {
      navigate("/generate-quotation",{state:{data:checked}})
    }
    else{
      navigate("/generate-quotation",{state:{data:quotation}})
    }
  }
  function handleCheckbox(e, quotation) {
    // console.log(challan);
    alert(JSON.stringify(checked)+"previous value");
    if (e.target.checked) {
      // Add the checked challan to the checked array
      setChecked((prevChecked) => [...prevChecked, quotation]);
    } else {
      // Remove the unchecked challan from the checked array
      setChecked((prevChecked) => prevChecked.filter(item => item.challan_id !== quotation.challan_id));
    }
  }
   function handlePreview(e,id)
    {
      alert(id);
      for(var i of fetchQuotationDetail)
      {
        if(id==i.quotation_id)
        {
          alert(JSON.stringify(i));
          // navigate("/challan-preview",{state:{data:i}})
        }
      }
    }
    function handledelete(e,id)
    {
      alert(id);
    }
    function handleEdit(e,id)
    {
      alert(id);
      for(var i of fetchQuotationDetail)
      {
        if(id==i.quotation_id)
        {
          alert(JSON.stringify(i));
          navigate("/quotation-edit",{state:{data:i}})
        }
      }
  
    }
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="mt-2 header-topper gopal">
        <h1 className="gopa">Quotation</h1>
        {/* <InputComponent
          type="text"
          placeholder="Search Challan by Id.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classNameInput="search-bar"
        ></InputComponent> */}
        <SearchComponent onChange={(e) => setSearch(e.target.value)}/>
        {/* <button
          type="button"
          onClick={handleModalClick}
          className="btn btn-primary"
        >
          Get Challan
        </button> */}
        <ButtonComponent label="Generate Quotation Invoice" value="quotation" className="btn btn-warning" type="button" onClick={handleGenerateQuotation}></ButtonComponent>
        <NavLink to="/add-quotation">
          <ButtonComponent className="btn btn-primary" label="Add quotation" value="challanAdd"></ButtonComponent>
        </NavLink>
      </div>
      <table className="customer-table gopal">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchQuotationDetail.length > 0 ? (
            fetchQuotationDetail.map((quotation) => {
              console.log(quotation); // Debugging step
              return (
                <tr key={quotation.quotation_id}>
                  <td>{quotation.quotation_id}</td>
                  <td>{quotation.quotation_date}</td>
                  <td>{quotation.total_amount}</td>
                  <td></td>
                  <td>
                    <InputComponent id={quotation.challan_id} onChange={(e) => handleCheckbox(e, quotation)} type="checkbox" classNameInput="form-check-input" />
                  </td>
                  <td>
                                    <div className="flex gap-2">
                                    <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,quotation.quotation_id)}><Preview/></button>
                                    <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,quotation.quotation_id)}><ModeEdit/></button>
                                    <button className="text-red-500" onClick={(e) =>handledelete(e,quotation.quotation_id)}><DeleteForever/></button>
                      </div>
                                    </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No customer Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}