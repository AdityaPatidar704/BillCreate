import axios from "axios";
import { useState } from "react";

const base_url=`http://localhost:5003/api`;

export const apiReuestLoadCountry=async(url,headers)=>{         
        const response=await axios.get(url,{headers})
            return response;
}
export const apiReuestLoadState=async(url,headers)=>{         
    const response=await axios.get(url,{headers})
        return response;
}
export const apiReuestLoadDataUsingZipCode=async(url)=>{         
    const response=await axios.get(url)
        return response;
}
