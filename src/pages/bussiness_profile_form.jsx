import { useFormik } from 'formik';
import React, { useState } from 'react';
import { InputComponent } from '../components/input';
import { NavLink } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';
import { apiPost } from '../services/api';

export function Bussiness_profile_from() {
    const [customFields, setCustomFields] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            pan: '',
            gst: '',
            businessType: '',
            businessCategory: '',
            openingValue: '',
            billingAddress: '',
            shippingAddress: '',
            city: '',
            state: '',
            zipCode: '',
            notes: '',
            birthdate: '',
            anniversary: '',
            personalNotes: ''
        },
        onSubmit: (values) => {
            if(shipping!="")
            {
                values.shippingAddress=shipping
            }
            const addBussinessProfile=async()=>{
                        const res=apiPost("/business_profile",values);
                        alert(res);
            }
            addBussinessProfile();
            alert(JSON.stringify(values))
            console.log(values);
        }
    });

    const addCustomField = () => {
        setCustomFields([...customFields, '']);
    };

    const handleCustomFieldChange = (index, value) => {
        const updatedFields = [...customFields];
        updatedFields[index] = value;
        setCustomFields(updatedFields);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [shipping,setShipping]=useState("");
    function handleCheck(e){
            if(e.target.checked)
            {
                var bill=document.getElementById("bill");
                console.log(bill.value);
                setShipping(bill.value);
            }
            else{
                setShipping("");
            }
    }

    return (
        <div className="bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-center mb-6">Business Profile Form</h2>
                <NavLink to="/bussiness-profile" className="text-white text-decoration-none">
            <ButtonComponent
              type="button"
              className="btn btn-primary float-end"
              value="close"
              label="Close"
            ></ButtonComponent>
          </NavLink>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <InputComponent
                            labelName="name"
                            labelInput="Name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="phone"
                            labelInput="Phone No."
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="email"
                            labelInput="Email"
                            type="email"
                            name="email"
                            placeholder="Enter Email Id"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="pan"
                            labelInput="Pan No."
                            type="text"
                            name="pan"
                            placeholder="Enter Pan No."
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.pan}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="gst"
                            labelInput="GST"
                            type="text"
                            name="gst"
                            placeholder="Enter GST"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.gst}
                        />
                        </div>
                        <div>
                        <div>
                            <label className="block text-gray-600">Business Type</label>
                            <select
                                name="businessType"
                                className="w-full p-2 border rounded mt-1"
                                onChange={formik.handleChange}
                                value={formik.values.businessType}
                            >
                                <option value="">Select</option>
                                <option>Proprietor</option>
                                <option>Partner</option>
                                <option>LLP</option>
                                <option>Pvt.Ltd</option>
                                <option>HUF</option>
                            </select>
                        </div>
                        </div>
                        <div>
                        <div>
                            <label className="block text-gray-600">Business Category</label>
                            <select
                                name="businessCategory"
                                className="w-full p-2 border rounded mt-1"
                                onChange={formik.handleChange}
                                value={formik.values.businessCategory}
                            >
                                <option value="">Select</option>
                                <option>Retail</option>
                                <option>Wholesale</option>
                                <option>IT Field</option>
                                <option>Service Industry</option>
                            </select>
                        </div>
                        </div>
                        <div>
                        <InputComponent
                            labelName="openingValue"
                            labelInput="Opening Value"
                            type="number"
                            name="openingValue"
                            placeholder="Enter Opening Value"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.openingValue}
                        />
                        </div>
                        <div>
                        <InputComponent
                            id="bill"
                            labelName="billingAddress"
                            labelInput="Billing Address"
                            type="textarea"
                            name="billingAddress"
                            placeholder="Billing Address"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.billingAddress}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="shippingAddress"
                            labelInput="Shipping Address"
                            type="textarea"
                            name="shippingAddress"
                            placeholder="Shipping Address"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            // value={formik.values.shippingAddress}
                            {...(shipping!=""?{value:shipping}:{})}
                        />
                        </div>
                        <div>
                        <div className="col-span-2 flex items-center">
                            <input type="checkbox" onChange={handleCheck} className="mr-2 accent-[#3A5B76]" />
                            <span className='ms-2'>Same as Billing Address</span>
                        </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div>
                        <InputComponent
                            labelName="city"
                            labelInput="City"
                            type="text"
                            name="city"
                            placeholder="Enter Your City"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="state"
                            labelInput="State"
                            type="text"
                            name="state"
                            placeholder="Enter Your State"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="zipCode"
                            labelInput="ZIP Code"
                            type="text"
                            name="zipCode"
                            placeholder="Enter Your Zip Code"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.zipCode}
                        />
                        </div>
                        <div>
                        <InputComponent
                            labelName="country"
                            labelInput="Country"
                            type="text"
                            name="country"
                            value="India"
                            readOnly
                            classNameInput="w-full p-2 border rounded mt-1"
                        />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-gray-600">Business Logo</label>
                        <div>
                        <input
                            type="file"
                            id="logoUpload"
                            accept="image/*"
                            className="p-1 border rounded mt-1"
                            onChange={handleLogoChange}
                        />
                        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-cover border rounded mt-2" />}
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-gray-600">Custom Fields</label>
                        <div id="custom-fields">
                            {customFields.map((field, index) => (
                                <InputComponent
                                    key={index}
                                    labelName={`customField${index}`}
                                    labelInput={`Custom Field ${index + 1}`}
                                    type="text"
                                    name={`customField${index}`}
                                    placeholder="Enter Custom Field"
                                    classNameInput="w-full p-2 border rounded mt-2"
                                    onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                                    value={field}
                                />
                            ))}
                        </div>
                        <button onClick={addCustomField} type="button" className="mt-4 px-10 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
                            + Add Field
                        </button>
                    </div>

                    <div className="mt-6">
                        <label className="block text-gray-600">Notes</label>
                        <textarea
                            name="notes"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter Notes"
                            onChange={formik.handleChange}
                            value={formik.values.notes}
                        ></textarea>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <InputComponent
                                labelName="birthdate"
                                labelInput="Birthdate"
                                type="date"
                                name="birthdate"
                                classNameInput="w-full p-2 border rounded mt-1"
                                onChange={formik.handleChange}
                                value={formik.values.birthdate}
                            />
                            </div>
                            <div>
                            <InputComponent
                                labelName="anniversary"
                                labelInput="Anniversary"
                                type="date"
                                name="anniversary"
                                classNameInput="w-full p-2 border rounded mt-1"
                                onChange={formik.handleChange}
                                value={formik.values.anniversary}
                            />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-600">Personal Notes</label>
                            <textarea
                                name="personalNotes"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter Personal Notes"
                                onChange={formik.handleChange}
                                value={formik.values.personalNotes}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <button type="submit" className="px-10 md:px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}