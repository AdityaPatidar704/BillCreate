import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported

import axios from "axios";
import { data, NavLink, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
import { ButtonComponent } from "../components/Button";
import { apiDelete, apiGet } from "../services/api";
import { TableComponent } from "../components/Table";
import { SearchComponent } from "../components/SerachBar";

const Products = () => {
  const column=["UID","Product Name","HSNCode","ProductUnit","ProductRate","GSTRate","QRCode"];
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [total,setTotal]=useState(0)
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchProduct= async()=>{
      const token=localStorage.getItem("token");
      try{
      //   const res= await axios.get("http://localhost:5003/api/products",{
      //   headers:{
      //     Authorization: `Bearer ${localStorage.getItem("token")}`
      //   }
      // })
      // const res=await apiGetProductData("products",token);
      const res=await apiGet("/products");
      console.log(res);
      setProductList(res);
      setTotal(res.length);
    }
    catch(err){
          console.log(err);
    }
  }
   fetchProduct();
  },[])

  // Filter products based on search input
  const filteredProducts = productList.filter((product) =>
    ` ${product.product_name} ${product.product_id} ${product.product_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const tableData=filteredProducts.map(value=>({
    product_id:value.product_id,
    product_name:value.product_name,
    product_hsn_code:value.product_hsn_code,
    unit_price:value.product_unit,
    purchase_price:value.purchase_price,
    tax_rate:value.gst_rate,
}))
  const handleEdit=(e,product_id)=>{
    alert(product_id);
    for(var i of filteredProducts)
    {
      if(i.product_id==product_id)
      {
        console.log(i);
        console.log("i am match");
        navigate("/product_detail_edit",{state:{data:i}})
      }
    }
  }
  const handlePreview=(e,product_id)=>{
    alert(product_id);
    for(var i of filteredProducts)
    {
      if(i.product_id==product_id)
      {
        console.log(i);
        console.log("i am match");
        navigate("/product_detail_display",{state:{data:i}});
      }
    }
  }
  const handledelete=(e,product_id)=>{
    alert(product_id);
    for(var i of filteredProducts)
    {
      if(i.product_id==product_id)
      {
        console.log(i);
        console.log("i am match");
        const deleteProduct=async ()=>{
            const res=await apiDelete(`products/${i.product_id}`)
            alert(res);
        }
        deleteProduct();
        window.location.reload();
      }
    }
  }
  return (
    <div className="">
      <Sidebar />
        {/* <a href="/add-product">
          <button className="add-customer-button">Add Product</button>
        </a> */}
      <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Product Details
            <span className="bg-blue-400 ms-2 text-white px-3 py-1 rounded-full text-sm">
              Total {total}
            </span>
          </h2>
          {/* <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        /> */}
        <SearchComponent onChange={(e) => setSearch(e.target.value)}/>
          <div className="flex space-x-3">
            <button className="bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]">
              Bulk Upload 
            </button>
            <NavLink to="/add-product">
        <ButtonComponent className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]" label="Add Product" value="addProduct"></ButtonComponent>
        </NavLink>
          </div>
        </div>
      {/* <TableComponent column={column} data={tableData}/> */}
      <TableComponent
        column={column}
        data={tableData}
        name="product"
        fullData={filteredProducts}
        pageSize={3} // Number of rows per page
        generateQr="true"
        actions={(row) => (
          <div className="flex gap-2">
            <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,row.product_id)}><Preview/></button>
                  <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,row.product_id)}><ModeEdit/></button>
                  <button className="text-red-500" onClick={(e) =>handledelete(e,row.product_id)}><DeleteForever/></button>
          </div>
        )}
      />
      </div>
      </div>
  );
};

export default Products;

// import React, { useState } from "react";
// import Sidebar from "../container/Sidebar";
// import "./Products.css"; // Import the CSS file

// const Products = () => {
//   const [search, setSearch] = useState("");

//   // Static product data
//   const productList = [
//     {
//       id: 1,
//       product_name: "Laptop",
//       product_id: "P001",
//       product_code: "LP100",
//       hsn_sac_code: "84713010",
//       product_description: "High-performance laptop",
//       product_type: "Electronics",
//       unit_price: "$1000",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 2,
//       product_name: "Smartphone",
//       product_id: "P002",
//       product_code: "SP200",
//       hsn_sac_code: "85171290",
//       product_description: "Latest 5G smartphone",
//       product_type: "Electronics",
//       unit_price: "$700",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 3,
//       product_name: "Office Chair",
//       product_id: "P003",
//       product_code: "OC300",
//       hsn_sac_code: "94013000",
//       product_description: "Ergonomic office chair",
//       product_type: "Furniture",
//       unit_price: "$150",
//       tax_rate: "12%",
//       currency: "USD",
//     },
//     {
//       id: 4,
//       product_name: "Bluetooth Speaker",
//       product_id: "P004",
//       product_code: "BS400",
//       hsn_sac_code: "85182200",
//       product_description: "Portable wireless speaker",
//       product_type: "Electronics",
//       unit_price: "$50",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//   ];

//   // Filter products based on search input
//   const filteredProducts = productList.filter((product) =>
//     `${product.product_name} ${product.product_id} ${product.product_code} ${product.product_description}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="gop">
//       <Sidebar />
//       <div className="header-topper">
//         <h1 className="gopa">Products</h1>
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-bar"
//         />
//         <a href="/add-product">
//           <button className="add-customer-button">Add Product</button>
//         </a>
//       </div>

//       <table className="customer-table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Product ID</th>
//             <th>Product Code</th>
//             <th>HSN/SAC Code</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Unit Price</th>
//             <th>Tax Rate</th>
//             <th>Currency</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.product_name}</td>
//                 <td>{product.product_id}</td>
//                 <td>{product.product_code}</td>
//                 <td>{product.hsn_sac_code}</td>
//                 <td>{product.product_description}</td>
//                 <td>{product.product_type}</td>
//                 <td>{product.unit_price}</td>
//                 <td>{product.tax_rate}</td>
//                 <td>{product.currency}</td>
//                 <td>
//                   <button id="btn">Edit</button>
//                   <button id="buton">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Products;
