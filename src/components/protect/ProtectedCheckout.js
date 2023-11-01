import { Navigate } from "react-router-dom";

const ProtectedCheckout = ({ children }) => {
    // if (localStorage.getItem("STU-authenticated")) {
    //     return children;
    // } 
    if (localStorage.getItem("STU-authenticated")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedCheckout