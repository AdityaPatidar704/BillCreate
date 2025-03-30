import React, { useEffect, useState, useRef } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import "../styles/customerDisplay.css"; // Import the CSS file
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import axios from "axios";
import { ButtonComponent } from "../components/Button";
import { apiDelete, apiGet, apiPost } from "../services/api";
import { TableComponent } from "../components/Table";
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
import { SearchComponent } from "../components/SerachBar";
import { Loader } from "../layouts/Loader";
function CustomerDisplay({ customerListUpdated }) {
  const column=["name","Address","Email","Contact"]
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();
  const printRef = useRef(); // Reference for printing
  const [loader,setLoader]=useState(false);
  const [total,setTotal]=useState(0);
  useEffect(() => {
    setTimeout(()=>{
        setLoader(true);
    },1000)
    const checkdata=async()=>{
        const res=await apiGet("/check-data");
        console.log(res);
        if(res=="No data")
        {
          alert("you need to first register a busiiness profile");
          navigate("/profile_form");
        }
        else{
          const fetchCustomers = async () => {
            try {
                const res=await apiGet("/customers")
                setCustomers(res);
                setTotal(res.length); 
                console.log(res)
                console.log("customer_response");
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
        }
    }
    checkdata();
}, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    `${customer.customer_id} ${customer.first_name} ${customer.last_name} ${customer.email} ${customer.company_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const dataTable=filteredCustomers.map(value=>({
    name:value.customer_name,	
    Address:value.billing_address,
    Email:value.email,
  	Contact:value.mobile_no
  }))
  const deleteCustomer = async (id) => {
    console.log(id)
    alert(id);
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:5003/api/customers/${id}`, { method: "DELETE" });

      if (response.ok) {
        alert("Customer deleted successfully");
        // fetchCustomers();
      } else {
        alert("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  const handleEdit=(e,contact)=>{
    alert(contact);
    for(var i of filteredCustomers)
    {
      if(i.mobile_no==contact)
      {
        console.log(i);
        console.log("i am match");
        navigate("/customer_detail_edit",{state:{data:i}});
      }
    }
  }
  const handlePreview=(e,contact)=>{
    alert(contact);
    for(var i of filteredCustomers)
    {
      if(i.mobile_no==contact)
      {
        console.log(i);
        console.log("i am match");
        navigate("/customer-detail-display",{state:{data:i}});

      }
    }
  }
  const handledelete=async (e,contact)=>{
    alert(contact);
    for(var i of filteredCustomers)
    {
      if(i.mobile_no==contact)
      {
        console.log(i);
        const res=await apiDelete(`customers/${i.customer_id}`);
        alert(res);
        window.location.reload();
      }
    }
  }

  return (
    <div>
      {loader?
     (<div className="gop">
      <Sidebar />
      <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Customer Details
                  <span className="bg-blue-400 ms-2 text-white px-3 py-1 rounded-full text-sm">
                    Total {total}
                  </span>
                </h2>
                {/* <form className="relative">
                <input 
                       placeholder="Search customers..."
                      //  value={search}
                       onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-1.5 pl-9 rounded-full border bg-gray-200 border-gray-300"
                    />
                    <svg 
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-700" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>
                    </form> */}
                    <SearchComponent onChange={(e) => setSearch(e.target.value)}/>
                <div className="flex space-x-3">
                  <button className="bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]">
                    Bulk Upload 
                  </button>
                  <NavLink to="/home">
              <ButtonComponent className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]" label="Add Customer" value="addProduct"></ButtonComponent>
              </NavLink>
                </div>
              </div>
        {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

        <TableComponent
        name="customer"
  column={column}
  data={dataTable}
  pageSize={3} // Number of rows per page
  actions={(row) => (
    <div className="flex gap-2">
      <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,row.Contact)}><Preview/></button>
      <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,row.Contact)}><ModeEdit/></button>
      <button className="text-red-500" onClick={(e) =>handledelete(e,row.Contact)}><DeleteForever/></button>
    </div>
  )}
/>

        {/* <TableComponent
  column={column}
  data={dataTable}
  pageSize={3} // Number of rows per page
  actions={(row) => (
    <div className="flex gap-2">
      <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
      <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
    </div>
  )}
/> */}
      </div>
      </div>)
      :(
        <Loader></Loader>
      )}
      </div>
    
    )
}

export default CustomerDisplay;  