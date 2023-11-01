import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../api/axiosAccountConfig'
import apiCourse from '../api/axiosCourseConfig'
import { Link } from "react-router-dom";
export default function Instructor() {
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
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
    const { id } = useParams()
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

    const thisInstructor = users?.find((user) => user.id == id)
    const instructorCourses = courses?.filter((course) => course.accountId == id)
    console.log(instructorCourses)
    const features = [
        { name: 'About me', description: thisInstructor?.bio },
    ]
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div className="grid gap-4 sm:gap-6 lg:gap-8 mb-10">
                    <img
                        src={linkImg + thisInstructor?.image}
                        alt="Intructor image"
                        className="rounded-full bg-gray-100 w-48 h-48"
                    />
                </div>
                <div>
                    <p className="mt-4 text-gray-500">
                        Instructor
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{thisInstructor?.firstname} {thisInstructor?.lastname}</h2>


                    <dl className="mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="border-t border-gray-200 pt-4 mt-4">
                                <dt className="font-medium text-xl text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-lg text-gray-900 mb-8">{feature.description}</dd>
                                {thisInstructor?.facebook ? <button href={thisInstructor?.facebook} target="_blank" className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    Facebook
                                </button>: <></>}
                                {thisInstructor?.twitter ? <button className="ml-4 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    Twitter
                                </button>: <></>}
                                
                            </div>
                        ))}
                    </dl>
                </div>

            </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Course</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {instructorCourses?.map((product) => (
                        <Link to={`/course/${product.id}`}><div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={linkImg + product.image}
                                    // {product.imageSrc}
                                    alt=""
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructorName}</p>
                                </div>
                                {product.price === 0 ? (
                                    <p className="text-sm font-medium text-gray-900">Free</p>
                                ) : <p className="text-sm font-medium text-gray-900">${product.price}</p>}

                            </div>
                        </div></Link>
                    ))}
                </div>
            </div>
        </div>
    )
}