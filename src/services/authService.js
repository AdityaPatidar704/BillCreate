export const getToken=()=>{
    return localStorage.getItem("token");
};
export const setToken=(token)=>{
    console.log("tokenset"+token);
    return localStorage.setItem("token",token)
}
export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
export const logoutUser=()=>{
    removeToken();
    window.location.href="/";

}