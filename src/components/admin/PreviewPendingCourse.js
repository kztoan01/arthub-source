import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Video from "../learning/Video";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import apiCourse from '../api/axiosCourseConfig'
import { useNavigate } from 'react-router-dom';
import img from '../assets/image/course-01.jpg'
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

export default function PreviewPendingCourse(props) {

    const [courses, setCourses] = useState()
    //get all courses
    const getCourses = async () => {
        try {
            const response = await apiCourse.get("/getCourses");
            console.log(response.data)
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

    const navigate = useNavigate()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    // const isOwn = courses?.find((course) => course.accountId === thisAccount.id)
    // if(isOwn == null) {
    //     navigate('/')
    // }
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
        if (!activeVid) {
            setActiveVid(thisCourse?.sections[0]?.videos[0]?.data)
        }
    }, [thisCourse])

    //img config
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    console.log(linkImg + thisCourse?.images?.two)
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-purple-600 text-2xl font-bold tracking-tight text-gray-900">Main and Search Page</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={linkImg + thisCourse?.image}
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
                    </div>
                    </div>
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
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                // src={product.images[0].src}
                                // alt={product.images[0].alt}
                                src={linkImg + thisCourse?.images?.one}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    // src={product.images[1].src}
                                    // alt={product.images[1].alt}
                                    src={linkImg + thisCourse?.images?.two}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    // src={product.images[2].src}
                                    // alt={product.images[2].alt}
                                    src={linkImg + thisCourse?.images?.four}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                // src={product.images[3].src}
                                // alt={product.images[3].alt}
                                src={linkImg + thisCourse?.images?.three}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
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
                                    <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: thisCourse?.description }}></p>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section  */}

            </div>
            {/* content */}
            <div className="flex flex-row w-full h-full pt-4 ">
                <Video
                    link={activeVid}
                />
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
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
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
            </div> */}
        </>
    )
}