import axios from "axios";
import { useEffect, useState,useRef } from "react"
import { useLocation } from "react-router-dom"
import { useReactToPrint } from "react-to-print";
import "../styles/generateInvoice.css"
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'
import { toWords } from "number-to-words";
import myimage from "../assets/WhatsApp Image 2025-03-20 at 21.54.27_dfd29da3.jpg"
import { apiGet } from "../services/api";
export function GenerateInvoice({onGenerateInvoice}){
    const [customer,setCustomer]=useState([{}]);
    const location=useLocation();
    const [datee,setdatee]=useState(new Date().toLocaleDateString());
    const [data,setData]=useState(null);
    const [challan_id,setChallan_id]=useState([{}]);
    const [productdata,setProductData]=useState([]);
    const [quantity,setQuantity]=useState(0);
    const [taxable_rate,setTaxable_rate]=useState(0);
    const [gst_amount,set_gst_amount]=useState(0);
    const [total_amount,set_Total_amount]=useState(0);
    const [amount_to_words,setAmountWords]=useState(0);
            useEffect(()=>{
                    var qty=0;
                    var taxablee_rate=0;
                    var amount=0;
                    var totalAmount=0;
                setdatee(datee);
            const get=[location.state];
            console.log(get);
            console.log("i am get")
            const fetchCustomerDetails=async ()=>{
                const token=localStorage.getItem("token");
                try{
                    for(var num of get[0].data)
                    {
                            console.log(num.mob_number);
                    }
                    const number=get[0].data[0].mob_number;
                    // const res=await axios.get(`http://localhost:5003/api/invoices/${number}`,{
                    //     headers:{
                    //         Authorization: `Bearer ${token}`,
                    //     }
                    // })
                    const response=await apiGet(`/invoices/${number}`)
                    console.log(response);
                    console.log("other")
                    setCustomer(response);
                    setData([location.state])
                    var id=0;
                    for(var i of get[0].data)
                    {
                        console.log(i.challan_id);
                        id=id+","+i.challan_id;
                        console.log(id);
                    }
                    // const res1=await axios.get(`http://localhost:5003/api/challandetails/provide/${number}/${id}`,{
                    //     headers:{
                    //         Authorization: `Bearer ${token}`,
                    //     }
                    // })
                    const res1=await apiGet(`challandetails/provide/${number}/${id}`)
                    console.log(res1);
                    setProductData(res1);
                    console.log("other data")
                    for(var j of res1)
                    {
                        for(var k of j)
                        {
                            // console.log(k);
                            console.log("executing")
                            qty=qty+k.quantity;
                            var x=parseFloat(k.unit_price);
                            var y=parseFloat((k.unit_price*k.tax_rate)/100);
                            var z=parseFloat(k.total_price);
                            console.log(y);
                            taxablee_rate=taxablee_rate+x;
                            totalAmount=totalAmount+z;
                            
                            amount=amount+y;
                        }
                        console.log(qty);
                        setQuantity(qty);
                        setTaxable_rate(taxablee_rate);
                        set_gst_amount(amount.toFixed(2))
                        set_Total_amount(totalAmount);
                        fetchAmountToWord(totalAmount);
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchCustomerDetails();
            },[onGenerateInvoice])
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
            
            const contentRef=useRef();

            const handlePrintInvoice=useReactToPrint({contentRef})
                // html2canvas(contentRef.current,{
                //     scale:2
                // }).then((canvas) => {
                //     const imgData = canvas.toDataURL("image/png");
                //     const doc = new jspdf({
                //         orientation:"portrait",
                //         unit:"px",
                //         format:"a4"
                //     });       
                //     // Calculate dimensions to ensure the image fits the page
                //     // const imgWidth = canvas.width; // A4 width in mm
                //     // const imgHeight =canvas.height;
                //     // const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
                //     // const imgX=(pdfWidth-imgWidth*ratio)/2;
                //     // const imgY=20;
                //     const imgProperties=doc.getImageProperties(imgData);
                //     const pdfWidth=doc.internal.pageSize.getWidth();
                //     const pdfHeight=(imgProperties.height*pdfWidth)/imgProperties.width;
                //     console.log(imgProperties);
                //     // Add image to PDF with adjusted scale
                //     doc.addImage(imgData, "PNG",0,0,pdfWidth,pdfHeight);
              
                //     // Save the PDF
                //     doc.save("invoice.pdf");
                // })
                // html2canvas(contentRef.current, {
                //     scale: 2, // Increase scale for better text quality
                //     logging: true,
                //     useCORS: true, // Enable CORS to load external resources (images, etc.)
                //   }).then((canvas) => {
                //     // Create a jsPDF instance
                //     const doc = new jspdf('p', 'mm', 'a4');
                //     const imgData = canvas.toDataURL('image/png');
              
                //     const imgWidth = 210; // A4 paper width in mm
                //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                //     let yOffset = 10; // Initial Y-offset for the image on the PDF
                //     const margin = 10;
              
                //     // If the rendered image height exceeds the page height, split it across multiple pages
                //     while (yOffset + imgHeight > doc.internal.pageSize.height - margin) {
                //       doc.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
                //       yOffset = imgHeight + 10; // Add space for next page
                //       doc.addPage(); // Create a new page for the next chunk
                //     }
              
                //     // Add the last chunk of the image
                //     doc.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
              
                //     // Save the PDF
                //     doc.save("generated_table.pdf");
                //   });
              

    return(
        <>
        <button onClick={handlePrintInvoice}>Print Invoice</button>
        {
            data!=null
            ?
            (
                <div ref={contentRef} className="genearte-invoice-body" style={{height:"200%"}}>
                 <div>
                 <div className="content-header">
                     <div className="left-content-header">
                         <div className="brand-logo">
                         {/* <h2 className="text-gray-700">Bill<span className="text-green-600">●</span>365</h2> */}
                         <img src={myimage} className="logo-adjust" alt="" />
                         </div>
                         <div className="content">
                             <p>Compunic pvt.ltd</p>
                             
                             <p>Palasiya main road Indore</p>
                             
                             <p>Madhya Pradesh Indore</p>
                             
                         </div>
                     </div>
                     <div className="right-content-header">
                         <br />
                         <span className="">Ph:70499615xx</span>
                         <br />
                         <span className="">Er.Aditya Patidar</span>
                     </div>
                 </div>
                 <p className="hr" />
                 <p className="section-align">All systems comes here</p>
                 <p className="hr"/>
                 <div className="border-content">
                     <div className="content-heading">
                         <p ><span className="fw-bolder margin-all">GSTIN: </span>{customer[0].tax_id}</p>
                         <p className="tax-invoice-color">TAX INVOICE</p>
                         <p className="margin-right-all">original for recipient</p>
                     </div>
                     <div className="customer-detail">
                         <div className="customer-detail-content">
                             <div className="customer-detail-align">
                                  <div className="customer-detail-head"><span>Customer Detail</span></div>
                                 <dl className="customer-detail-list margin-all">
                                 <dt>M/s</dt>
                                 <dd>{customer[0].customer_name}</dd>
                                 <dt>Address</dt>
                                 <dd>{customer[0].billing_address}</dd>
                                 <dt>PHONE</dt>
                                 <dd>{customer[0].mobile_no}</dd>
                                 <dt>GSTIN</dt>
                                 <dd>{customer[0].tax_id}</dd>
                                 <dt>Place of <br />supply</dt>
                                 <dd>{customer[0].billing_address1}</dd>
                             </dl>
                             </div>
                             <dl className="right-details-customer margin-all">
                                 <div className="div-1">
                                 <dt>Invoice No.</dt>
                                 <dd>12</dd>
                                 <dt>Due Date</dt>
                                 <dd>26---</dd>
                                 </div>
                                 <div className="div-2">
                                 <dt>Invoice Date</dt>
                                 <dd>{datee}</dd>
                                 </div>
                             </dl>
                         </div>
                     </div>
                     <div className="add-border-bottom"><br /></div>
                     <div className="table-data-starts">
                         <table className="table-body">
                             <thead>
                                 <tr>
                                     <th rowSpan="2">Sr.No.</th>
                                     <th rowSpan="2">Name of Product / Services</th>
                                     <th rowSpan="2">HSN/SAC</th>
                                     <th rowSpan="2">Qty</th>
                                     <th rowSpan="2">Rate</th>
                                     <th rowSpan="2">Taxable Value</th>
                                    <th colSpan="2">IGST</th>
                                     <th rowSpan="2">Total</th>
                                 </tr>
                                 <tr>
                                    <th>%</th>
                                    <th>Amount</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {
                                     data.map((data,index)=>
                                         customer.map(values=>
                                            productdata.map((pr,index)=>
                                                pr.map(product=>
                                         <tr>
                                                 <td>{index+1}</td>
                                                 <td>{product.product_name}</td>
                                                 <td>{product.product_hsn_code}</td>
                                                 <td>{product.quantity}</td>
                                                 <td>{product.unit_price}</td>
                                                 <td>{product.unit_price}</td>
                                                <td>{parseInt(product.tax_rate)+"%"}</td>
                                                <td>{(product.tax_rate*product.unit_price)/100}</td>
                                                <td>{product.total_price}</td>
                                                 </tr>
                                          ) )))
                                 }
                             </tbody>
                             <tfoot>
                                <tr>
                                    <td colSpan={3} className="text-end">Total</td>
                                    <td>{quantity}</td>
                                    <td></td>
                                    <td>{taxable_rate}</td>
                                    <td></td><td>{gst_amount}</td>          
                                    <td className="">{total_amount}</td>
                                </tr>
                             </tfoot>
                         </table>
                     </div>
                     <div className="footer-part">
                        <div className="left-footer-adjust">
                        <div className="amount-adjust"><p>Total in Words</p>
                             <p>{amount_to_words}</p>
                        </div>
                        <div className="bank-detail">
                            <p>Bank Details</p>
                            <dl>
                                <dt>Name</dt>
                                <dd>ICICI</dd>
                                <dt>Branch</dt>
                                <dd>Indore</dd>
                                <dt>IFSC</dt>
                                <dd>ICIC045F</dd>
                                <dt>UPI ID</dt>
                                <dd>ifox@icici</dd>
                            </dl>
                        </div>
                        <div className="terms-condition">
                            <p>Terms and Condition</p>
                            <p className=""> Subject to our home Ahmedabad. <br />
Our Responsibility Ceases as soon as goods leaves our Premises. 
<br />
Goods once sold will not taken back. 
<br />
Delivery Ex-Premises.</p>
                        </div>
                        </div>
                        <div className="right-fotter-align">
                            <div>
                                <div>
                                    <dl className="dlClass">
                                        <div className="right-dl-align">
                                        <dt>Taxable Amount</dt>
                                        <dd>{taxable_rate}</dd>
                                        </div>
                                        <div className="right-dl-align">
                                        <dt>Add: IGST</dt>
                                        <dd>coming..</dd>
                                        </div>
                                        <div className="right-dl-align">
                                        <dt>Total Tax</dt>
                                        <dd>{gst_amount}</dd>
                                        </div>
                                        
                                        <div className="right-dl-align">
                                        <dt>Total amount after tax</dt>
                                        <dd>{"₹"+total_amount}</dd>
                                        </div>
                                        <div className="right-dl-align">
                                        <dt></dt>
                                        <dd>(E & O.E)</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="certified-right">
                                    <p> Certified that the particulars given above are true and correct.
                                        <br />
                                    </p>
                                    <p>For Compunic Pvt.Ltd</p>
                                </div>
                                <div className="signature">Authorized Signature</div>
                            </div>
                        </div>
                     </div>
                 </div>
                </div>
                </div>
):(
    <div>Loading....</div>
) 
} 
     </>
     
     )
}