import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DeleteForever } from '@mui/icons-material';
import { ButtonComponent } from '../components/Button';
import { InputComponent } from '../components/input';
import { apiGet } from '../services/api';
import { Loader } from '../layouts/Loader';
import { toWords } from 'number-to-words';

export function ChallanPreview() {
  const [challanPreview, setChallanPreview] = useState([]);
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [taxable_rate, setTaxable_rate] = useState(0);
  const [gst_amount, set_gst_amount] = useState(0);
  const [total_amount, set_Total_amount] = useState(0);
  const [amount_to_words, setAmountWords] = useState("");

  useEffect(() => {
    const number = location.state?.data?.mob_number; // Use optional chaining
    const id = location.state?.data?.challan_id; // Use optional chaining

    const fetchChallan = async () => {
      if (number && id) {
        const res1 = await apiGet(`challandetails/provide/${number}/${id}`);
        console.log(res1);
        setChallanPreview(res1);
        fetchAmountToWord(res1[0][0].total_amount)
      }
    };
    fetchChallan();
  }, [location.state]);

  // Check if challanPreview has data before rendering
  if (!challanPreview.length) {
    return <Loader />;
  }

  // Assuming the first element contains the necessary data
  const challanData = challanPreview[0][0];
  function fetchAmountToWord(totall){
                  console.log(totall);
                  console.log("i am totall")
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
                  
              }

  return (
    <div className="flex justify-center" style={{ overflow: "scroll", height: "99vh" }}>
      <div className="py-6">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
            Challan Preview
          </h2>

          <NavLink to="/challan" className="text-white text-decoration-none">
            <ButtonComponent
              type="button"
              className="btn btn-primary float-end"
              value="close"
              label="Close"
            />
          </NavLink>
          <form className="">
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="ChallanDate"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Challan Date:"
                  type="text"
                  name="challanDate"
                  placeholder="date.month.year"
                  readOnly
                  value={challanData?.challan_date || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="CustomerNumber"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Contact_Number"
                  type="number"
                  name="customerNumber"
                  placeholder="Enter Customer number"
                  required
                  value={challanData?.mob_number || ''} // Use optional chaining
                  readOnly
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="customerName"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Name"
                  value={challanData?.customer_name || ''} // Use optional chaining
                  type="text"
                  name="customerName"
                  placeholder="Enter Customer name"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>

              <div>
                <InputComponent
                  labelName="reference"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Reference"
                  type="text"
                  value={challanData?.reference || ''} // Use optional chaining
                  name="references"
                  placeholder="Enter Reference details"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>
            <div>
              <label htmlFor="billing_address" className="block mb-2 font-semibold text-gray-700">
                Additional Information's:
              </label>
              <textarea
                name="billing-address"
                readOnly
                rows="3"
                value={`Customer Email: ${challanData?.email || ''}\nBilling Address: ${challanData?.billing_address || ''}\nShipping Address: ${challanData?.shipping_address || ''}`}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
              />
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-10 p-3 text-gray-700">S.No.</th>
                    <th className="p-3 text-left text-gray-700 w-30">Product</th>
                    <th className="w-20 p-3 text-gray-700">HSN Code</th>
                    <th className="w-20 p-3 text-gray-700">GST Rate</th>
                    <th className="w-20 p-3 text-gray-700">Unit Price</th>
                    <th className="w-20 p-3 text-gray-700">Qty</th>
                    <th className="w-20 p-3 text-gray-700">GST</th>
                    <th className="w-20 p-3 text-gray-700">Discount (%)</th>
                    <th className="w-20 p-3 text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {challanPreview[0].map((row, index) => (
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
                          value={row.quantity}
                          readOnly
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="subTotal"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Subtotal:"
                  type="number"
                  name="subTotal"
                  readOnly
                  value={challanData?.sub_total || ''} // Use optional chaining
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="totalAmount"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Total Amount:"
                  type="number"
                  name="totalAmount"
                  readOnly
                  value={challanData?.total_amount || ''} // Use optional chaining
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
              <div>
                <InputComponent
                  labelName="Amountinwords"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Amount in Words:"
                  type="text"
                  name="Amountinwords"
                  readOnly
                  value={amount_to_words}
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="challanNotes" className="block mb-2 font-semibold text-gray-700">
                  Notes:
                </label>
                <textarea
                  id="invoiceNotes"
                  value={challanData?.notes || ''} // Use optional chaining
                  name="challanNotes"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Any additional notes..."
                />
              </div>

              <div>
                <label htmlFor="signature_box" className="block mb-2 font-semibold text-gray-700">
                  Signature Box:
                </label>
                <textarea
                  id="signature_box"
                  value={challanData?.signature_box || ''} // Use optional chaining
                  name="signature_box"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}