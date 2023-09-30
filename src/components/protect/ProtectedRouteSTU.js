import { Navigate } from "react-router-dom";

const ProtectedRouteSTU = ({ children }) => {
    if (localStorage.getItem("STU-authenticated")) {
        return children;
    } if (localStorage.getItem("INS-authenticated")) {
        return <Navigate to="/login" />;
    }
    return <Navigate to="/login" />;
};

export default ProtectedRouteSTU

