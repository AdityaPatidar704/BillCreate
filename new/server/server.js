import express from "express";
import cors from "cors";
import pkg from "body-parser"; // Import the entire body-parser module
const { json } = pkg; // Destructure the json function from the imported module
import pg from "pg";
import bcrypt from "bcryptjs"; // Import the entire bcryptjs module
import jwt from "jsonwebtoken"; // Import the entire jsonwebtoken module

const { Pool } = pg; // Destructure Pool from the pg module
const { hash, compare } = bcrypt; // Destructure hash and compare from bcrypt
const { sign, verify } = jwt; 

const app = express();
const PORT = 5003;
const SECRET_KEY = "your_secret_key"; // Change this to a secure key
// Handle Preflight request (OPTIONS method)
app.options("/api/signup", cors());//ye mene joda h

app.use(json());
app.use(  
  cors({
    origin: [ "http://localhost:5173","https://adityapatidar704.github.io"], // ✅ Add both frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorzation"], // Allowed headers
    credentials: true, // Allow credentials like cookies or auth tokens
  })
);


// PostgreSQL database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Customer_Module",
  password: "1234",
  port: 5432,
});



pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

/* ========== User Authentication ========== */

// ✅ Signup (Register)
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING userid, name, email",
      [username, email, hashedPassword]
    );

    res.status(201).json({ success: true, message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Error registering user", error: error.message });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = sign({ userId: user.rows[0].id }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

// ✅ Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const verified = verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

/* ========== Customer Management (Protected Routes) ========== */

// ✅ Get All Customers (Protected)
// app.get("/api/customers", authenticateToken, async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT customer_id, first_name, last_name, email, company_name, phone FROM customers"
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch customers" });
//   }
// });

// ✅ Add a Customer (Protected)
// app.post("/api/customers", authenticateToken, async (req, res) => {
//   const {
//     email, company_name, first_name, last_name, phone, mobile, address1, address2, city, state, zip_code, country, tax_id, fax, currency, language, is_active,billing_address1,billing_address2,billing_city,billing_state,billing_zip,billing_country
//   } = req.body;

//   if (!email || !company_name || !first_name || !last_name || !phone) {
//     return res.status(400).json({ success: false, message: "Missing required fields" });
//   }

//   try {
//     const result = await pool.query(
//       `INSERT INTO customers (email, company_name, first_name, last_name, phone, mobile_no, address1, address2, city, state, zip_code, country , tax_id, fax, currency, language, is_active,billing_address1,billing_address2,billing_city,billing_state,billing_zip,billing_country) 
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING customer_id`,
//       [email, company_name, first_name, last_name, phone, mobile, address1, address2, city, state, zip_code, country, tax_id, fax, currency, language, is_active,billing_address1,billing_address2,billing_city,billing_state,billing_zip,billing_country]
//     );

//     res.status(201).json({ success: true, message: "Customer added successfully", id: result.rows[0].id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to add customer" });
//   }
// });

// ✅ Update Customer (Protected)
app.put("/api/customers/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { company_name, first_name, last_name, email, phone } = req.body;

  try {
    const result = await pool.query(
      "UPDATE customers SET company_name = $1, first_name = $2, last_name = $3, email = $4, phone = $5 WHERE id = $6 RETURNING *",
      [company_name, first_name, last_name, email, phone, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    res.json({ success: true, message: "Customer updated successfully", customer: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update customer" });
  }
});

// ✅ Delete Customer (Protected)
// app.delete("/api/customers/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query("DELETE FROM customers WHERE id = $1", [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }

//     res.json({ success: true, message: "Customer deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to delete customer" });
//   }
// });

/* ========== Product Management ========== */

// ✅ Get All Products
// app.get("/api/products", authenticateToken, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch products" });
//   }
// });

// ✅ Add a Product
// app.post("/products/add", async (req, res) => {
//   try { 
//     const { product_name,  product_code, hsn_sac_code, product_description, product_type, unit_price, tax_rate, currency } = req.body;
    
//     const newProduct = await pool.query(
//       "INSERT INTO products (product_name, product_code, product_hsn_code, product_description, product_type, unit_price, tax_rate, currency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
//       [product_name, product_code, hsn_sac_code, product_description, product_type, unit_price, tax_rate, currency]
//     );

//     res.json(newProduct.rows[0]);
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(500).send("Server error");
//   }
// });

// ✅ Update a Product
// app.put("/api/products/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const {
//     product_name, product_code, hsn_sac_code, product_description, 
//     product_type, unit_price, tax_rate, currency
//   } = req.body;

//   try {
//     const result = await pool.query(
//       `UPDATE products SET 
//        product_name = $1, product_code = $2, hsn_sac_code = $3, product_description = $4, 
//        product_type = $5, unit_price = $6, tax_rate = $7, currency = $8 
//        WHERE id = $9 RETURNING *`,
//       [product_name, product_code, hsn_sac_code, product_description, 
//        product_type, unit_price, tax_rate, currency, id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Product updated successfully", product: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to update product" });
//   }
// });

// ✅ Delete a Product
// app.delete("/api/products/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to delete product" });
//   }
// });

//providing customer details for invoice 
app.get('/api/invoices/:customerNumber',authenticateToken, async(req,res)=>{
  const customerNumber=req.params.customerNumber;
  try{
     const customerdetails= await pool.query(`select * from customers where mobile_no =$1`,[customerNumber]);
     if(customerdetails.rowCount===0){
      console.log('Customer is not available');
     }
     res.json(customerdetails.rows);
  }
  catch(error){
   console.log(error);
   res.status(501).json({success:false,message:"Invailid customer"});
  }
});

app.get('/api/productdetail/productName',authenticateToken, async(req,res)=>{
  try{
   const productdetails= await pool.query("select product_name from products");
   if(productdetails.rowCount===0){
    console.log('No Products available');
   }
   res.json(productdetails.rows);
   console.log(productdetails.rows);
  }
  catch(error){
    console.log(error);
    res.status(502).json({success:false,message:"server error for product"})
  }
}) ;
app.get('/api/productdetail/all/:productName',authenticateToken, async(req,res)=>{
  const productName=req.params.productName;
  try{
     const productdetails=await pool.query(`select * from products where product_name=$1`,[productName]);
     if(productdetails.rowCount===0){
       console.log("Product is not available");
     }
     console.log(productdetails.rows);
     res.json(productdetails.rows);
  }
  catch(error){
   console.log(error);
   res.status(503).json({success:false,message:" server error"});
  }
 });

 ////////////////////

 app.post('/api/invoices/submit', authenticateToken, async (req, res) => {
  const {
      invoiceDate, //
      customerNumber, //
      billing_address, //
      shipping_address,
      references,
      subTotal,
      totalAmount,
      invoiceNotes,
      signature_box,
      productdetail
  } = req.body;
  console.log(req.body);
  const tax_amount = totalAmount - subTotal;

  try {
      const newInvoice = await pool.query(`
          INSERT INTO invoices (
              invoice_date,customer_id,mob_number,billing_address,shipping_address,reference,sub_total,total_amount,tax_amount,invoicenotes,signature_box)
             VALUES ( $1,(SELECT customer_id FROM customers WHERE mobile_no = $2),$2,$3,$4,$5,$6,$7,$8,$9,$10)
           RETURNING invoice_id`
     , [invoiceDate,customerNumber,billing_address,shipping_address, references, subTotal,totalAmount,tax_amount,invoiceNotes,signature_box]);
        const invoice_id=newInvoice.rows[0].invoice_id;
    
        for(const item of productdetail){
          const{productName,hsnCode,gstRate,unitPrice,quantity,total}=item;
          console.log(item);
      
      const newinvoice_item = await pool.query(`
        INSERT INTO invoice_item (invoice_id, product_id,  product_name,  product_hsn_code,  unit_price,  tax_rate,  quantity,  total_price)
         VALUES (  $1, (SELECT product_id FROM products WHERE product_hsn_code = $2 LIMIT 1),$3,$2,$4,$5,$6,$7)`,
     [invoice_id, hsnCode, productName, unitPrice, gstRate, quantity, total]);
        }
      res.status(201).json({ success: true, message: "Invoice added successfully"});
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});
app.post('/api/challan/submit', authenticateToken, async (req, res) => {
  const {
      challandate,
      customerNumber,
      billing_address,
      shipping_address,
      references,
      subTotal,
      totalAmount,
      challanNotes,
      signature_box,
      productdetail
  } = req.body;

  const tax_amount = totalAmount - subTotal;

  try {
      const newchallan = await pool.query(`
          INSERT INTO challan (
              challan_date,customer_id,mob_number,billing_address,shipping_address,reference,sub_total,total_amount,tax_amount,challannotes,signature_box)
             VALUES ( $1,(SELECT customer_id FROM customers WHERE mobile_no = $2),$2,$3,$4,$5,$6,$7,$8,$9,$10)
           RETURNING challan_id`
     , [challandate,customerNumber,billing_address,shipping_address, references, subTotal,totalAmount,tax_amount,challanNotes,signature_box]);
        const challan_id=newchallan.rows[0].challan_id;
    
        for(const item of productdetail){
          const{productName,hsnCode,gstRate,unitPrice,quantity,total}=item;
          // console.log(item);
      
      const newinvoice_item = await pool.query(`
        INSERT INTO challan_item (challan_id, product_id,  product_name,  product_hsn_code,  unit_price,  tax_rate,  quantity,  total_price)
         VALUES (  $1, (SELECT product_id FROM products WHERE product_name = $3 LIMIT 1),$3,$2,$4,$5,$6,$7)`,
     [challan_id, hsnCode, productName, unitPrice, gstRate, quantity, total]);
        }
      res.status(201).json({ success: true, message: "challan added successfully"});
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});

//get challan details of a customer from customer number
// app.get('/api/challandetails/provideing/:customerNumber',authenticateToken,async(req,res)=>{
// const customerNumber=req.params.customerNumber;
// try{
//   if(!customerNumber){
//     res.status(401).json({message:"required customerNumber "})
//   }
//  const challandetails=await pool.query(`SELECT 
//     c.challan_id,
//     c.challan_date,
//     c.mob_number ,
//     c.billing_address,
//     c.shipping_address,
//     c.sub_total,
//     c.tax_amount,
//     c.total_amount,
//     c.reference,
//     c.challannotes,
//     c.signature_box
// FROM 
//     public.challan c
// JOIN 
//     public.customers cu ON c.customer_id = cu.customer_id
// WHERE 
//     cu.mobile_no =$1;`,[customerNumber]);
//     if(challandetails.rowCount===0){
//       res.status(401).json({success:false,message:"challan not available"})
//     }
//     console.log(challandetails.rows)
//    res.json(challandetails.rows); 
// }
// catch(error){
//   console.log(error);
//   res.status(401).json({success:false ,message:"server Error"})
// }
// });
app.get('/api/challandetails/provideing',authenticateToken,async(req,res)=>{
  try{
   const challandetails=await pool.query(`SELECT * from challan `);
      if(challandetails.rowCount===0){
        res.status(401).json({success:false,message:"challan not available"})
      }
      console.log(challandetails.rows)
     res.json(challandetails.rows); 
  }
  catch(error){
    console.log(error);
    res.status(401).json({success:false ,message:"server Error"})
  }
  });
  
app.get('/api/invoices/invoicesdetails/:customerNumber',authenticateToken,async(req,res)=>{
  const customerNumber=req.params.customerNumber;
  try{
    if(!customerNumber){
      res.status(401).json({message:"required customerNumber "})
    }
   const invoicedetails=await pool.query(`SELECT 
    c.invoice_id,
    c.invoice_date,
    c.mob_number ,
    c.billing_address,
    c.shipping_address,
    c.sub_total,
    c.tax_amount,
    c.total_amount,
    c.reference,
    c.invoicenotes,
    c.signature_box
FROM 
    public.invoices c
JOIN 
    public.customers cu ON c.customer_id = cu.customer_id
WHERE 
      cu.mobile_no =$1;`,[customerNumber]);
      if(invoicedetails.rowCount===0){
        res.status(401).json({success:false,message:"challan not available"})
      }
      console.log(invoicedetails.rows)
     res.json(invoicedetails.rows); 
  }
  catch(error){
    console.log(error);
    res.status(401).json({success:false ,message:"server Error"})
  }
  });
  // app.get('/api/challandetails/provide/:customerNumber/:challan_id',authenticateToken,async(req,res)=>{
  //   const customerNumber=req.params.customerNumber;
  //   const  challan_id =req.params.challan_id;
  //    if(!customerNumber || !challan_id){
  //     res.json({success:false,message:"requred feilds"});
  //    }
  //    try{
  //     const result= await pool.query(`SELECT 
  //       c.*,
  //       ch.*,
  //       ci.*
  //   FROM 
  //       public.customers c
  //   LEFT JOIN 
  //       public.challan ch ON c.customer_id = ch.customer_id
  //   LEFT JOIN 
  //       public.challan_item ci ON ch.challan_id = ci.challan_id
  //   WHERE 
  //       (  c.mobile_no = $1)
  //       AND (ch.challan_id =$2)`,[customerNumber,challan_id]);
  //       if(result.rowCount===0){
  //         res.status(401).json({success:false,message:"result not available"})
  //       }
  //       console.log(result.rows);
  //       res.json(result.rows);
  //    }
  //    catch(error){
  //     console.log(error);
  //     res.status(401).json({success:false ,message:"server Error"})
  //   }
  //   });
  app.get('/api/challandetails/provide/:customerNumber/:challan_ids', authenticateToken, async (req, res) => {
    const customerNumber = req.params.customerNumber;
    const challan_ids = req.params.challan_ids;
  
    if (!customerNumber || !challan_ids) {
        return res.json({ success: false, message: "required fields" });
    }
    const challanIdArray = challan_ids.split(',').map(id => id.trim());
    try {
        const results = [];
        for (const challanId of challanIdArray) {
            const query = `
                SELECT 
                    c.*,
                    ch.*,
                    ci.*
                FROM 
                    public.customers c
                LEFT JOIN 
                    public.challan ch ON c.customer_id = ch.customer_id
                LEFT JOIN 
                    public.challan_item ci ON ch.challan_id = ci.challan_id
                WHERE 
                    c.mobile_no = $1
                    AND ch.challan_id = $2
            `;
  
            const result = await pool.query(query, [customerNumber, challanId]);
  
            if (result.rowCount > 0) {
                results.push(result.rows);
            }
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "result not available" });
        }
        console.log(results);
        res.json(results); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server Error" });
    }
  });
  app.post("/api/customers", authenticateToken, async (req, res) => {
    const {
      email,customer_name,customer_category, pan_no, mobile_no, customer_type, shipping_address, city, state, zip_code, country, tax_id, is_active, opening_value, party , notes , birth_date , anniversary_date , personal_notes ,billing_address
    } = req.body;
    const userid=req.userId;
    console.log(req.body);
    if (!email || !customer_name || !customer_category || !pan_no || !mobile_no || !customer_type || !shipping_address || !city || !state || !zip_code || !country || !tax_id || !is_active || !opening_value|| !party || !notes || !birth_date || !anniversary_date || !personal_notes  || !billing_address) {
      console.log(req.body);
    }
    try {
      const result = await pool.query(
        `INSERT INTO customers (email,customer_name,customer_category, pan_number, mobile_no, customer_type, shipping_address, city, state, zip_code, country, tax_id, is_active, opening_value, party , notes , date_of_birth , anniversary_date, personal_notes,billing_address) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING customer_id`,
        [email,customer_name,customer_category, pan_no, mobile_no, customer_type, shipping_address, city, state, zip_code, country, tax_id, is_active, opening_value, party , notes , birth_date , anniversary_date , personal_notes, billing_address]
      );
  
      res.status(201).json({ success: true, message: "Customer added successfully", id: result.rows[0].customer_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to add customer" });
    }
  });
  app.get("/api/customers", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
});
app.put("/api/customers", authenticateToken, async (req, res) => {
  const {
    email, customer_name, customer_category, pan_no, mobile_no, customer_type, shipping_address, city,  state,zip_code, country, tax_id, is_active, opening_value, party_type, notes, birth_date, anniversary_date,personal_notes,billing_address
   } = req.body;
 console.log(req.body);

   
 if(!email || !customer_name || !customer_category || !mobile_no || !customer_type || !shipping_address || !city || !state || !zip_code || !country || !tax_id || !opening_value || !party_type || !notes || !birth_date || !anniversary_date || !personal_notes || !billing_address ){
   console.log("error")
 }
   try {
     const result = await pool.query(
       `UPDATE customers
        SET email = $1,
            customer_name = $2,
            customer_category = $3,
            pan_number = $4,
            mobile_no = $5,
            customer_type = $6,
            shipping_address = $7,
            city = $8,
            state = $9,
            zip_code = $10,
            country = $11,
            tax_id = $12,
            is_active = $13,
            opening_value = $14,
            party = $15,
            notes = $16,
            date_of_birth = $17,
            anniversary_date = $18,
            personal_notes = $19,
            billing_address = $20,
            update_at = CURRENT_TIMESTAMP
        WHERE customer_id = (select customer_id from customers where mobile_no =$5 ) `,
       [email, customer_name, customer_category, pan_no, mobile_no, customer_type, shipping_address, city, state, zip_code, country, tax_id, is_active, opening_value, party_type, notes, birth_date, anniversary_date, personal_notes, billing_address]
     );
 
     if (result.rowCount === 0) {
       return res.status(404).json({ success: false, message: "Customer not found" });
     }
 
     res.status(200).json({ success: true, message: "Customer updated successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: "Failed to update customer" });
   }
 });
 app.delete("/api/customers/:customer_id", authenticateToken, async (req, res) => {
  const { customer_id } = req.params;


  try {
    const result = await pool.query("DELETE FROM customers WHERE customer_id=$1 " , [customer_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete customer" });
  }
});
app.post("/api/products/add", async (req, res) => {
  const {
    product_name,
    hsn_sac_code,
    product_description,
    product_type,
    product_image,
    product_unit,
    product_category,
    selling_price,
    purchase_price,
    gst_rate,
    generate_barcode,
    custom_field
  
  } = req.body;

 
console.log(req.body);
  if (!product_name || !hsn_sac_code || !product_type || !product_description ) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO products (product_name, product_hsn_code, product_description, product_type,product_image,product_unit,category,selling_price,purchase_price,gst_rate,generate_barcode,custom_field) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12 ) RETURNING product_id",
      [product_name, hsn_sac_code, product_description, product_type,product_image,product_unit,product_category,selling_price,purchase_price,gst_rate,generate_barcode,custom_field ]
    );

    res.status(201).json({ success: true, message: "Product added successfully", product: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});
app.get("/api/products", authenticateToken, async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM products");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
  });
  app.put("/api/products", authenticateToken, async (req, res) => {
 
    const {
      product_name,
      product_hsn_code,
      product_description,
      product_type,
      product_img,
      product_unit,
      product_category,
      selling_price,
      purchase_price,
      gst_rate,
      generate_barcode,
      custom_field,
      product_id
     
    } = req.body;
    if (!product_name || !product_hsn_code || !product_type || !product_description ||!product_unit || !product_category || !selling_price || !purchase_price || !gst_rate || !generate_barcode || !custom_field || !product_id) {
      
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    console.log(req.body)
    try {
      const result = await pool.query(
        `UPDATE products
         SET product_name = $1,
             product_hsn_code = $2,
             product_description = $3,
             product_type = $4,
             product_image = $5,
             product_unit = $6,
             category = $7,
             selling_price = $8,
             purchase_price = $9,
             gst_rate = $10,
             generate_barcode = $11,
             custom_field = $12,
             updated_at = CURRENT_TIMESTAMP
         WHERE product_id = $13
         RETURNING product_id`,
        [product_name,product_hsn_code,product_description,product_type,product_img, product_unit,product_category, selling_price,  purchase_price,  gst_rate, generate_barcode,  custom_field,  product_id ]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, message: "Product updated successfully", product: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update product" });
    }
  });
  app.delete("/api/products/:product_id", authenticateToken, async (req, res) => {
    const { product_id } = req.params;
  
    if (!product_id ) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
      const result = await pool.query("DELETE FROM products WHERE product_id = $1 " , [product_id ]);
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete product" });
    }
  });
  app.get('/api/quotation/getallquotation',authenticateToken,async(req,res)=>{
    try {
      const result = await pool.query("SELECT * FROM quotation");
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching challans:", error);
      res.status(500).json({ success: false, message: "Failed to fetch challans" });
    }
  });
  app.post('/api/quotation/submit', authenticateToken, async (req, res) => {
    const {
      quotationdate,
      customerNumber,
      billing_address,
      shipping_address,
      references,
      subTotal,
      totalAmount,
      quotationNotes,
      signature_box,
      productdetail
    } = req.body;
   
    const tax_amount = totalAmount - subTotal;
    try {
      const newquotation = await pool.query(`
        INSERT INTO quotation (
          quotation_date, customer_id, mob_number, billing_address, shipping_address, reference, sub_total, total_amount, tax_amount, quotationnotes, signature_box 
        ) VALUES (
          $1, (SELECT customer_id FROM customers WHERE mobile_no =$2), $2, $3, $4, $5, $6, $7, $8, $9, $10
        ) RETURNING quotation_id`,
        [quotationdate, customerNumber, billing_address, shipping_address, references, subTotal, totalAmount, tax_amount, quotationNotes , signature_box]
      );
  
      const quotation_id = newquotation.rows[0].quotation_id;
  
      for (const item of productdetail) {
        const { productName, hsnCode, gstRate, unitPrice, quantity, total } = item;
  
        await pool.query(`
          INSERT INTO quotation_item (quotation_id, product_id, product_name, product_hsn_code, unit_price, tax_rate, quantity, total_price )
          VALUES (
            $1, (SELECT product_id FROM products WHERE product_hsn_code =$2 LIMIT 1), $3, $2, $4, $5, $6, $7
          )`,
          [quotation_id, hsnCode, productName, unitPrice, gstRate, quantity, total ]
        );
      }
  
      res.status(201).json({ success: true, message: "Quotation added successfully" });
    } catch (error) {
      console.error("Error creating Quotation:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app.post('/api/business_profile', authenticateToken , async (req,res)=>{
    const{
    name,phone,email,pan,gst,businessType,businessCategory,openingValue,billingAddress,shippingAddress,city,state,zipCode,notes,birthdate,anniversary,personalNotes
    }=req.body;
    console.log(req.body);
      try{
          if(!name||!phone||!email||!pan||!gst||!businessType||!businessCategory||!openingValue||!billingAddress||!shippingAddress||!city||!state||!zipCode||!notes||!birthdate||!anniversary||!personalNotes){
            return res.status(201).json({success:false,message:"require all feilds"});
          }
    const result= await pool.query(`insert into business_profile (name,mobile_no,email,pan_no,gst,businesstype,businesscategory,opening_value,billingaddress,shippingaddress,city,state,zipcode,notes,birthdate,anniversary,personalnotes) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [name,phone,email,pan,gst,businessType,businessCategory,openingValue,billingAddress,shippingAddress,city,state,zipCode,notes,birthdate,anniversary,personalNotes]);
     res.status(202).json({success:true,message:"successfully business_profile added"});
    }
    catch(error){
      console.error("Error fatching business_profile :",error);
      res.status(500).json({ success: false, message: "Failed to business_profile" });
    }
    });
    app.get('/api/check-data',authenticateToken, async (req, res) => {
      try {
          const result = await pool.query('SELECT * FROM business_profile'); // Adjust the query as needed
  
          if (result.rows.length === 0) {
              return res.send('No data'); // Return a string if no data is found
          }
  
          // If data exists, you can return it or handle it as needed
          return res.json(result.rows); // Return the data as JSON
      } catch (error) {
          console.error('Error querying the database:', error);
          return res.status(500).send('Internal Server Error'); // Handle errors
      }
  });
  

 ////////////////////
// Start the server
app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));