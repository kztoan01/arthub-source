import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem("INS-authenticated")) {
        return children;
    } if (localStorage.getItem("STU-authenticated")) {
        return <Navigate to="/login" />;
    }
    return <Navigate to="/login" />;
};

export default ProtectedRoute

