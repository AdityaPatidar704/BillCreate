// PublicRoutes.js
import { Route } from "react-router-dom";
import LoginRegister from "../pages/loginRegister";

const PublicRoutes = ({ setAuth }) => {
    return <LoginRegister setAuth={setAuth}></LoginRegister>
};

export default PublicRoutes;