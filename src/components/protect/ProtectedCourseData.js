import { Navigate } from "react-router-dom";

const ProtectedCourseData = ({ children }) => {
    if (localStorage.getItem("STU-authenticated") || localStorage.getItem("AD-authenticated")) {
        return children;
    }else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedCourseData

