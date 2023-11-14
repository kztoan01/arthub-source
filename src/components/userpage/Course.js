import { Link } from 'react-router-dom'
import { callouts } from '../data/ListOfCategories.js'
import course1 from '../assets/image/course-01.jpg'
import apiCourse from '../api/axiosCourseConfig.js'
import { useState, useEffect } from 'react';
function Course(props) {
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
    const caricature = courses?.filter((course) => course.level === "Expert" && String(course.status) === "2");
    const level = courses?.filter((course) => course.level === "Expert" && String(course.status) === "2");
    const english = courses?.filter((course) => course.language === "English" && String(course.status) === "2");
    const free = courses?.filter((course) => course.price === 0 && String(course.status) === "2");
    const vietnamese = courses?.filter((course) => course.language === "Vietnamese" && String(course.status) === "2");
    const types = [
        {
            name: 'Most Popular Courses',
            //most popular courses
        },
        {
            name: 'Caricature Courses',
            //caricature courses
        },
        {
            name: 'Cartoon Courses',
            //cartoon courses
        },
        {
            name: 'Sketch Courses',
            //sketch courses
        },
        {
            name: 'Expert Courses',
            courses: level
        },
        {
            name: 'English Courses',
            courses: english
        },
        {
            name: 'Vietnamese Courses',
            courses: vietnamese
        },
        {
            name: 'Free Courses',
            courses: free
        },

    ]

    // if (thisCourse?.price > 0) {
    //     price = '$' + thisCourse?.price;
    // } else {
    //     price = 'Free'
    // }
    // const types = [
    //     {
    //         name: 'Most Popular Courses',
    //         courses
    //     },
    //     {
    //         name: 'Caricature Courses',
    //         courses
    //     },
    //     {
    //         name: 'Cartoon Courses',
    //         courses
    //     },
    //     {
    //         name: 'Cartoon Courses',
    //         courses
    //     },
    // ]
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    console.log(courses)
    return (
        <>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 text-2xl font-bold text-gray-900">Categories - What you want to learn</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {callouts?.map((callout) => (
                                <Link to="/search"><div key={callout.name} className="group relative">
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                </div></Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {types?.map((type) => (
                <div key={type.name} className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 
                        className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 text-2xl font-bold text-gray-900"
                        // className="text-2xl font-bold tracking-tight text-gray-900"
                        >{type.name}</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {type.courses?.map((product) => (
                                <Link to={`/course/${product.id}`}><div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={linkImg+product.image}
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
            ))}

        </>
    );
};

export default Course;