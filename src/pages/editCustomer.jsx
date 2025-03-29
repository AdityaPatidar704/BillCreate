import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Use existing CSS for consistency


function EditCustomer() {
    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state?.customer; // Retrieve full customer data

    // Define all fields except id
    const [formData, setFormData] = useState({
        email: "",
        company_name: "",
        first_name: "",
        last_name: "",
        phone: "",
        mobile: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        tax_id: "",
        currency: "",
        language: "",
        is_active: false,
        billing_address1: "",
        billing_address2: "",
        billing_city: "",
        billing_state: "",
        billing_zip: "",
        billing_country: ""
    });

    // Populate the form with existing customer details
    useEffect(() => {
        if (customer) {
            const { id, ...editableFields } = customer; // Exclude ID from being editable
            setFormData(editableFields);
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value, // Handle checkboxes
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/customers/${customer.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Customer updated successfully!");
                navigate("/display"); // Redirect back to the customer list
            } else {
                alert("Failed to update customer.");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("An error occurred while updating the customer.");
        }
    };

    return (
        <div className="bodye">
            <div className="container">
                <h1>Edit Customer</h1>
                <form className="form-grid" onSubmit={handleSubmit}>
                    {Object.keys(formData).map((field) => (
                        <div key={field} className="form-group">
                            <label htmlFor={field} className="form-label">
                                {field.replace("_", " ").toUpperCase()}
                            </label>
                            {field === "is_active" ? (
                                <input
                                    type="checkbox"
                                    name={field}
                                    checked={formData[field]}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <div className="button-container">
                        <button type="submit" className="submit_button">
                            Save Changes
                        </button>

                        {/* <ButtonComponent className="submit_button" value="submit" label="Submit"></ButtonComponent> */}
                        <button 
                            type="button" 
                            className="cancel_button" 
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        {/* <ButtonComponent className="cancel_button" onClick="navigate(-1)" value="submit" label="Submit"></ButtonComponent> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCustomer;
