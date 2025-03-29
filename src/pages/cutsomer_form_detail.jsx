import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { debounce } from "lodash";
import axios from "axios";
import { InputComponent } from "../components/input";
import { ButtonComponent } from "../components/Button";

export default function CustomerFormDetailDisplay({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const location = useLocation();
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
    console.log(data);
    console.log("execute");
  }, []);
  function handleClick() {
    console.log(data);
  }
  return (
    <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Customer Details View
      </h1>
      <button className="btn btn-primary float-end">
        <NavLink to="/display" className="text-white text-decoration-none">
          Close
        </NavLink>
      </button>
      <form id="customerForm" className="mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Name"
              type="text"
              placeholder="Enter Product Name"
              value={data.customer_name}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Party Type"
              type="text"
              value={data.party}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Email Id"
              type="text"
              value={data.email}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Mobile No."
              type="text"
              value={data.mobile_no}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="GSTIN No."
              type="text"
              value={data.tax_id}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Pan No."
              type="text"
              value={data.pan_number}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Category"
              type="text"
              value={data.customer_category}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Type."
              type="text"
              value={data.customer_type}
            ></InputComponent>
          </div>
          <div>
          <label
                htmlFor="billing_address"
                className="block text-gray-600 mt-4"
              >
                Billing Address:
              </label>
              <textarea
              readOnly
                id="billing_address"
                name="billing_address"
                value={data.billing_address}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
          </div>
          <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Shipping Address:
              </label>
              <textarea
              readOnly  
                value={data.shipping_address}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Opening Value"
              type="text"
              value={data.opening_value}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Country"
              type="text"
              value={data.country}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="State"
              type="text"
              value={data.state}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="City"
              type="text"
              value={data.city}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="zip/PinCode"
              type="text"
              value={data.zip_code}
            ></InputComponent>
          </div>
        </div>
        <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Notes:
              </label>
              <textarea  
              readOnly
                value={data.notes}
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
          <h3 class="text-xl font-bold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
            readOnly
              labelInput="Birth Date"
              type="text"
              value={data.date_of_birth}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Anniversary"
              type="text"
              value={data.anniversary_date}
            ></InputComponent>
          </div>
          </div>
          <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Personal notes:
              </label>
              <textarea 
              readOnly 
                value={data.personal_notes}
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
      </form>
    </div>
  );
}
