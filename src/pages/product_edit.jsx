import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { InputComponent } from "../components/input";
import { ButtonComponent } from "../components/Button";
import { useFormik } from "formik";
import { apiPut } from "../services/api";
export function Product_edit() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
    console.log(data);
    console.log("execute");
  }, []);
  function handleClick() {
    console.log(data);
  }
  function handleEdit() {
    setIsEdit(true);
  }
  const formik = useFormik({
    initialValues: {
      product_id: "",
      product_name: "",
      product_type: "",
      product_unit: "",
      product_category: "",
      selling_price: "",
      generate_barcode: "",
      purchase_price: "",
      product_hsn_code: "",
      gst_rate: "",
      product_img: null,
      product_description: "",
      custom_field: "",
    },
    onSubmit: async (values) => {
      values.product_id = data.product_id;
      if (values.product_name == "") {
        values.product_name = data.product_name;
      }
      if (values.product_type == "") {
        values.product_type = data.product_type;
      }
      if (values.product_unit == "") {
        values.product_unit = data.product_unit;
      }
      if (values.generate_barcode == "") {
        values.generate_barcode = data.generate_barcode;
      }
      if (values.product_category == "") {
        values.product_category = data.category;
      }
      if (values.selling_price == "") {
        values.selling_price = data.selling_price;
      }
      if (values.purchase_price == "") {
        values.purchase_price = data.purchase_price;
      }
      if (values.product_hsn_code == "") {
        values.product_hsn_code = data.product_hsn_code;
      }
      if (values.gst_rate == "") {
        values.gst_rate = data.gst_rate;
      }
      if (values.product_img == "") {
        values.product_img = data.product_image;
      }
      if (values.product_description == "") {
        values.product_description = data.product_description;
      }
      if (values.custom_field == "") {
        values.custom_field = data.custom_field;
      }
      alert(JSON.stringify(values));
      const res = await apiPut("/products", values);

      alert(JSON.stringify(res));
    },
  });
  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Product Details Edit
        </h1>
        <button className="btn btn-primary float-end">
          <NavLink to="/products" className="text-white text-decoration-none">
            Close
          </NavLink>
        </button>
        <form onSubmit={formik.handleSubmit} id="ProductForm" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputComponent
                onChange={formik.handleChange}
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_name })}
                name="product_name"
                labelInput="Product Name"
                type="text"
                placeholder="Enter Product Name"
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Product Type"
                name="product_type"
                type="text"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_type })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Product Unit"
                type="text"
                name="product_unit"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_unit })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Product Category"
                type="text"
                name="product_category"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.category })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="selling_price"
                labelInput="Selling Price"
                type="text"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.selling_price })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Purchase Price"
                type="text"
                name="purchase_price"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.purchase_price })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Product HSN / SAC Code"
                type="text"
                name="product_hsn_code"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_hsn_code })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="GST Rate"
                type="text"
                name="gst_rate"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.gst_rate })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="generate_barcode"
                labelInput="Generate Barcode"
                type="text"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.generate_barcode })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="product_img"
                labelInput="Product Image (PDF)"
                type="text"
                //   value={data.opening_value}
              ></InputComponent>
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-gray-600 mt-4">
              Product Description
            </label>
            <textarea
              onChange={formik.handleChange}
              name="product_description"
              onFocus={handleEdit}
              {...(isEdit ? {} : { value: data.product_description })}
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>
          <div>
            <label htmlFor="" className="block text-gray-600 mt-4">
              Add Custom Field
            </label>
            <textarea
              onChange={formik.handleChange}
              name="custom_field"
              onFocus={handleEdit}
              {...(isEdit ? {} : { value: data.custom_field })}
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>
          <div class="text-center mt-6">
            <ButtonComponent
              label="Submit"
              type="submit"
              className="bg-[#3A5B76] text-white px-6 py-2 rounded hover:bg-[#2E4A63]"
            ></ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
}
