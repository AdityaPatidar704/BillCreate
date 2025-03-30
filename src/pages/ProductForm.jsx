import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ProductForm.css";
import { ButtonComponent } from "../components/Button";
import { InputComponent } from "../components/input";
import { apiPost } from "../services/api";
// import { BarcodeComp } from "../components/QrCode";

const ProductForm = () => {
  const navigate = useNavigate(); // useNavigate hook
  const [producttype,setProducttype]=useState("");
  const [customField, setCustomField] = useState([""]);
  function handleProductChange(e){
    console.log(e.target.value);
    setProducttype(e.target.value);
}
function handleCategoryChange(e){
console.log(e.target.value);
setProduct_category(e.target.value);
}
function handleCustomField() {
  setCustomField((prevCustomField) => [...prevCustomField,""]);
}
function handleCustomFieldChange(index, value) {
  const updatedFields = [...customField];
  updatedFields[index] = value;
  setCustomField(updatedFields);
}
  const [product_category,setProduct_category]=useState("");
  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_category:"",
      // product_id: "",
      product_unit:"",
      // productType:"",
      selling_price:"",
      purchase_price: "",
      hsn_sac_code: "",
      product_description: "",
      custom_field:"",
      generate_barcode:"",
      product_type: "",
      gst_rate: "",
      product_image_pdf: null, // Added for file input
    },
    onSubmit: async (values) => {
      values.product_type=producttype;
      const keyValuePairs = customField.map(field => {
        const [key, value] = field.split("/").map(item => item.trim());
        return { key, value };
      });

      values.custom_field=keyValuePairs;
      // values.custom_field=JSON.parse(customField);
      values.product_category=product_category;
      alert(JSON.stringify(values));
      
        const res=await apiPost("/products/add",values);
        alert(res);
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const response = await axios.post("http://localhost:5003/products/add", values, {
  //       //   // headers: {
  //       //   //   "Content-Type": "multipart/form-data", // Set the content type for file upload
  //       //   // },
  //       // });
  //       const response = await apiPostProducts(
  //         "http://localhost:5003/products/add",
  //         values
  //       );
  //       alert("Product added successfully!");
  //       console.log(response.data);

  //       // Navigate to products page after successful submission
  //       navigate("/products");

  //       // Reset form after submission
  //       formik.resetForm();
  //     } catch (error) {
  //       console.error("Error adding product:", error);
  //       alert("Failed to add product");
  //     }
    },
  });
  const [gvalue,setGvalue]=useState("");
  function handleBarcodeGenerate(e)
  {
    setGvalue(e.target.value);
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Add Product
          </h1>
          {/* <button className="btn btn-primary float-end"><NavLink to="/products" className="text-white text-decoration-none">close</NavLink></button> */}
          <NavLink to="/products">
            <ButtonComponent
              className="btn btn-primary float-end"
              value="close"
              label="close"
            ></ButtonComponent>
          </NavLink>
          <form
            className="mt-6"
            id="product_Form"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <InputComponent
                  labelInput="Product Name"
                  type="text"
                  name="product_name"
                  placeholder="Enter Product Name"
                  onChange={formik.handleChange}      
                ></InputComponent>
              </div>
              <div>
                <label className="block text-gray-600"></label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    Product Type:
                    </label>
                    <input
                      type="radio"
                      onChange={handleProductChange}
                      value="product"
                      name="product_type"
                      className="mr-2"      
                    ></input>
                    <span> Product</span>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      onChange={handleProductChange}
                      name="product_type"
                      value="service"
                      className="mr-2"
                    ></input>
                    <span>Service </span>
                  </label>
                </div>
              </div>
              <div>
                <InputComponent
                  labelInput="Product Unit"
                  type="text"
                  name="product_unit"
                  value={formik.values.product_unit}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product Unit"
                />
              </div>
              <div>
                <label class="block text-gray-600">Product Category</label>
                <select onChange={handleCategoryChange} class="w-full p-2 border rounded">
                  <option readOnly value="select">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                </select>
              </div>
              <div>
                <InputComponent
                  labelInput="Selling Price"
                  type="number"
                  name="selling_price"
                  value={formik.values.selling_price}
                  onChange={formik.handleChange}
                  required
                  placeholder="Enter Product Selling Price"
                />
              </div>
              <div>
                <InputComponent
                  labelInput="Purchase Price"
                  type="number"
                  name="purchase_price"
                  value={formik.values.purchase_price}
                  onChange={formik.handleChange}
                  required
                  placeholder="Enter Product Purchase Price"
                />
              </div>
              <div>
                <InputComponent
                  labelInput="Product HSN / SAC Code"
                  type="text"
                  name="hsn_sac_code"
                  value={formik.values.hsn_sac_code}
                  onChange={formik.handleChange}
                  required
                  placeholder="Product HSN/SAC code"
                />
              </div>
              <div>
                <InputComponent
                  type="number"
                  labelInput="GST Rate"
                  name="gst_rate"
                  value={formik.values.gst_rate}
                  onChange={formik.handleChange}
                  required
                  placeholder="Enter Unit Price"
                />
              </div>
              <div>
                <InputComponent
                  labelInput="Genarate Barcode"
                  type="text"
                  name="generate_barcode"
                  value={formik.values.generate_barcode}
                  onChange={formik.handleChange}
                  onBlur={handleBarcodeGenerate}
                  required
                  placeholder="Generate Barcode"
                />
              </div>
              <div>
                <InputComponent
                  labelInput="Product Image (PDF)"
                  type="file"
                  accept=".pdf"
                  name="product_image_pdf"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Product Description
                </label>
                <textarea
                  name="product_description"
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Product Description"
                ></textarea>
              </div>
              <div style={{marginTop:"10px"}}>                   
              <label className="block text-gray-600">Custom Fields</label>
          {customField.map((field, index) => (
            <input
              key={index}
              type="text"
              value={field}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter custom field detail in format key/value"
            />
          ))}
          <button
            onClick={handleCustomField}
            type="button"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            + Add Field
          </button>
                  </div>
            </div>
            <div class="text-center mt-6">
              <ButtonComponent
                label="Add Product"
                type="submit"
                className="bg-[#3A5B76] text-white px-6 py-2 rounded-lg hover:bg-[#2E4A63]"
              ></ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
