import { Navigate } from "react-router-dom";

const ProtectedStaff = ({ children }) => {
    if (localStorage.getItem("STAFF-authenticated")) {
        return children;
    }else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedStaff

