import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { InputComponent } from "../components/input";

export function Product_detail(){
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
    return(
        <div>
            <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Product Details View
      </h1>
      <button className="btn btn-primary float-end">
        <NavLink to="/products" className="text-white text-decoration-none">
          Close
        </NavLink>
      </button>
      <form id="ProductForm" className="mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
            readOnly
              labelInput="Product Name"
              type="text"
              placeholder="Enter Product Name"
              value={data.product_name}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Type"
              type="text"
              value={data.product_type}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Unit"
              type="text"
              value={data.product_unit}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Category"
              type="text"
              value={data.category}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Selling Price"
              type="text"
              value={data.selling_price}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Purchase Price"
              type="text"
              value={data.purchase_price}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product HSN / SAC Code"
              type="text"
              value={data.product_hsn_code}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="GST Rate"
              type="text"
              value={data.gst_rate}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Image (PDF)"
              type="text"
             
            ></InputComponent>
          </div>
          </div>
        <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Product Description
              </label>
              <textarea  
              readOnly
                // value={data.notes}
                className="w-full p-2 border rounded mt-1"
                value={data.product_description}
              ></textarea>
          </div>
          <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Add Custom Field
              </label>
              <textarea 
              readOnly 
                value={data.custom_field}
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
      </form>
    </div>
        </div>
    )
}