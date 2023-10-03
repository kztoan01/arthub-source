import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
    if (localStorage.getItem("AD-authenticated")) {
        return children;
    }else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedAdmin

