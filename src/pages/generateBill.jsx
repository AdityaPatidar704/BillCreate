import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { useReactToPrint } from "react-to-print";
export function GenerateBillComponent(){
    
    const location=useLocation();
    const [data,setData]=useState(null);
    const [customer,setCustomer]=useState(null);
    useEffect(()=>{
        const get=[location.state];
            console.log(get[0].data[0].mob_number);
            const number=get[0].data[0].mob_number;
            setData([location.state]);
            const fetchCustomerDetails=async ()=>{
                const token=localStorage.getItem("token");
                try{
                    const res=await axios.get(`http://localhost:5003/api/invoices/${number}`,{
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    console.log(res.data);
                    setCustomer(res.data);
                    setData([location.state])
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchCustomerDetails();
    },[])
    const contentRef=useRef();
    const printMe=useReactToPrint({contentRef})
    return(
        <><button className="btn btn-success" onClick={printMe}>Print</button>
        
        </>
    )
}