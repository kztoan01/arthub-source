import { StarIcon } from '@heroicons/react/20/solid'
import React, { useState, useRef, useEffect } from "react";
import { Rating, Typography, Button } from "@material-tailwind/react";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import {
    CheckCircleIcon, ExclamationTriangleIcon
} from '@heroicons/react/20/solid'
import api from '../api/axiosAccountConfig'
import apiCourse from '../api/axiosCourseConfig'
import defaultImg from '../assets/image/default.jpg'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function CourseAnnouncements() {
    const { id } = useParams()
    const formCourseData = new FormData();
    formCourseData.append('id', id);

    const [thisCourse, setThisCourse] = useState()
    const getThisCourse = async () => {
        try {
            const response = await apiCourse.post("/showSectionAndVideo", formCourseData);
            setThisCourse(response.data)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getThisCourse();
    }, [])
    const thisAccount = JSON.parse(localStorage.getItem("logined"));
    const linkImg = 'http://localhost:8080//images//'
    const [rated, setRated] = React.useState(5);
    const [ratemes, setRatemes] = React.useState("Amazing, above expectations!")
    //save rating
    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useState(false)

    const [comment, setComment] = useState('')
    const formAddRating = new FormData();
    formAddRating.append('courseId', id);
    formAddRating.append('accountId', thisAccount?.id);
    formAddRating.append('rate', 0);
    formAddRating.append('comment', comment);
    async function handleRate(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/rate/CourseRate", formAddRating).then(response => {
                setOpen(true)
                getThisCourseRating();
            });
            setOpen(true)
        } catch (err) {
            alert(err);
        }
    }
    //get this course rating
    const formCourseRating = new FormData();
    formCourseRating.append('courseId', id);
    const [thisCourseRating, setThisCourseRating] = useState()
    const getThisCourseRating = async () => {
        try {
            const response = await axios.post("http://localhost:8080/rate/getCourseRate", formCourseRating);
            setThisCourseRating(response.data)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getThisCourseRating();
    }, [])
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
    const insAnnouncements = thisCourseRating?.filter((ann) => ann?.accountId == thisCourse?.accountId)
    const [annId, setAnnId] = useState()
    const formEditAnn = new FormData();
    formEditAnn.append('comment', comment);
    formEditAnn.append('id', annId);
    async function handleEditRate(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/rate/updateAnn", formEditAnn).then(response => {
                setEditOpen(false)
                setOpen(true)
                setComment('')
                getThisCourseRating();
            });
        } catch (err) {
            alert(err);
        }
    }
    //delete ann
    const [deleteopen, setDeleteOpen] = useState(false)
    const [sucopen, setSucOpen] = useState(false)
    const formDeleteAnn = new FormData();
    formDeleteAnn.append('id', annId);
    // async function handleDeleteRate(e) {
    //     e.preventDefault();
    //     try {
    //         await axios.delete("http://localhost:8080/rate/deleteCourseRate", formDeleteAnn).then(response => {
    //             setDeleteOpen(false)
    //             setSucOpen(true)
    //             getThisCourseRating();
    //         });
    //     } catch (err) {
    //         alert(err);
    //     }
    // }
    async function handleDeleteRate(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/rate/deleteCourseRate`, formDeleteAnn)
                .then(response => {
                    setDeleteOpen(false)
                    setSucOpen(true)
                    getThisCourseRating();
                });
        } catch (err) {
            alert(err);
        }

    }
    console.log(annId)
    return (
        <>
            <div className="isolate bg-white px-6 py-24 sm:py-0 lg:px-24 ">
                {/* <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div class="sm:col-span-3"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Search reviews</label>
                        <div class="mt-2"> <input id="search" name="search" type="text" autocomplete="search" placeholder="e.g Caricature"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div> */}
                <article className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {thisAccount?.id == thisCourse?.accountId ?
                        <><div class="col-span-full"> <label for="about"
                            class="block text-sm font-medium leading-6 text-gray-900">Add Announcements</label>
                            <div class="mt-2"> <textarea id="about" name="about" rows="3" maxLength={4000}
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value)
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-600">Notify your students in the course of any changes, document.</p>
                            {/* <div className="mt-8 flex items-center gap-2 font-bold text-blue-gray-500">
                            {rated}
                            <Rating value={5} onChange={(value) => {
                                if (value == 5) {
                                    setRatemes("Amazing, above expectations!")
                                } else if (value == 4) {
                                    setRatemes("Good, what I expected")
                                } else if (value == 3) {
                                    setRatemes("Average, could be better")
                                } else if (value == 2) {
                                    setRatemes("Poor, pretty disappointed")
                                } else if (value == 1) {
                                    setRatemes("Awful, not what I expected at all")
                                }
                                setRated(value)
                            }

                            }
                            />
                            <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                                {ratemes}
                            </Typography>
                        </div> */}
                            <Button className='mt-4' onClick={(e) => handleRate(e)}>Save</Button>
                        </div>
                            <div className="relative flex items-center gap-x-4">
                                <img src={thisAccount?.image ? linkImg + thisAccount?.image : defaultImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900 w-48">
                                        <a
                                        // href={post.author.href}
                                        >
                                            <span className="absolute inset-0" />
                                            {thisAccount?.firstname + " " + thisAccount?.lastname}
                                        </a>
                                    </p>
                                </div>
                            </div></> : <></>}



                </article>
                <div className="bg-white py-24 sm:py-8">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="text-xl font-medium text-gray-900">Course Announcements</h2>
                        <div className="mt-4 space-y-6">
                            {insAnnouncements?.slice(0).reverse().map((post) => (
                                <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                    <div className="flex items-center gap-x-4 text-xs mt-4">
                                        <time dateTime={post.timeRate} className="text-gray-500">
                                            {post.timeRate.split('T')[0]}
                                        </time>

                                    </div>
                                    <div className="group relative">
                                        {/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a 
                                            href=""
                                            >
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3> */}
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
                                            {/* <p className="text-gray-600">{post.author.role}</p> */}
                                        </div>
                                    </div>
                                    {thisAccount?.id == thisCourse?.accountId ? (<><Button className='mt-4'
                                        onClick={(e) => {
                                            setEditOpen(true)
                                            setComment(post.comment)
                                            setAnnId(post.id)
                                        }}
                                    >Edit</Button>
                                        <Button className='mt-4'
                                            onClick={(e) => {
                                                setDeleteOpen(true)
                                                setAnnId(post.id)
                                            }}
                                        >Delete</Button></>)
                                        : <></>}

                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* rating success */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Save Course Announcement Successfully
                                                </Dialog.Title>
                                                {/* <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        On behalf of the instructors, ArtHub would like to thank you for your comments on this course.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={editopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setEditOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div class="col-span-full w-full"> <label for="about"
                                            class="block text-sm font-medium leading-6 text-gray-900">Comment and Rate</label>
                                            <div class="mt-2"> <textarea id="about" name="about" rows="3" maxLength={4000}
                                                value={comment}
                                                onChange={(e) => {
                                                    setComment(e.target.value)
                                                }}
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"></textarea>
                                            </div>
                                            <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this course.</p>
                                            {/* <div className="mt-8 flex items-center gap-2 font-bold text-blue-gray-500">
                                                {rated}
                                                <Rating value={rated} onChange={(value) => {
                                                    if (value == 5) {
                                                        setRatemes("Amazing, above expectations!")
                                                    } else if (value == 4) {
                                                        setRatemes("Good, what I expected")
                                                    } else if (value == 3) {
                                                        setRatemes("Average, could be better")
                                                    } else if (value == 2) {
                                                        setRatemes("Poor, pretty disappointed")
                                                    } else if (value == 1) {
                                                        setRatemes("Awful, not what I expected at all")
                                                    }
                                                    setRated(value)
                                                }

                                                }
                                                />
                                                <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                                                    {ratemes}
                                                </Typography>
                                            </div> */}
                                            <Button className='mt-4'
                                                onClick={(e) => handleEditRate(e)}
                                            >Save Announcement</Button>
                                        </div>
                                        {/* <div className="relative flex items-center gap-x-4">
                                            <img src={thisAccount?.image ? linkImg + thisAccount?.image : defaultImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900 w-48">
                                                    <a
                                                    // href={post.author.href}
                                                    >
                                                        <span className="absolute inset-0" />
                                                        {thisAccount?.firstname + " " + thisAccount?.lastname}
                                                    </a>
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={deleteopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDeleteOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Are you sure you want to delete this announcements?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Clicking Accept means permanently deleting the announcements.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => handleDeleteRate(e)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setDeleteOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* delete success */}
            <Transition.Root show={sucopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSucOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Announcement Delete Successfully
                                                </Dialog.Title>
                                                {/* <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    We have updated your account information, please check your personal information.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setSucOpen(false)}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}