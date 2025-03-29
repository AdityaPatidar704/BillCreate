import React, { useRef } from "react";
// import PrintCustomerDetails from "./printCustomerDeatils";
import "../styles/customerProfile.css";

function CustomerProfile({ customer }) {


  return (
    <div className="customer-profile">
      <h2 className="profile-title">Customer Profile</h2>
      <p className="profile-title">Name: {customer.name}</p>
      <p className="profile-details">Email: {customer.email}</p>
      {/* Add more details as needed */}

      {/* Print Button */}
      {/* <button onClick={handlePrint}>Print</button> */}

      {/* Print Component */}
      {/* <PrintCustomerDetails customer={customer} ref={printRef} /> */}
    </div>
  );
}

export default CustomerProfile;
