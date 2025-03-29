import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { debounce } from "lodash";
import axios from "axios";
import { InputComponent } from "../components/input";
import { ButtonComponent } from "../components/Button";
import { AlarmSharp } from "@mui/icons-material";
import { apiPut } from "../services/api";

export default function Customer_detail_edit({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const [party,setParty]=useState("");
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({});
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      party_type: "",
      email: "",
      mobile_no: "",
      tax_id: "",
      pan_no: "",
      customer_category: "",
      customer_type: "",
      billing_address: "",
      shipping_address: "",
      opening_value: "",
      country: "",
      is_active:false,
      state: "",
      city: "",
      zip_code: "",
      notes: "",
      birth_date: "",
      anniversary_date: "",
      personal_notes: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      if (values.customer_name == "") {
        values.customer_name = data.customer_name;
      }
      if (values.party_type == "") {
        values.party_type = data.party;
      }
      if (values.email == "") {
        values.email = data.email;
      }
      if (values.mobile_no == "") {
        values.mobile_no = data.mobile_no;
      }
      if (values.tax_id == "") {
        values.tax_id = data.tax_id;
      }
      if (values.pan_no == "") {
        values.pan_no = data.pan_number;
      }
      if (values.customer_category == "") {
        values.customer_category = data.customer_category;
      }
      if (values.customer_type == "") {
        values.customer_type = data.customer_type;
      }
      if (values.billing_address == "") {
        values.billing_address = data.billing_address;
      }
      if (values.shipping_address == "") {
        values.shipping_address = data.shipping_address;
      }
      if (values.opening_value == "") {
        values.opening_value = data.opening_value;
      }
      if (values.country == "") {
        values.country = data.country;
      }
      if (values.state == "") {
        values.state = data.state;
      }
      if (values.city == "") {
        values.city = data.city;
      }
      if (values.zip_code == "") {
        values.zip_code = data.zip_code;
      }
      if (values.notes == "") {
        values.notes = data.notes;
      }
      if (values.birth_date == "") {
        values.birth_date = data.date_of_birth;
      }
      if (values.anniversary_date == "") {
        values.anniversary_date = data.anniversary_date;
      }
      if (values.personal_notes == "") {
        values.personal_notes = data.personal_notes;
      }
      alert(JSON.stringify(values));
      const editdetail=async ()=>{
            const res=await apiPut("/customers",values);
            alert(JSON.stringify(values));
      }
      editdetail();
    },
  });
  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
    console.log(data);
    console.log("execute");
  }, []);
  function handleClick() {
    console.log(data);
  }
  function handleFieldChange(e) {
    setIsEdit(true);
  }
  function handlePartyChange(e)
  {
        setParty(e);
  }
  return (
    <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Customer Details Edit
      </h1>
      <button className="btn btn-primary float-end">
        <NavLink to="/display" className="text-white text-decoration-none">
          Close
        </NavLink>
      </button>
      <form onSubmit={formik.handleSubmit} id="customerForm" className="mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="customer_name"
              onFocus={handleFieldChange}
              labelInput="Customer Name"
              type="text"
              placeholder="Enter Product Name"
              {...(isEdit ? {} : { value: data.customer_name })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="party_type"
              onFocus={handleFieldChange}
              labelInput="Party Type"
              type="text"
              // value={data.party}
              {...(isEdit ? {} : { value: data.party })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="email"
              onFocus={handleFieldChange}
              labelInput="Email Id"
              type="text"
              // value={data.email}
              {...(isEdit ? {} : { value: data.email })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="mobile_no"
              onFocus={handleFieldChange}
              labelInput="Mobile No."
              type="text"
              readOnly
              // value={data.mobile_no}
              {...(isEdit ? {} : { value: data.mobile_no })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="tax_id"
              onFocus={handleFieldChange}
              labelInput="GSTIN No."
              type="text"
              // value={data.tax_id}
              {...(isEdit ? {} : { value: data.tax_id })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="pan_no"
              onFocus={handleFieldChange}
              labelInput="Pan No."
              type="text"
              // value={data.pan_number}
              {...(isEdit ? {} : { value: data.pan_number })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="customer_category"
              onFocus={handleFieldChange}
              labelInput="Customer Category"
              type="text"
              // value={data.customer_category}
              {...(isEdit ? {} : { value: data.customer_category })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="customer_type"
              labelInput="Customer Type."
              type="text"
              // value={data.customer_type}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.customer_type })}
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
              onChange={formik.handleChange}
              id="billing_address"
              name="billing_address"
              // value={data.billing_address}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.billing_address })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Billing Address"
            ></textarea>
          </div>
          <div>
            <label htmlFor="" className="block text-gray-600 mt-4">
              Shipping Address:
            </label>
            <textarea
              onChange={formik.handleChange}
              name="shipping_address"
              // value={data.shipping_address}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.shipping_address })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Billing Address"
            ></textarea>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="opening_value"
              labelInput="Opening Value"
              type="text"
              // value={data.opening_value}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.opening_value })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="country"
              labelInput="Country"
              type="text"
              // value={data.country}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.country })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="state"
              labelInput="State"
              type="text"
              // value={data.state}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.state })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="city"
              labelInput="City"
              type="text"
              // value={data.city}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.city })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="zip_code"
              labelInput="zip/PinCode"
              type="text"
              // value={data.zip_code}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.zip_code })}
            ></InputComponent>
          </div>
        </div>
        <div>
          <label htmlFor="" className="block text-gray-600 mt-4">
            Notes:
          </label>
          <textarea
            onChange={formik.handleChange}
            name="notes"
            // value={data.notes}
            onFocus={handleFieldChange}
            {...(isEdit ? {} : { value: data.notes })}
            className="w-full p-2 border rounded mt-1"
          ></textarea>
        </div>
        <h3 class="text-xl font-bold">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="birth_date"
              labelInput="Birth Date"
              type="text"
              // value={data.date_of_birth}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.date_of_birth })}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
              onChange={formik.handleChange}
              name="anniversary_date"
              labelInput="Anniversary"
              type="text"
              // value={data.anniversary_date}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.anniversary_date })}
            ></InputComponent>
          </div>
        </div>
        <div>
          <label htmlFor="" className="block text-gray-600 mt-4">
            Personal notes:
          </label>
          <textarea
            onChange={formik.handleChange}
            name="personal_notes"
            // value={data.personal_notes}
            onFocus={handleFieldChange}
            {...(isEdit ? {} : { value: data.personal_notes })}
            className="w-full p-2 border rounded mt-1"
          ></textarea>
        </div>
        <div className="mt-10 text-center">
          <ButtonComponent
            value="Submit"
            label="Submit"
            type="submit"
            className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
          ></ButtonComponent>
        </div>
      </form>
    </div>
  );
}
