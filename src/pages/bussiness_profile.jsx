import { useState } from "react";
import { Loader } from "../layouts/Loader";
import Sidebar from "../layouts/Sidebar";
import { SearchComponent } from "../components/SerachBar";
import { NavLink } from "react-router-dom";
import { ButtonComponent } from "../components/Button";

export function Bussiness_profile(){
    const [search, setSearch] = useState(""); // Search state
    return(
        <>
        <div>
      {Loader?
     (<div className="gop">
      <Sidebar />
      <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Profile Details
                  <span className="bg-blue-400 ms-2 text-white px-3 py-1 rounded-full text-sm">
                    {/* Total {total} */}
                  </span>
                </h2>
                {/* <form className="relative">
                <input 
                       placeholder="Search customers..."
                      //  value={search}
                       onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-1.5 pl-9 rounded-full border bg-gray-200 border-gray-300"
                    />
                    <svg 
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-700" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>
                    </form> */}
                    <SearchComponent onChange={(e) => setSearch(e.target.value)}/>
                <div className="flex space-x-3">
                  <NavLink to="/profile_form">
              <ButtonComponent className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]" label="Add Bussiness-profile" value="addProduct"></ButtonComponent>
              </NavLink>
                </div>
              </div>
        {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

        {/* <TableComponent
  column={column}
  data={dataTable}
  pageSize={3} // Number of rows per page
  actions={(row) => (
    <div className="flex gap-2">
      <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
      <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
    </div>
  )}
/> */}
      </div>
      </div>)
      :(
        <Loader></Loader>
      )}
      </div>
    
        </>
    )
}