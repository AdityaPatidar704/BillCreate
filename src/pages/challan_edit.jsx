import React, { useState, useEffect } from "react";
import axios from "axios";
import { Preview, ModeEdit, DeleteForever } from "@mui/icons-material";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toWords } from "number-to-words";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { ButtonComponent } from "../components/Button";
import { InputComponent } from "../components/input";
import { apiGet, apiPost } from "../services/api";
import { Loader } from "../layouts/Loader";
export function ChallanEdit() {
  const [challanPreview, setChallanPreview] = useState([]);
  const [challanPreview1, setChallanPreview1] = useState([]);
  const [dd, setdd] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [datee, setDatee] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [dt, setDt] = useState("");
  const [show, setShow] = useState("");
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [products, setProducts] = useState([{}]);
  const location = useLocation();
  useEffect(() => {
    setdd(dd.getMonth() + 1 + "/" + dd.getFullYear());
    setMonth(month.getMonth() + 1);
    setDatee(datee.getDate());
    setYear(year.getFullYear());
    setDt(
      datee.getDate() + "/" + (month.getMonth() + 1) + "/" + year.getFullYear()
    );
    console.log(location.state.data);
    const number = location.state?.data?.mob_number; // Use optional chaining
    const id = location.state?.data?.challan_id; // Use optional chaining

    const fetchChallan = async () => {
      if (number && id) {
        const res1 = await apiGet(`challandetails/provide/${number}/${id}`);
        console.log(res1);
        setChallanPreview(res1);
        // setChallanPreview1(res1);
        // setChallanPreview1()
        // fetchAmountToWord(res1[0][0].total_amount)
        setChallanPreview1(res1[0]);
      }
    };
    fetchChallan();
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
        const res = await apiGet("/productdetail/productName");
        setProducts(res);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [location.state]);

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
    setIsClicked(true);
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
        const res = await apiGet(`/invoices/${value}`);
        console.log(res);
        const getName = res[0].customer_name;
        const getEmail = res[0].email;
        const getBilling = res[0].billing_address + " " + res[0].zip_code + " ";
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
        const res = await apiGet("/productdetail/productName");
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
      const res = await apiGet(`/productdetail/all/${productName}`);
      const productDetail = res[0];
      const updatedRows = [...productRows];
      var rate = 100;
      rate = parseInt(res[0].gst_rate) * parseFloat(res[0].purchase_price);
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
    if (getNotify === "qtyChange") {
      const updatedRows = [...challanPreview1];
      updatedRows[index].quantity = quantity;
      updatedRows[index].total_price = (parseFloat(updatedRows[index].unit_price) * quantity * parseFloat(updatedRows[index].tax_rate)) / 100; // Update total based on quantity
      setChallanPreview1(updatedRows);
      recalculateTotals();
    } else if (getNotify === "remove") {
      const updatedRows = [...challanPreview1];
      updatedRows[index].quantity = 0;
      updatedRows[index].unit_price=0;
      updatedRows[index].total_price = 0; // Reset total price
      setChallanPreview1(updatedRows);
      recalculateTotals();
    }
  
    // Recalculate totals and update amount in words
  };
  
  const handleQuantityChange1 = (index, quantity, getNotify) => {
    if (getNotify === "qtyChange") {
      const updatedRows = [...productRows];
      updatedRows[index].quantity = parseInt(quantity);
      updatedRows[index].total = (parseFloat(updatedRows[index].unitPrice) * quantity * parseFloat(updatedRows[index].gstRate)) / 100; // Update total based on quantity
      setProductRows(updatedRows);
      recalculateTotals();
    } else if (getNotify === "remove") {
      const updatedRows = [...productRows];
      updatedRows[index].quantity = 0;
      updatedRows[index].unitPrice=0;
      updatedRows[index].total = 0; // Reset total
      setProductRows(updatedRows);
      recalculateTotals();
    }
  
    // Recalculate totals and update amount in words
    recalculateTotals();
  };
  
  const recalculateTotals = () => {
    let totalChallan = 0;
    let totalProducts = 0;
    let unitPrice=0;
  
    // Calculate total for challanPreview1
    challanPreview1.forEach(item => {
      totalChallan += parseFloat(item.total_price) || 0;
      unitPrice+=parseFloat(item.unit_price)||0;
    });
  
    // Calculate total for productRows
    productRows.forEach(item => {
      totalProducts += parseFloat(item.total) || 0;
      unitPrice += parseFloat(item.unitPrice) || 0;
    });
  
    // Update state
    const grandTotal = totalChallan + totalProducts;
    setAddTotal(grandTotal);
    setSubTotal(unitPrice); // Assuming subTotal is just for productRows
  
    // Convert total amount to words
    const amountInWords = numberToWords(grandTotal).toUpperCase() + " RUPEES ONLY/-";

    setAmountWords(amountInWords);
  
    // Print totals and amount in words to console
    console.log("Total Challan Amount: ", totalChallan);
    console.log("Total Products Amount: ", unitPrice);
    console.log("Grand Total: ", grandTotal);
    console.log("Amount in Words: ", amountInWords);
  };
  const numberToWords = (num) => {
    const units = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
      "seventeen", "eighteen", "nineteen"
    ];
    const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];
    const thousands = ["", "thousand", "lakh", "crore"];
  
    if (num === 0) return "zero";
  
    let words = "";
  
    // Handle crores
    if (num >= 10000000) {
      words += numberToWords(Math.floor(num / 10000000)) + " crore ";
      num %= 10000000;
    }
  
    // Handle lakhs
    if (num >= 100000) {
      words += numberToWords(Math.floor(num / 100000)) + " lakh ";
      num %= 100000;
    }
  
    // Handle thousands
    if (num >= 1000) {
      words += numberToWords(Math.floor(num / 1000)) + " thousand ";
      num %= 1000;
    }
  
    // Handle hundreds
    if (num >= 100) {
      words += units[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }
  
    // Handle tens and units
    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
  
    if (num > 0) {
      words += units[num] + " ";
    }
  
    return words.trim();
  };
  const [alter, setAlter] = useState(0);
  const [pro,setPro]=useState([{}])
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
      customerName:"",
      billing_address: "",
      references: "",
      email_id:"",
      shipping_address: "",

      subTotal: 0,
      totalAmount: 0,

      challanNotes: "",
      signature_box: "",
      productdetail: [],
    },
    onSubmit: (values) => {
      values.productdetail=[];
      if(values.challandate=="")
      {
        values.challandate=challanData.challan_date;
      }
      if(values.customerNumber=="")
        {
          values.customerNumber=challanData.mobile_no;
        }
        if(values.customerName=="")
          {
            values.customerName=challanData.customer_name;
          }
          if(values.references=="")
            {
              values.references=challanData.reference;
            }
            if(values.email_id=="")
              {
                values.email_id=challanData.email;
              }
              if(values.billing_address=="")
                {
                  values.billing_address=challanData.billing_address;
                }
                if(values.shipping_address=="")
                  {
                    values.shipping_address=challanData.shipping_address;
                  }
                  var produ=[];
                  var produ1=[];
                  if(!values.productdetail.length)
                  {
                    var updateA=[];
                    for(var i of challanPreview1)
                    {
                      updateA= [...updateA,{
                            productName:i.product_name,
                            HSNCode:i.product_hsn_code,
                            GSTRate:i.tax_id,
                            unitPrice:i.unit_price,
                            quantity:i.quantity,
                            GST:i.tax_rate,
                            Discount:0,
                            totalPrice:i.total_price
                          }]
                          produ=updateA
                      // setPro((prevPro=>
                      // [...prevPro,
                      //   {
                      //     productName:i.product_name,
                      //     HSNCode:i.product_hsn_code,
                      //     GSTRate:i.tax_id,
                      //     unitPrice:i.unit_price,
                      //     quantity:i.quantity,
                      //     GST:i.tax_rate,
                      //     Discount:0,
                      //     totalPrice:i.total_price
                      //   }
                      // ]
                      // ))
                    }
                    var update2=[];
                    for(var j of productRows)
                    {
                      
                      update2=[...update2,j];
                      produ1=update2;
                    }
                   values.productdetail=[...produ,...produ1]
                    // console.log(JSON.stringify(produ)+JSON.stringify(productRows));
                    // values.productdetail=challanPreview1+productRows
                  }
                  if(values.subTotal=="")
                  {
                    values.subTotal=subTotal
                  }
                  if(values.totalAmount=="")
                    {
                      values.totalAmount=addTotal
                    }
                    if(values.challanNotes=="")
                      {
                        values.challanNotes=challanData.notes
                      }
                      if(values.signature_box=="")
                        {
                          values.signature_box=challanData.signature_box
                        }
     alert(JSON.stringify(values))
  }
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
  if (!challanPreview.length) {
    return <Loader></Loader>;
  }
  const challanData = challanPreview[0][0];
  function handleClick(e) {
    setIsClicked(true);
    console.log(challanData);
    console.log("true");
    console.log(challanPreview1);
    console.log("i am");
  }
  return (
    <div
      className="flex justify-center"
      style={{ overflow: "scroll", height: "99vh" }}
    >
      <div className="py-6">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md ">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
            Challan Edit
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
                  //   onFocus={handleClick}
                  onBlur={handleDateBlur}
                  {...(isClicked
                    ? { value: dt }
                    : { value: challanData.challan_date })}
                  onChange={handleKeyUp}
                  onFocus={handleFoucus}
                  type="text"
                  name="challanDate"
                  placeholder="date.month.year"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
              <div>
                <InputComponent
                  labelName="CustomerNumber"
                  {...(isClicked ? {} : { value: challanData.mobile_no })}
                  onFocus={handleClick}
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
                  {...(isClicked ? {} : { value: challanData.customer_name })}
                  onFocus={handleClick}
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
                  {...(isClicked ? {} : { value: challanData.reference })}
                  onFocus={handleClick}
                  type="text"
                  name="references"
                  placeholder="Enter Reference details"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
              <div>
                <InputComponent
                  labelName="email_id"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Email Id"
                  onChange={formik.handleChange}
                  {...(isClicked ? {} : { value: challanData.email })}
                  onFocus={handleClick}
                  type="text"
                  name="email_id"
                  placeholder="Enter email id"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
              <div>
                <InputComponent
                  labelName="billing_address"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Billing Address"
                  onChange={formik.handleChange}
                  {...(isClicked ? {} : { value: challanData.billing_address })}
                  onFocus={handleClick}
                  type="text"
                  name="billing_address"
                  placeholder="Enter email id"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                ></InputComponent>
              </div>
            </div>
            <div>
              {/* <label
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
              ></textarea> */}
              <div className="">
                <label
                  htmlFor="shipping_address"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Shipping Address:
                </label>
                <textarea
                  {...(isClicked
                    ? {}
                    : { value: challanData.shipping_address })}
                  onFocus={handleClick}
                  name="shipping_address"
                  onChange={formik.handleChange}
                  required
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
                  {
                    challanPreview1.length>0?(
                      challanPreview1.map((row, index) => (
                        <tr key={row.id}>
                          <td>
                            <InputComponent
                              type="number"
                              name="sNo"
                              value={index + 1}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="text"
                              name="product_name"
                              value={row.product_name}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="text"
                              name="HSNCode"
                              value={row.product_hsn_code}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="text"
                              name="GSTRate"
                              value={row.tax_id}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="number"
                              name="unitPrice"
                              value={row.unit_price}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="number"
                              name="quantity"
                              onFocus={handleClick}
                              onBlur={(e) =>
                                handleQuantityChange(
                                  index,
                                  e.target.value,
                                  "qtyChange"
                                )
                              }
                              {...(isClicked)?{}:{value:row.quantity}}
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                              placeholder="Quantity"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="number"
                              name="GST"
                              value={row.tax_rate}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="number"
                              name="Discount"
                              value="0"
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                              placeholder="Discount"
                            />
                          </td>
                          <td>
                            <InputComponent
                              type="number"
                              name="totalPrice"
                              value={row.total_price}
                              readOnly
                              classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            />
                          </td>
                          <td>
                            <ButtonComponent
                              type="button"
                              className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                              // label="Remove"
                              value="remove"
                              children={
                                <span>
                                  <DeleteForever />
                                </span>
                              }
                              onClick={() => {
                                const updatedRows = challanPreview1.filter(
                                  (_, i) => i !== index
                                );
                                console.log(index);
                                const qtyGet = challanPreview1[index].quantity;
                                console.log(qtyGet);
                                handleQuantityChange(index, qtyGet, "remove");
                                setChallanPreview1(updatedRows);
                              }}
                            ></ButtonComponent>
                          </td>
                        </tr>
                      ))
                    ):(
                      <></>
                    )
                  }
                  {productRows.map((row, index) => (
                                      <tr key={row.id}>
                                        <td>
                                          <InputComponent
                                            onChange={formik.handleChange}
                                            type="number"
                                            name="sNo"
                                            value={index +1+challanPreview1.length}
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
                                              handleQuantityChange1(
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
                                              handleQuantityChange1(index, qtyGet, "remove");
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
                  // value={subTotal}
                  {...(subTotal!=0?{value:subTotal}:{value:challanPreview1.length>0?(challanData.sub_total):(0)})}
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
                  // value={addTotal}
                  {...(subTotal!=0?{value:addTotal}:{value:challanPreview1.length>0?(challanData.total_amount):(0)})}
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
                  value={challanData.notes}
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
                value={challanData.signature_box}
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
