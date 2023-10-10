import { Navigate } from "react-router-dom";

const ProtectedStudentInfo = ({ children }) => {
    if (localStorage.getItem("STU-authenticated")) {
        return children;
    }else{
        return <Navigate to="/login" />;
    }
};

export default ProtectedStudentInfo

