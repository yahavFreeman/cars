import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
    const user = useSelector((state) => state.userModule);
    return user["accessToken"] ? <Outlet/> : <Navigate to="/"/> // Outlet renders the matching child route of a parent route or nothing if no child route matches.


}

export default ProtectedRoutes