import axios from "axios"
import { Link } from "react-router-dom"
import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon, LinkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import Paginate from "../extension/Paginate"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StudentContent() {
    const linkImg = 'http://storage.cloud.google.com/arthub-bucket/'
    const thisAccount = JSON.parse(localStorage.getItem("logined"))

    const [courseStudent, setCourseStudent] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/course/GetCourseByInstructorID/${thisAccount?.id}`);
            setCourseStudent(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourses();
    }, []
    )

    const indexOfLastPost = currentPage * studentsPerPage;
    const indexOfFirstPost = indexOfLastPost - studentsPerPage;
    const currentPosts = courseStudent?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = (id) => {
        if (currentPage !== Math.ceil(courseStudent[id]?.length / studentsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        {courseStudent?.map((product) => (
                            <>
                                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                    <img src={linkImg + product?.image} alt="" className="object-cover object-center" />
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>

                                    <section aria-labelledby="information-heading" className="mt-2">
                                        <h3 id="information-heading" className="sr-only">
                                            Product information
                                        </h3>
                                    </section>
                                    <Paginate
                                        postsPerPage={studentsPerPage}
                                        totalPosts={product?.students?.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                        previousPage={previousPage}
                                        nextPage={()=>nextPage(product?.id)}
                                    />
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {product.students?.slice(indexOfFirstPost, indexOfLastPost).map((person) => (
                                            <>
                                                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        {/* {person.image == null ? (<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='../assets/image/default.jpg' alt="" />)
                                                        :
                                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={linkImg + person.image} alt="" />} */}

                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.lastname} {person.firstname}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                                        </div>
                                                        {/* <div className="mt-5 flex lg:ml-4 lg:mt-0 float-left">
                                                
                                            </div> */}
                                                    </div>
                                                    <div className="mt-5 flex lg:ml-4 lg:mt-0 ">
                                                        <span className="ml-3 hidden sm:block"><Link to={`/student/${person.id}`}><button
                                                            // onClick={(e) => {
                                                            //     setDetail(true)
                                                            //     setId(person.id)
                                                            // }}
                                                            type="button"
                                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            View
                                                        </button></Link>
                                                        </span>
                                                    </div>

                                                </li></>
                                        ))}

                                    </ul>
                                </div> </>
                        ))}

                    </div>




                </div>
            </main>
        </>
    )
}