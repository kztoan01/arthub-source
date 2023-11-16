import { Navigate } from "react-router-dom";
import apiLearner from '../api/axiosLearnerConfig'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProtectedLearning = ({ children }) => {
    const { id } = useParams()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const [learner, setLearner] = useState()
    const [isEnroll, setIsEnroll] = useState(false)
    const getLearner = async () => {
        try {
           await axios.get("https://arthubplatform1.azurewebsites.net/learner/getLearners").then(response => {
            console.log(response.data.find((learn) => learn?.accountId == thisAccount?.id && learn.courseId == id))
            if(response.data.find((learn) => learn?.accountId == thisAccount?.id && learn.courseId == id)){
                setIsEnroll(true)
            }
            console.log(isEnroll)
           })
            
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getLearner();
    }, []
    )
    if (isEnroll == false) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedLearning

