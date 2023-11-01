import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiLearner from '../api/axiosLearnerConfig'
import apiCourse from '../api/axiosCourseConfig'
import {
    CalendarIcon,
    CurrencyDollarIcon,
    UserIcon,
    LanguageIcon,
} from '@heroicons/react/20/solid'
import axios from "axios";
import api from '../api/axiosAccountConfig'
import defaultImg from '../assets/image/default.jpg'
export default function AccountNotification() {
    // get learner
    const [learner, setLearner] = useState()
    const getLearner = async () => {
        try {
            const response = await apiLearner.get("/getLearners");
            setLearner(response.data);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getLearner();
    }, []
    )
    // get courses
    const [courses, setCourses] = useState()
    const getCourses = async () => {
        try {
            const response = await apiCourse.get("/getCourses");
            setCourses(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourses();
    }, []
    )
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount?.id);
    const learningCourses = courses?.filter((course) => {
        return thisStudent?.some((learn) => {
            return learn.courseId === course.id
        })
    })

    // get announcement from each course
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const formCourseRating = new FormData();
    const [thisCourseRating, setThisCourseRating] = useState()

    const getThisCourseRating = async (id) => {
        formCourseRating.append('courseId', id);
        try {
            const response = await axios.post("http://localhost:8080/rate/getCourseRate", formCourseRating)
            return response.data
        } catch (e) {
            alert(e)
        }
    }
    console.log(getThisCourseRating(38))


    const [users, setUsers] = useState()
    const getUsers = async () => {
        try {
            const response = await api.get("/accounts");
            // console.log(response.data)
            setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []
    )
    const findAccountById = (id) => {
        return users?.find((user) => user.id === id)
    }
    const [editopen, setEditOpen] = useState(false)
    // const insAnnouncements = thisCourseRating?.filter((ann) => ann?.accountId == thisCourse?.accountId)
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notification</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/*content */}
                    {learningCourses?.map((product) => (
                        <div className="lg:flex lg:items-center lg:justify-between pb-10">
                            <div className="min-w-0 flex-1">
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 ">
                                    {product.name}
                                </h2>
                                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        {product.instructorName}
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <LanguageIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        {product.language}
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        {product.price}
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        {product.date.split('T')[0]}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            </div>
                            <div className="bg-white py-24 sm:py-8">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                    <h2 className="text-xl font-medium text-gray-900">Course Announcements</h2>
                                    <div className="mt-4 space-y-6">
                                        {/* {getThisCourseRating(product?.id)?.slice(0).reverse().map((post) => (
                                <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                    <div className="flex items-center gap-x-4 text-xs mt-4">
                                        <time dateTime={post.timeRate} className="text-gray-500">
                                            {post.timeRate.split('T')[0]}
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <p className="mt-5 line-clamp-8 text-sm leading-6 text-gray-600">{post.comment}</p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <img src={findAccountById(post.accountId)?.image ? linkImg + findAccountById(post.accountId)?.image : defaultImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <a
                                                    href=""
                                                >
                                                    <span className="absolute inset-0" />
                                                    {findAccountById(post.accountId)?.firstname + " " + findAccountById(post.accountId)?.lastname}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </main>
        </>
    )
}