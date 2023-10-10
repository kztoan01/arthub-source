import { Link, Navigate, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
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

export default function CoursePreview(props) {
  // document.addEventListener('DOMContentLoaded', function () {
  //   var elems = document.querySelectorAll('.collapsible');
  //   var instances = M.Collapsible.init(elems, options);
  // });
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null)
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const thisStudent = props.learner?.filter((learner) => learner.accountId === thisAccount?.id);
  const { id } = useParams()
  const thisCourse = props.courses?.find((course) => String(course.id) === id)
  const isLearn = thisStudent?.find((course) => course.courseId === thisCourse?.id)
  let price = '';
  const navigate = useNavigate();
  if (thisCourse?.price > 0) {
    price = '$' + thisCourse?.price
  } else {
    price = 'Free'
  }
  async function enrollFree(e) {
    e.preventDefault();
    if (localStorage.getItem("STU-authenticated")) {
      try {
        await axios.post("http://localhost:8080/learner/addLearner", {
          accountId: thisAccount.id,
          courseId: thisCourse.id,
          price: thisCourse.price
        });
        setOpen(true)
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
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go to course
        </button></Link>
      } else {
        return <Link to='/'> <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to cart
        </button></Link>
      }
    } else if (isLearn) {
      return <Link to={`/learning/${id}`}> <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go to course
      </button></Link>
    }
    else {
      price = 'Free'
      return <button onClick={enrollFree}
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                src={thisCourse?.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  // src={product.images[1].src}
                  // alt={product.images[1].alt}
                  src={thisCourse?.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  // src={product.images[2].src}
                  // alt={product.images[2].alt}
                  src={thisCourse?.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                // src={product.images[3].src}
                // alt={product.images[3].alt}
                src={thisCourse?.image}
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
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
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
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>
              </div> */}
                {/* {thisCourse?.price > 0 && isLearn ? (
                                        <p className="text-sm font-medium text-gray-900">Free</p>
                                    ) : <p className="text-sm font-medium text-gray-900">{product.price}</p>} */}
                {/* <Link to={`/learning/${id}`}> <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                  <p className="text-sm text-gray-600">{thisCourse?.description}</p>
                  {/* ))} */}
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
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
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
        {/* section  */}

      </div>
    </>
  )
}