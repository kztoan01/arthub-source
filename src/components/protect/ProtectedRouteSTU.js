import { Navigate } from "react-router-dom";

const ProtectedRouteSTU = ({ children }) => {
    // if (localStorage.getItem("STU-authenticated")) {
    //     return children;
    // } 
    if (localStorage.getItem("INS-authenticated")) {
        return <Navigate to="/login" />;
    }else{
        return children;
    }
};

export default ProtectedRouteSTU

