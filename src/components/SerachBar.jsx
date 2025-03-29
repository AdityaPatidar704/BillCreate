export function SearchComponent({...rest}){
    return(
        <form className="relative">
                <input 
                {...rest}
                       placeholder="Search customers..."
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
                    </form>
    )
}