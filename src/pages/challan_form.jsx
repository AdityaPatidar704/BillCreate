import React, { useState, useEffect } from "react";
import axios from "axios";
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toWords } from "number-to-words";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { ButtonComponent } from "../components/Button";
import { InputComponent } from "../components/input";
import { apiGet, apiPost } from "../services/api";
export function ChallanForm() {
  const [customers, setCustomers] = useState([]);
  const [dd, setdd] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [datee, setDatee] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [dt, setDt] = useState("");
  const [show, setShow] = useState("");
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    setdd(dd.getMonth() + 1 + "/" + dd.getFullYear());
    setMonth(month.getMonth() + 1);
    setDatee(datee.getDate());
    setYear(year.getFullYear());
    setDt(
      datee.getDate() + "/" + (month.getMonth() + 1) + "/" + year.getFullYear()
    );
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        // const res = await axios.get(
        //   "http://localhost:5003/api/productdetail/productName",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const res=await apiGet("/productdetail/productName")
        setProducts(res);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleKeyUp = (e) => {
    const value = e.target.value;
    console.log(value);

    // Allow only digits and dots
    if (!/^[\d.]*$/.test(value)) {
      return;
    }

    setDt(value);
  };

  const handleDateBlur = () => {
    const parts = dt.split(".");

    // Ensure we have the correct number of parts
    if (parts.length === 1 && parts[0].length <= 2) {
      // Format as DD.MM
      setDt(`${parts[0]}/${month}/${year}`);
    } else if (
      parts.length === 2 &&
      parts[0].length <= 2 &&
      parts[1].length <= 2
    ) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/${year}`);
    } else if (
      parts.length === 3 &&
      parts[0].length <= 2 &&
      parts[1].length <= 2 &&
      parts[2].length <= 2
    ) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/20${parts[2]}`);
    } else if (
      parts.length === 3 &&
      parts[0].length <= 2 &&
      parts[1].length <= 2 &&
      parts[2].length <= 4
    ) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/${parts[2]}`);
    }
  };
  function handleFoucus() {
    setDt("");
  }
  function increaseCount() {
    console.log("count" + count);
    setCount(count + 1);
  }
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [billing, setBilling] = useState("");
  const [productdt, setProductdt] = useState([{}]);
  const [product_hsn, setProduct_hsn] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [gst, setGst_rate] = useState("");
  const [gstRate, setGstRate] = useState(0);
  const [currency, setCurrency] = useState("");
  const handleDebounce = debounce((value) => {
    console.log("i will run");
    const fetchCustomersDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // const res = await apiReuestCustomerdetail("invoices",value,token)
        const res=await apiGet(`/invoices/${value}`);
        console.log(res);
        const getName =res[0].customer_name;
        const getEmail = res[0].email;
        const getBilling =
        res[0].billing_address +
        " " +
        res[0].zip_code +
        " "
        console.log(getName);
        console.log(getEmail);
        console.log(getBilling);
        setName(getName);
        setemail(getEmail);
        setBilling(getBilling);
        setProducts(res);
        handleProductdt();
      } catch (error) {
        console.error("Error fetching customers:", error);
        setemail("");
        setName("");
        setBilling("");
        handleProductdt();
      }
    };
    fetchCustomersDetails();
  }, 900);
  function handleTimer(value) {
    handleDebounce(value);
  }
  function handleApiCall(e) {
    handleTimer(e.target.value);
    console.log(e.target.value);
  }
  function handleProductdt() {
    const fetchCustomersProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        // const res = await apiRequestProductdetails("productdetail/productName",token)
        const res=await apiGet("/productdetail/productName")
        setProducts(res);
        console.log(res);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomersProduct();
  }

  const [productRows, setProductRows] = useState([
    {
      id: Date.now(),
      productName: "",
      hsnCode: "",
      gstRate: "",
      gstCalculate: "",
      unitPrice: "",
      quantity: "",
      total: "",
    },
  ]);
  const handleProductChange = async (index, productName) => {
    try {
      const token = localStorage.getItem("token");
      // const res = await apiRequestProductdetailsForParticular(`productdetail/all/${productName}`,token)
      const res=await apiGet(`/productdetail/all/${productName}`)
      const productDetail = res[0];
      const updatedRows = [...productRows];
      var rate = 100;
      rate =
        parseInt(res[0].gst_rate) * parseFloat(res[0].purchase_price);
      console.log(rate);
      rate = rate / 100;
      console.log("gstRate" + rate);
      updatedRows[index] = {
        ...updatedRows[index],
        productName: productDetail.product_name,
        hsnCode: productDetail.product_hsn_code,
        gstRate: productDetail.gst_rate,
        gstCalculate: rate + parseFloat(res[0].purchase_price),
        unitPrice: productDetail.purchase_price,
        total: productDetail.purchase_price * updatedRows[index].quantity, // Update total based on quantity
      };
      setProductRows(updatedRows);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const [total, setTotal] = useState(0);
  const [addTotal, setAddTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [AmountWords, setAmountWords] = useState("");
  const handleQuantityChange = (index, quantity, getNotify) => {
    var subTotalll = 0;
    if (getNotify == "qtyChange") {
      const updatedRows = [...productRows];
      updatedRows[index].quantity = quantity;
      updatedRows[index].total = updatedRows[index].gstCalculate * quantity; // Update total based on quantity
      setProductRows(updatedRows);
      setAddTotal(0);
      setSubTotal(0);
      var totall = 0;
      var subTotall = 0;
      var num = 0;
      for (var i of productRows) {
        subTotall = subTotall + parseFloat(i.unitPrice);
        totall = totall + parseFloat(i.total);
        // setAddTotal(addTotal+totall);
        if (productRows.length - 2 == num) {
          subTotalll = subTotall;
        }
        console.log(subTotalll);
        num++;
      }
      console.log(totall + "i ");
      setAddTotal(totall.toFixed(2));
      setSubTotal(subTotall);
      // const word=toWords(parseFloat(totall,10));
      // setAmountWords(word.toUpperCase());
      // Handle crores
      let result = ""; // Initialize result as an empty string
      const units = ["", " lakh", " crore"];
      // Units for Indian numbering system

      if (totall >= 10000000) {
        // Check if num is 10 million or more
        console.log("working");
        const crores = Math.floor(totall / 10000000); // crores = 1
        result += toWords(crores) + units[2]; // result = "1 crore"
        totall %= 10000000; // num = 5000000
        setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
        console.log("add" + totall);
      }

      // Handle lakhs
      if (totall >= 100000) {
        // Check if num is 100,000 or more
        const lakhs = Math.floor(totall / 100000); // lakhs = 5
        result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
        totall %= 100000; // num = 0
        setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
        console.log("add" + totall);
      }
      // Handle thousands and below
      if (totall >= 0) {
        // Check if num is greater than 0
        console.log("working>0" + totall);
        const word = toWords(parseFloat(totall, 10));
        setAmountWords(
          result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
        );
      }
      console.log(result.trim()); // Output: "1 crore 5 lakh"
    } else if (getNotify == "remove") {
      const updatedRows = [...productRows];
      console.log(productRows[index]);
      updatedRows[index].quantity = 0;
      updatedRows[index].total = updatedRows[index].gstCalculate * 0; // Update total based on quantity
      setProductRows(updatedRows);
      setAddTotal(0);
      setSubTotal(0);
      var totall = 0;
      var subTotall = 0;
      // console.log(i);
      subTotall = subTotal - parseFloat(productRows[index].unitPrice);
      for (var i of productRows) {
        totall = totall + parseFloat(i.total);
      }
      // setAddTotal(addTotal+totall);
      console.log(totall + "i ");
      setAddTotal(totall.toFixed(2));
      console.log(subTotall);
      setSubTotal(subTotall);
      let result = ""; // Initialize result as an empty string
      const units = ["", " lakh", " crore"]; // Units for Indian numbering system
      if (totall >= 10000000) {
        // Check if num is 10 million or more
        console.log("working");
        const crores = Math.floor(totall / 10000000); // crores = 1
        result += toWords(crores) + units[2]; // result = "1 crore"
        totall %= 10000000; // num = 5000000
        setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
      }

      // Handle lakhs
      if (totall >= 100000) {
        // Check if num is 100,000 or more
        const lakhs = Math.floor(totall / 100000); // lakhs = 5
        result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
        totall %= 100000; // num = 0
        setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
        console.log("totall remaining" + totall);
      }
      // Handle thousands and below
      if (totall > 0) {
        // Check if num is greater than 0
        const word = toWords(parseFloat(totall, 10));
        setAmountWords(
          result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
        );
      }
      if (index == 0) {
        setAmountWords("zero");
      }

      console.log(result.trim()); // Output: "1 crore 5 lakh"
    }
  };
  const [alter, setAlter] = useState(0);

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: Date.now(),
        productName: "",
        hsnCode: "",
        gstRate: "",
        unitPrice: "",
        quantity: "",
        total: "",
      },
    ]);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      challandate: "",
      customerNumber: "",

      billing_address: "",
      references: "",
      shipping_address: "",

      subTotal: 0,
      totalAmount: 0,

      challanNotes: "",
      signature_box: "",
      productdetail: [{}],
    },
    onSubmit: (values) => {
      values.challandate = dt;

      values.billing_address = billing;
      values.sNo = 1;
      values.shipping_address = ship;
      values.productdetail = productRows;
      values.subTotal = subTotal;
      values.totalAmount = addTotal;

      alert(JSON.stringify(values));

      const addChallanData = async () => {
        try {
          const token = localStorage.getItem("token");
          // const res = await axios.post(
          //   `http://localhost:5003/api/challan/submit`,
          //   values,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );
          // const res=await apiPostChallandata("challan/submit",values,token)
          const res=await apiPost("/challan/submit",values)
          alert(JSON.stringify(values));
          navigate("/challan");
        } catch (err) {
          console.log(err);
        }
      };
      addChallanData();
    },
  });
  const [ship, setShip] = useState("");
  function handleCheck(e) {
    if (e.target.checked) {
      console.log("checked");
      console.log(billing);
      setShip(billing);
    } else {
      setShip("");
    }
  }
  return (
    <div
      className="flex justify-center"
      style={{ overflow: "scroll", height: "99vh" }}
    >
      <div className="py-6">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md ">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
            Challan Form
          </h2>

          <NavLink to="/challan" className="text-white text-decoration-none">
            <ButtonComponent
              type="button"
              className="btn btn-primary float-end"
              value="close"
              label="Close"
            ></ButtonComponent>
          </NavLink>
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="ChallanDate"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Challan Date:"
                  onBlur={handleDateBlur}
                  onChange={handleKeyUp}
                  onFocus={handleFoucus}
                  type="text"
                  name="challanDate"
                  placeholder="date.month.year"
                  value={dt}
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
              <div>
                <InputComponent
                  labelName="CustomerNumber"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Contact_Number"
                  onChange={formik.handleChange}
                  type="number"
                  onKeyUp={handleApiCall}
                  name="customerNumber"
                  placeholder="Enter Customer number"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="customerName"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Name"
                  {...(name != "" ? { value: name } : {})}
                  onChange={formik.handleChange}
                  type="text"
                  name="customerName"
                  placeholder="Enter Customer name"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>

              <div>
                <InputComponent
                  labelName="refrence"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Reference"
                  onChange={formik.handleChange}
                  type="text"
                  name="references"
                  placeholder="Enter Reference details"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
            </div>
            <div>
              <label
                htmlFor="billing_address"
                className="block mb-2 font-semibold text-gray-700"
              >
                Additional Information's:
              </label>
              <textarea
                name="billing-address"
                readOnly
                value={
                  "Customer Email:" +
                  email +
                  "\n" +
                  "billing_address:" +
                  billing
                }
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                id=""
              ></textarea>
              <div className="">
                <label
                  htmlFor="shipping_address"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Shipping Address:
                </label>
                <span className="text-primary">
                  What Shipping address to be same?{" "}
                </span>
                <input
                  onChange={handleCheck}
                  type="checkbox"
                  className="mb-3 form-check-input bg-primary"
                />
                <textarea
                  name="shipping_add1"
                  onChange={formik.handleChange}
                  required
                  {...(ship != "" ? { value: ship } : {})}
                  className="mb-4 form-control"
                  id=""
                ></textarea>
              </div>
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-10 p-3 text-gray-700">S.No.</th>
                    <th className="p-3 text-left text-gray-700 w-30">
                      Product
                    </th>
                    <th className="w-20 p-3 text-gray-700">HSN Code</th>
                    <th className="w-20 p-3 text-gray-700">GST Rate</th>

                    <th className="w-20 p-3 text-gray-700">Unit Price</th>
                    <th className="w-20 p-3 text-gray-700">Qty</th>
                    <th className="w-20 p-3 text-gray-700">GST</th>
                    <th className="w-20 p-3 text-gray-700">Discount (%)</th>
                    <th className="w-20 p-3 text-gray-700">Total</th>
                    <th className="p-3 text-left text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="sNo"
                          value={index + 1}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        ></InputComponent>
                      </td>
                      <td>
                        <select
                          name="productdetail"
                          className="form-select"
                          onChange={(e) =>
                            handleProductChange(index, e.target.value)
                          }
                          value={row.productName}
                        >
                          <option value="">Select</option>
                          {products.map((product) => (
                            <option
                              key={product.product_name}
                              value={product.product_name}
                            >
                              {product.product_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="text"
                          name="HSNCode"
                          value={row.hsnCode}
                          min="0"
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="GSTRate"
                          min="0"
                          readOnly
                          value={row.gstCalculate}
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="unitPrice"
                          value={row.unitPrice}
                          min="0"
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="quantity"
                          onBlur={(e) =>
                            handleQuantityChange(
                              index,
                              e.target.value,
                              "qtyChange"
                            )
                          }
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Quantity"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="GST"
                          min="0"
                          readOnly
                          value={row.gstRate}
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="GST"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="Discount"
                          min="0"
                          value="0"
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Discount"
                        ></InputComponent>
                      </td>
                      <td>
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="totalPrice"
                          value={row.total}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        ></InputComponent>
                      </td>
                      <td>
                        <ButtonComponent
                          type="button"
                          className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                          // label="Remove"
                          value="remove"
                          children={<span><DeleteForever/></span>}
                          onClick={() => {
                            const updatedRows = productRows.filter(
                              (_, i) => i !== index
                            );
                            console.log(index);
                            const qtyGet = productRows[index].quantity;
                            console.log(qtyGet);
                            handleQuantityChange(index, qtyGet, "remove");
                            setProductRows(updatedRows);
                          }}
                        ></ButtonComponent>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ButtonComponent
                type="button"
                value="button"
                label="Add Product"
                onClick={handleAddProductRow}
                className="px-8 mt-2 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
              ></ButtonComponent>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="subTotal"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Subtotal:"
                  onChange={formik.handleChange}
                  type="number"
                  name="subTotal"
                  placeholder="Subtotal"
                  readOnly
                  value={subTotal}
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
              <div>
                <InputComponent
                  labelName="totalAmount"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Total Amount:"
                  onChange={formik.handleChange}
                  type="number"
                  name="totalAmount"
                  placeholder="Total Amount"
                  readOnly
                  value={addTotal}
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
              <div>
                <InputComponent
                  labelName="Amountinwords"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Amount in Words:"
                  onChange={formik.handleChange}
                  type="text"
                  name="Amountinwords"
                  placeholder="Amount in words display"
                  readOnly
                  value={AmountWords}
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="challanNotes"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Notes:
                </label>
                <textarea
                  id="invoiceNotes"
                  name="challanNotes"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Any additional notes..."
                  onChange={formik.handleChange}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="signature_box"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Signature Box:
                </label>
                <textarea
                  id="signature_box"
                  name="signature_box"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                type="submit"
                value="submit"
                label="Generate Challan"
                className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
              ></ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
