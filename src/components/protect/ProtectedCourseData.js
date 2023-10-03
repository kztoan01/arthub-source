import { Navigate } from "react-router-dom";

const ProtectedCourseData = ({ children }) => {
    if (localStorage.getItem("STU-authenticated")) {
        return children;
    }else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedCourseData

