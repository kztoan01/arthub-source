import { Link, Navigate, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import apiLearner from '../api/axiosLearnerConfig'
import apiCourse from '../api/axiosCourseConfig'
import { courses } from '../data/Courses'
import { useContext } from 'react'
import { ShopContext } from './shop-context'
import { PlayIcon } from "@heroicons/react/24/solid";
import ceo from '../assets/image/toan.jpg'
import {Disclosure, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
const includes = [
  '15.5 hours on-demand video.',
  '1 article.',
  '6 downloadable resources',
  'Access on mobile and TV',
  'Certificate of completion',
]
const posts = [
  {
    id: 1,
    title: 'This course was amazing!',
    href: '#',
    description:
      "I have fun watching and listening to Henri's way of thinking to observe the facial features. A lot of important details where shared on how to approach the images. Ready to practice a lot and think more of a cartoonish way of drawing.",
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Trần Bảo Toàn',
      role: 'Founder / CTO',
      href: '#',
      imageUrl:
        ceo,
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },


  // More posts...
]

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function CoursePreview(props) {
  //galgry
  const [activeVid, setActiveVid] = useState("https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH")
  const [actTitle, setActTitle] = useState("SZA - Snooze");
  const [description, setActiveDescription] = useState("My favorite song from my celebrity crush")
  // cart
  const { addToCart, cartItems } = useContext(ShopContext);

  // const cartItemCount = cartItems[id];

  //---------
  // const [courses, setCourses] = useState()
  // const getCourses = async () => {
  //   try {
  //     const response = await apiCourse.get("/getCourses");
  //     setCourses(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []
  // )
  const [learner, setLearner] = useState()
  const getLearner = async () => {
    try {
      const response = await apiLearner.get("/getLearners");
      setLearner(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLearner();
  }, []
  )
  const [detail, setDetail] = useState(false)
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null)
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount?.id);
  const { id } = useParams()
  //const thisCourse = courses?.find((course) => String(course.id) === id)
  //get this course
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
  const isLearn = thisStudent?.find((course) => course.courseId === thisCourse?.id)
  let price = '';
  const navigate = useNavigate();
  if (thisCourse?.price > 0) {
    price = '$' + thisCourse?.price
  } else {
    price = 'Free'
  }
  const formData = new FormData();
  formData.append('courseId', thisCourse?.id);
  formData.append('accountId', thisAccount?.id);
  async function enrollFree(e) {
    e.preventDefault();
    if (localStorage.getItem("STU-authenticated")) {
      try {
        await axios.post("http://localhost:8080/course/enrol", formData).then(response => {
          setOpen(true)
          getLearner()
        })
      } catch (err) {
        alert(err);
      }
    } else {
      navigate('/login')
    }

  }
  const displayMessage = () => {

    if (thisCourse?.price > 0) {
      price = '$' + thisCourse?.price;
      if (isLearn) {
        return <Link to={`/learning/${id}`}> <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Go to course
        </button></Link>
      } else {
        return <button
          onClick={() => addToCart(parseInt(thisCourse?.id))}
          type="button"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Add to cart
        </button>
      }
    } else if (isLearn) {
      return <Link to={`/learning/${id}`}> <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Go to course
      </button></Link>
    }
    else {
      price = 'Free'
      return <button onClick={enrollFree}
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Enroll now
      </button>
    }
  }
  // const [courses, setCourses] = useState();

  // const getCourses = async () => {
  //   try {
  //     const response = await apiCourse.get("/getCourses");
  //     console.log(response.data)
  //     setCourses(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []
  // )
  const linkImg = 'http://localhost:8080//images//'
  const linkVid = 'http://localhost:8080//videos//'
  return (
    <>
      <div className="bg-white">
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
                <h3 className="text-xl font-medium text-gray-900">What you'll learn</h3>

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
                <h2 className="text-xl font-medium text-gray-900">Description</h2>

                <div className="mt-4 space-y-6">
                  {/* {thisCourse.descriptions.map((description) => ( */}
                  <p className="text-sm text-gray-600">{thisCourse?.description}</p>
                  {/* ))} */}
                </div>
              </div>
              {/* gallery */}
              <div className="mt-10">
                <h2 className="text-xl font-medium text-gray-900">Course content</h2>
                {thisCourse?.sections?.map((section) => (
                      <Disclosure as="div" key={section.id} className="mt-8 border-t border-gray-200 px-4 py-6">
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
                                    if (video.trial === true) {
                                      setDetail(true)
                                      setActiveVid(video.data);
                                    }
                                  }}>
                                    {/* <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    /> */}
                                     <PlayIcon class="h-6 w-6 text-gray-500" />
                                    <label
                                      // htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="hover:bg-gray-200 p-2
                                      rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                       {video.trial === true ? video.name + " - Preview Available": video.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
               {/* <div
                  className="mt-8  
                           overflow-y-scroll flex flex-col 
                           mt-4 mr-20 border-slate-200 
                           border-2 rounded-lg"
                  style={{ height: "min(38vw, 650px)" }}
                >
                  {thisCourse?.sections?.map((section) => (
                    <>
                      <h3 className="text-xl p-2 font-semibold">{section.section_name}</h3>
                      {section.videos.map((video) => (
                        <div key={video.id}
                          className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       "
                          onClick={() => {
                            if (video.trial === true) {
                              setDetail(true)
                              setActiveVid(video.data);
                            }
                          }}
                        >
                          <PlayIcon class="h-6 w-6 text-gray-500" />
                          {video.trial === true ? (
                            <p
                              className="ml-2 font-semibold 
                                          pl-6 text-sm"
                            >
                              {video.name} - Preview Available
                            </p>) : (
                            <p
                              className="ml-2 font-semibold 
                                          pl-6 text-sm"
                            >
                              {video.name}
                            </p>
                          )}

                          <p className="px-2 text-sm">{video.script}</p>
                        </div>
                      ))}
                    </>))}

                </div> */}
              </div>
              {/* reviews */}
              <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <h2 className="text-xl font-medium text-gray-900">Reviews</h2>
                  <div className="mt-4 space-y-6">
                    {posts.map((post) => (
                      <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs mt-4">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.date}
                          </time>
                          <a
                            href={post.category.href}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {post.category.title}
                          </a>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a href={post.href}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </a>
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                          <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-gray-600">{post.author.role}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  notification */}
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
                            Enroll Course Successfully
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Great choice, {thisAccount?.firstname}. Click Done to go to the course content now!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Link to={`/learning/${id}`}><button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Done
                      </button></Link>
                      <Link to="/search" ><button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button></Link>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* preview video  */}
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
                  <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <div className="rounded-lg h-full w-full">
                    <h3 className="text-xl font-medium text-gray-900">{thisCourse?.name}</h3>
                    <p className="mt-2 font-medium text-gray-900">Preview Video</p>
                      <div className="pt-12 pr-32 px-2 pt-2 rounded-xl" style={{ width: "920px", height: "500px" }}>
                        <iframe allowFullScreen={true} src={linkVid + activeVid} className="w-full h-5/6"></iframe>
                      </div>
                     
                    </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  )
}