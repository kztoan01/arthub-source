import { useAsyncError, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Video from "../learning/Video";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import apiCourse from '../api/axiosCourseConfig'
import { useNavigate } from 'react-router-dom';
import img from '../assets/image/course-01.jpg'
import axios from 'axios';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon,CodeBracketIcon } from '@heroicons/react/24/outline'
import logo from '../assets/image/ArtHub-logos_black.png'
import { Disclosure, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import CourseOverview from '../learning/CourseOverview';
const includes = [
    '15.5 hours on-demand video.',
    '1 article.',
    '6 downloadable resources',
    'Access on mobile and TV',
    'Certificate of completion',
]


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PreviewCourse(props) {
    const { id } = useParams()
    const [loading,setLoading] = useState(false)
    // const [courses, setCourses] = useState()
    // //get all courses
    // const getCourses = async () => {
    //     try {
    //         const response = await apiCourse.get("/getCourses");
    //         setCourses(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getCourses();
    // }, []
    // )
    //get this course info


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
    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    if (thisCourse?.accountId != thisAccount.id) {
        navigate('/')
    }
    let price = '';
    if (thisCourse?.price > 0) {
        price = '$' + thisCourse?.price
    } else {
        price = 'Free'
    }
    const displayMessage = () => {
        if (thisCourse?.price > 0) {
            price = '$' + thisCourse?.price;
            return <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                Add to cart
            </button>
        }
        else {
            price = 'Free'
            return <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                Enroll now
            </button>
        }
    }
    const linkVid = 'https://storage.cloud.google.com/arthub-bucket/'
    const firstVid = String(thisCourse?.sections[0]?.videos[0]?.data);
    const [activeVid, setActiveVid] = useState()
    useEffect(() => {
        if(!activeVid){
            setActiveVid(thisCourse?.sections[0]?.videos[0]?.data)
        }
    }, [thisCourse])
   
    console.log(activeVid)
    // console.log(linkVid + activeVid)
    //image

    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    const [img4, setImg4] = useState("")
    const handleIMG1 = (e) => {
        const file = e.target.files[0];
        setImg1(e.target.files[0])
    }
    const handleIMG2 = (e) => {
        const file = e.target.files[0];
        setImg2(e.target.files[0])
    }
    const handleIMG3 = (e) => {
        const file = e.target.files[0];
        setImg3(e.target.files[0])
    }
    const handleIMG4 = (e) => {
        const file = e.target.files[0];
        setImg4(e.target.files[0])
    }



    //save img
    const [detail, setDetail] = useState(false)
    const formData = new FormData();
    formData.append('one', img1);
    formData.append('two', img2);
    formData.append('three', img3);
    formData.append('four', img4);
    formData.append('courseId', thisCourse?.id);
    async function save(e) {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/image/saveCourseImages", formData).then(response => {
                setLoading(false)
                setOpen(true)
            });;
        } catch (err) {
            alert(err);
        }
    }
    //updata main image 
    const [img, setImg] = useState("")
    const handleIMG = (e) => {
        const file = e.target.files[0];
        setImg(e.target.files[0])
    }
    //console.log(img)
    const formMainImageData = new FormData();
    formMainImageData.append('courseId', thisCourse?.id);
    formMainImageData.append('image', img);
    async function saveMainImg(e) {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/course/updateMainImage", formMainImageData).then(response => {
                setLoading(false)
                setOpen(true)
            });;
        } catch (err) {
            alert(err);
        }
    }


    //
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const inputRef1 = useRef(null);
    const handleImage1Click = () => {
        inputRef1?.current.click();
    }
    const inputRef2 = useRef(null);
    const handleImage2Click = () => {
        inputRef2?.current.click();
    }
    const inputRef3 = useRef(null);
    const handleImage3Click = () => {
        inputRef3?.current.click();
    }
    const inputRef4 = useRef(null);
    const handleImage4Click = () => {
        inputRef4?.current.click();
    }
    const inputRef = useRef(null);
    const handleMainClick = () => {
        inputRef?.current.click();
    }

    //add video
    const [video, setVideo] = useState()
    const handleVideo = (e) => {
        const file = e.target.files[0];
        setVideo(e.target.files[0])
    }
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isTrial, setIsTrial] = useState(1)
    const [sectionId, setSectionId] = useState()
    const formVideoData = new FormData();
    formVideoData.append('name', name);
    formVideoData.append('data', video);
    formVideoData.append('script', description);
    formVideoData.append('isTrial', isTrial);
    formVideoData.append('sectionId', sectionId);
    const [alert, setAlert] = useState(false)
    async function addVideo(e) {
        if (video == null || name == '' || description == '') {
            setAlert(true)
        } else {
            setLoading(true)
            e.preventDefault();
            try {
                await axios.post("http://localhost:8080/video/add", formVideoData)
                    .then(response => {
                        setLoading(false)
                        setDetail(false)
                        getThisCourse();
                        setName('');
                        setDescription('');
                        setIsTrial();
                        setSectionId();
                        setVideo();
                    });
            } catch (err) {
                alert(err);
            }
        }


    }

    //delete video
    const [isopen, setIsOpen] = useState(false)
    const [videoId, setVideoId] = useState()
    const formVideoDelete = new FormData();
    formVideoDelete.append('id', videoId);
    async function deleteVideo(e) {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/video/delete", formVideoDelete)
                .then(response => {
                    setLoading(false)
                    getThisCourse()
                    setIsOpen(false)
                    setVideoId()
                });
        } catch (err) {
            alert(err);
        }

    }
    //Save course and send to admin page
    const [checkopen, setCheckOpen] = useState(false)
    const [saveopen, setSaveOpen] = useState(false)
    const formSaveCourse = new FormData();
    formSaveCourse.append('courseId', thisCourse?.id);
    formSaveCourse.append('status', 1);
    async function saveCourse(e) {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/course/updateCourseStatusTo1", formSaveCourse).then(response => {
                setLoading(false)
                setCheckOpen(false)
                setSaveOpen(true)
            });;
        } catch (err) {
            alert(err);
        }
    }
    // console.log(linkImg + thisCourse?.image)
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-purple-600 text-2xl font-bold tracking-tight text-gray-900">Main and Search Page</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative">
                            {thisCourse?.image ? (<>
                                {img ? (<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt=""
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>) : (
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={linkImg + thisCourse?.image}
                                            alt=""
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>)}
                            </>) : (
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={img ? URL.createObjectURL(img) : thisCourse?.image}
                                        alt=""
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                            )}
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {thisCourse?.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Instructor: {thisCourse?.instructorName}</p>
                                </div>
                                {thisCourse?.price === 0 ? (
                                    <p className="text-sm font-medium text-gray-900">Free</p>
                                ) : <p className="text-sm font-medium text-gray-900">${thisCourse?.price}</p>}

                            </div>
                        </div>
                        <div class="h-8 mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload1"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                            <span>Upload a file</span>
                            <input id="file-upload1" name="file-upload1" type="file" class="sr-only" onChange={(e) => handleIMG(e)} />
                        </label>
                            <p class="pl-1">or drag and drop</p>
                        </div>

                    </div>
                    <button
                        onClick={(e) => saveMainImg(e)}
                        type="button"
                        className="mt-10 flex w-1/3 items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Save Course Main Image
                    </button>
                </div>

            </div>

            <div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-purple-600 text-2xl font-bold tracking-tight text-gray-900">Course's Detail Page</h2>
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            {thisCourse?.categories?.map((cate) => (
                                <li key={cate.id}>
                                    <div className="flex items-center">
                                        <a href="" className="mr-2 text-sm font-medium text-gray-900">
                                            {cate?.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {thisCourse?.name}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div onClick={handleImage1Click} style={{ cursor: "pointer" }} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block" >
                            <input ref={inputRef1} type="file" class="sr-only" onChange={handleIMG1} style={{ display: "none" }} />
                            {thisCourse?.images?.one == null ? (<>
                                {img1 ? (<>
                                    <img
                                        // src={product.images[0].src}
                                        // alt={product.images[0].alt}
                                        src={URL.createObjectURL(img1)}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    /></>)
                                    : (<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div class="text-center"> <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                            <div class="mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload"
                                                class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                                <span>Upload a file</span>
                                            </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>)}

                            </>) : (
                                <img
                                    src={img1 ? URL.createObjectURL(img1) : (linkImg + thisCourse?.images?.one)}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />)}
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div onClick={handleImage2Click} style={{ cursor: "pointer" }} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <input ref={inputRef2} type="file" class="sr-only" onChange={handleIMG2} style={{ display: "none" }} />
                                {thisCourse?.images?.two == null ? (<>
                                    {img2 ? (<>
                                        <img
                                            src={URL.createObjectURL(img2)}
                                            alt=""
                                            className="h-full w-full object-cover object-center"
                                        /></>)
                                        : (<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div class="text-center"> <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                                <div class="mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload"
                                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                                    <span>Upload a file</span>
                                                </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>)}

                                </>) : (<>
                                    <img
                                        // src={product.images[0].src}
                                        // alt={product.images[0].alt}
                                        src={img2 ? URL.createObjectURL(img2) : (linkImg + thisCourse?.images?.two)}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    /></>)}
                            </div>
                            <div onClick={handleImage4Click} style={{ cursor: "pointer" }} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <input ref={inputRef4} type="file" class="sr-only" onChange={handleIMG4} style={{ display: "none" }} />
                                {thisCourse?.images?.four == null ? (<>
                                    {img4 ? (<>
                                        <img
                                            // src={product.images[0].src}
                                            // alt={product.images[0].alt}
                                            src={URL.createObjectURL(img4)}
                                            alt=""
                                            className="h-full w-full object-cover object-center"
                                        /></>)
                                        : (<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div class="text-center"> <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                                <div class="mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload"
                                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                                    <span>Upload a file</span>
                                                </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>)}

                                </>) : (<>
                                    <img
                                        // src={product.images[0].src}
                                        // alt={product.images[0].alt}
                                        src={img4 ? URL.createObjectURL(img4) : (linkImg + thisCourse?.images?.four)}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    /></>)}
                            </div>
                        </div>
                        <div onClick={handleImage3Click} style={{ cursor: "pointer" }} className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <input ref={inputRef3} type="file" class="sr-only" onChange={handleIMG3} style={{ display: "none" }} />
                            {thisCourse?.images?.three == null ? (<>
                                {img3 ? (<>
                                    <img
                                        // src={product.images[0].src}
                                        // alt={product.images[0].alt}
                                        src={URL.createObjectURL(img3)}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    /></>)
                                    : (<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div class="text-center"> <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                            <div class="mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload"
                                                class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                                <span>Upload a file</span>
                                                {/* <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={handleIMG3} /> */}
                                            </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>)}

                            </>) : (<>
                                <img
                                    // src={product.images[0].src}
                                    // alt={product.images[0].alt}
                                    src={img3 ? URL.createObjectURL(img3) : (linkImg + thisCourse?.images?.three)}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                /></>)}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{thisCourse?.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{price}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-purple-600 hover:text-purple-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Includes */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">This course includes:</h3>
                                    <div className="mt-4">
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {includes?.map((include) => (
                                                <li key={include} className="text-gray-400">
                                                    <span className="text-gray-600">{include}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Sizes
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                      Size guide
                    </a>
                  </div>
                </div> */}
                                {/* {thisCourse?.price > 0 && isLearn ? (
                                          <p className="text-sm font-medium text-gray-900">Free</p>
                                      ) : <p className="text-sm font-medium text-gray-900">{product.price}</p>} */}
                                {/* <Link to={`/learning/${id}`}> <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {enroll}
                  </button></Link> */}
                                {displayMessage()}
                                <button
                                    onClick={(e) => save(e)}
                                    type="button"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    Save Course
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Introduction</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{thisCourse?.introduction}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">What you'll learn</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{thisCourse?.learningObjective?.one}</span>
                                        </li>
                                    </ul>
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{thisCourse?.learningObjective?.two}</span>
                                        </li>
                                    </ul>
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{thisCourse?.learningObjective?.three}</span>
                                        </li>
                                    </ul>
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{thisCourse?.learningObjective?.four}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                <div className="mt-4 space-y-6">
                                    {/* {thisCourse.descriptions.map((description) => ( */}
                                    <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{__html: thisCourse?.description}}></p>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section  */}

            </div>
            {/* content */}
            <h2 className="text-purple-600 ml-36 text-2xl font-bold tracking-tight text-gray-900">Learning Page</h2>
            <div className="flex flex-row w-full h-full pt-4 ">

                <Video
                    link={activeVid} />
                <div
                    className="w-3/6 bg-white
                           overflow-y-scroll flex flex-col 
                           mt-4 mr-20 border-slate-200 
                           border-2 rounded-lg"
                    style={{ height: "min(38vw, 650px)" }}
                >
                    <h3 className="ml-2 text-xl p-2 font-semibold">Course Content</h3>
                    {thisCourse?.sections?.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                                <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">

                                            <span className="font-medium text-gray-900">{section.section_name}</span>

                                            <span className="ml-6 flex items-center">
                                                {open ? (
                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                        <button type="submit"
                                            onClick={() => {
                                                setDetail(true);
                                                setSectionId(section.section_id)
                                            }}
                                            class="w-1/3 rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                            Add video</button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                            {section.videos.map((video) => (
                                                <div key={video.id} className="flex items-center"
                                                    onClick={() => {
                                                        setActiveVid(video.data);
                                                    }}>
                                                    <PlayIcon class="h-6 w-6 text-gray-500" />
                                                    <label
                                                        // htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                        className={video.data === activeVid ? ("bg-gray-200 p-2 rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500") : ("hover:bg-gray-200 p-2 rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500")}
                                                    >
                                                        {video.name}
                                                    </label>
                                                    <button type="submit"
                                                        onClick={() => {
                                                            setIsOpen(true);
                                                            setVideoId(video.id)
                                                        }}
                                                        class="w-1/3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Delete video</button>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                    {/* {thisCourse?.sections?.map((section) => (<>
                        <h3 key={section.section_id} className="text-2xl p-2 font-semibold">Section: {section.section_name}</h3>
                        <button type="submit"
                            onClick={() => {
                                setDetail(true);
                                setSectionId(section.section_id)
                            }}
                            class="w-1/3 rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Add video</button>
                        {section.videos.map((video) => (
                            <div key={video.id}
                                className={activeVid === video.data ? ("bg-gray-200 p-2 rounded-xl h-2/6 ") : ("hover:bg-gray-200 p-2 rounded-xl h-2/6 ")}
                                onClick={() => {
                                    setActiveVid(video.data);
                                }}
                            >
                                <PlayIcon class="h-6 w-6 text-gray-500" />
                                <p
                                    className="ml-2 font-semibold 
                                          pl-6 text-sm"
                                >
                                    {video.name}
                                </p>
                                <p className="px-2 text-sm">{video.script}</p>
                                <button type="submit"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setVideoId(video.id)
                                    }}
                                    class="w-1/3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Delete video</button>
                            </div>))}
                    </>
                    ))} */}
                </div>
            </div>

            {/* details */}
            <CourseOverview />
            {/* <div className="isolate bg-white px-6 py-24 sm:py-0 lg:px-24">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">About this course</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{thisCourse?.name}</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Instructor</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.instructorName}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.instructorEmail}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Level / Language / Price</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.level} / {thisCourse?.language} / {thisCourse?.price}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Course introduction</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.introduction}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {thisCourse?.description}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">About Instructor</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {thisCourse?.bio}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Extension Files</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
                {thisCourse?.status == 0 ? (
                    <button type="submit"
                        onClick={() => setCheckOpen(true)}
                        class="mb-4 mt-4 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                        Save course</button>
                ) : (<></>)}

            </div> */}

            {thisCourse?.status == 0 ? (
                <button type="submit"
                    onClick={() => setCheckOpen(true)}
                    class="ml-60 mb-4 mt-4 flex w-2/3 justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                    Save course</button>
            ) : (<></>)}
            {/* notification */}
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
                                                    Course Update Successfully
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
                                            onClick={() => setOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
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
            {/* add video */}
            <Transition.Root show={detail} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setDetail}>
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
                                <Dialog.Panel className="flex w-100 transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex w-100 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        {/* content */}
                                        <div className="rounded-lg h-full w-full">
                                            {video == null ? (<>
                                                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <div class="text-center"> <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                                        fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                        <div class="mt-4 flex text-sm leading-6 text-gray-600"> <label for="file-upload"
                                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                                            <span>Upload a file</span> <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={(e) => handleVideo(e)} />
                                                        </label>
                                                            <p class="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </>) : (<>
                                                <div className="pr-32 px-2 pt-2 rounded-xl" style={{ width: "920px", height: "500px" }}>
                                                    <iframe allowFullScreen={true} src={URL.createObjectURL(video)} className="w-full h-5/6"></iframe>
                                                </div>


                                            </>)}
                                            <div> <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Video name</label>
                                                <div class="mt-2"> <input id="name" name="name" type="text" autoComplete="name" required
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex items-center justify-between"> <label for="text"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Video Description</label>
                                                </div>
                                                <div class="mt-2"> <input id="text" name="text" type="text" autoComplete="current-text"
                                                    required value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }}
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex items-center justify-between"> <label for="trial"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Type of video?</label><a href="#"
                                                        class="font-semibold leading-6 text-purple-600 hover:text-purple-500 text-sm">Learn more</a>
                                                </div>
                                                <select id="country" name="country" autoComplete="country-name"
                                                    value={isTrial}
                                                    onChange={(e) => {
                                                        setIsTrial(e.target.value);
                                                    }}
                                                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6">
                                                    <option value={1}>Preview</option>
                                                    <option value={0}>Private</option>
                                                </select> </div>
                                            <button type="submit"
                                                onClick={(e) => addVideo(e)}
                                                class="mt-4 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                                Save video</button>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* notification */}
            <Transition.Root show={isopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                                                    Are you sure you want to delete this video?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Clicking Accept means permanently deleting the video.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => deleteVideo(e)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setIsOpen(false)}
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
            {/* save course alert */}
            <Transition.Root show={checkopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setCheckOpen}>
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
                                                    Are you sure you want to save this course?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Clicking accept means agreeing to post the course on ArtHub and wait for moderation.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => saveCourse(e)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setCheckOpen(false)}
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
            {/* save course success */}
            <Transition.Root show={saveopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSaveOpen}>
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
                                                    Save Course Success.
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Congratulations on your successful course upload.
                                                        ArtHub sincerely thanks you for your contribution to our platform.
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Your course is currently waiting to be approved by ArtHub's moderators.
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        A notification email will be sent to you soon.
                                                        Please check your email to receive information as soon as possible
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setSaveOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setSaveOpen(false)}
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
            {/* alert */}
            <Transition.Root show={alert} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setAlert}>
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
                                                    Please input all fields including video!
                                                </Dialog.Title>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                setAlert(false)
                                                setDetail(true)
                                            }}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={loading} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLoading}>
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
                                                <CodeBracketIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Loading ...
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Your request is being processed. Please wait a moment.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}