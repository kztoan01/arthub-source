import { useState, useEffect } from "react";
import apiCourse from '../api/axiosCourseConfig'
import { Link } from "react-router-dom";
import apiLearner from '../api/axiosLearnerConfig'
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
export default function Overview() {
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
    console.log(courseOwn)
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}
                    <section className="py-10 bg-white sm:py-16 lg:py-24">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h4 className="text-xl font-medium text-gray-900">The numbers tell the hard work you have achieved during your time working with ArtHub</h4>
                            </div>

                            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-6">
                                        <div className="flex items-start">
                                            <svg className="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <div className="ml-4">
                                                <h4 className="text-4xl font-bold text-gray-900">{courseOwn?.length}</h4>
                                                <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">Courses created</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-6">
                                        <div className="flex items-start">
                                            <svg className="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <div className="ml-4">
                                                <h4 className="text-4xl font-bold text-gray-900">{courseSold?.length}+</h4>
                                                <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">Students enrolled</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-6">
                                        <div className="flex items-start">
                                            <svg className="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <div className="ml-4">
                                                <h4 className="text-4xl font-bold text-gray-900">${totalAmount * 65 / 100}</h4>
                                                <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">Overall Revenue</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                            <LineChart  courses={courses} learner={learner}/>
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