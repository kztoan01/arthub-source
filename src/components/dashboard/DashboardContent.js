import { useState, useEffect } from "react";
import apiCourse from '../api/axiosCourseConfig'
import { Link } from "react-router-dom";
import apiLearner from '../api/axiosLearnerConfig'
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
export default function DashboardContent() {
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
    const courseSold = learner?.filter((learner) => learner.ownerCourse === thisAccount?.id);
    let newDate = new Date()
    let thisMonth = newDate.getMonth() + 1
    const courseSoldLastMonth = learner?.filter((learner) => learner.ownerCourse === thisAccount?.id && learner.date.split("-")[1] == thisMonth - 1);
    const courseSoldThisMonth = learner?.filter((learner) => learner.ownerCourse === thisAccount?.id && learner.date.split("-")[1] == thisMonth);
    const courseOwn = courses?.filter((courses) => courses.accountId === thisAccount?.id);
    let totalAmount = courseSold?.reduce(function (prev, current) {
        return prev += current.price
    }, 0);
    let totalAmountLastMonth = courseSoldLastMonth?.reduce(function (prev, current) {
        return prev += current.price
    }, 0);
    let totalAmountThisMonth = courseSoldThisMonth?.reduce(function (prev, current) {
        return prev += current.price
    }, 0);
    const features = [
        { name: 'Avtive courses', description: 'Courses are being published on the platform:', value: courseOwn?.length },
        { name: 'Total students', description: 'Total number of students enrolled in your courses', value: courseSold?.length },
        { name: 'Total courses', description: "Total number of courses you've created:", value: courseOwn?.length },
        { name: 'Total Earnings', description: 'Total revenue on the platform', value: totalAmount, this: totalAmountThisMonth,last: totalAmountLastMonth  },
    ]
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}
                    <div className="bg-white">

                        <div>
                            <p className="mt-4 text-gray-500">
                                Your revenue in the past 5 months. <dt className="text-sm leading-6 text-gray-600">
                                    See{' '}
                                    <a href="#" className="font-semibold text-purple-600">
                                        Instructor&nbsp;Revenue Share
                                    </a>
                                    .
                                </dt>
                            </p>
                            <LineChart learner={learner} />
                            <div class="grid grid-cols-2 gap-4">

                                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">

                                    {features.map((feature) => (
                                        <div key={feature.name} className="border-t border-gray-200 pt-4">
                                            {feature.name == "Total Earnings" ?
                                                <>
                                                    <dt className="font-medium text-gray-900">{feature.name}</dt>
                                                    <dt className="text-sm leading-6 text-gray-600">
                                                        See{' '}
                                                        <a href="#" className="font-semibold text-purple-600">
                                                            Instructor&nbsp;Revenue Share
                                                        </a>
                                                        .
                                                    </dt>
                                                    <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                                    <dd className="mt-2 font-medium text-gray-800">Total: ${feature.value * 65 / 100}</dd>
                                                    <dd className="mt-2 font-medium text-gray-800">Last month: ${feature.last * 65 / 100}</dd>
                                                    <dd className="mt-2 font-medium text-gray-800">This month: ${feature.this * 65 / 100}</dd>
                                                </>
                                                :
                                                <>
                                                    <dt className="font-medium text-gray-900">{feature.name}</dt>
                                                    <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                                    <dd className="mt-2 font-medium text-gray-800">{feature.value}</dd>
                                                </>}

                                        </div>
                                    ))}

                                </dl>
                                <div className="w-auto h-auto"><PieChart courses={courseOwn} learner={learner} /></div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
        </>
    )
}