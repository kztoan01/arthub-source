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
const datas = [
  {
    img:
      "https://i.ytimg.com/vi/Sv5yCzPCkv8/maxresdefault.jpg",
    link: "https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH",
    title: "SZA - Snooze",
    description: "My favorite song from my celebrity crush",
  },
  {
    img:
      "https://i.ytimg.com/vi/TzECmqe61_g/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/TzECmqe61_g?si=fLiVfe0jvk0kSV3w",
    title: "Zola - Belles Femmes",
    description: "Belles Femmes - nouveau titre de Zola.",
  },
  {
    img:
      "https://i.ytimg.com/vi/l5M64JuiZAE/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/l5M64JuiZAE?si=bXwI1IYcPmpRTPTm",
    title: "21 Savage - Can't Leave Without It",
    description: "The best rap song. Indeed",
  },
  {
    img:
      "https://i.ytimg.com/vi/arB4LBg_80M/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/xvDPtb6_IoM?si=yBYeibWoRJfrz9zl",
    title: "No Auto Durk",
    description: "My favorite of Lil Durk",
  },
  {
    img:
      "https://i.ytimg.com/vi/51vVIvPl_EA/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/u0LaoQks5mY?si=39iqnpzjauJqiooR",
    title: "Migos - Need It (Official Video) ft. YoungBoy Never Broke Again",
    description: "I said I neededdddd",
  },
  {
    img:
      "https://i.ytimg.com/vi/nCglrp951YI/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/nCglrp951YI?si=ZE7bCg30MCvhyYUO",
    title: "Offset - Legacy ft. Travis Scott, 21 Savage",
    description: "ft. 21 Savage on top",
  },
  {
    img:
      "https://images.genius.com/31496d46a302dd9b55416525688ac9d9.1000x1000x1.png",
    link:
      "https://www.youtube.com/embed/I4DjHHVHWAE?si=kPxOXPWjIdLEJoLb",
    title: "Drake, 21 Savage - Rich Flex",
    description: "Can 21 do something for Drake?",
  },
  {
    img:
      "https://i.ytimg.com/vi/vpubBZdPbtg/maxresdefault.jpg",
    link:
      "https://www.youtube.com/embed/vpubBZdPbtg?si=etXFyjCSBOzCISAw",
    title: "Cảm ơn - Ngài ft Rush",
    description: "Ngài comeback",
  },
];

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
  const thisCourse = courses?.find((course) => String(course.id) === id)
  const isLearn = thisStudent?.find((course) => course.courseId === thisCourse?.id)
  let price = '';
  const navigate = useNavigate();
  console.log(thisCourse?.id)
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
    console.log(linkImg+thisCourse?.images?.two)
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
                src={linkImg+thisCourse?.images?.one}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  // src={product.images[1].src}
                  // alt={product.images[1].alt}
                  src={linkImg+thisCourse?.images?.two}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  // src={product.images[2].src}
                  // alt={product.images[2].alt}
                  src={linkImg+thisCourse?.images?.four}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                // src={product.images[3].src}
                // alt={product.images[3].alt}
                src={linkImg+thisCourse?.images?.three}
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
                <div
                  className="mt-8  
                           overflow-y-scroll flex flex-col 
                           mt-4 mr-20 border-slate-200 
                           border-2 rounded-lg"
                  style={{ height: "min(38vw, 650px)" }}
                >

                  <h3 className="text-xl p-2 font-semibold">Section 1</h3>
                  <p className="px-2">Introduction</p>
                  {datas.map((data) => (
                    <div key={data.title}
                      className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       "
                      onClick={() => {
                        if (data.title === "SZA - Snooze") {
                          setDetail(true)
                          setActiveVid(data.link);
                          setActTitle(data.title);
                          setActiveDescription(data.description);
                        }
                      }}
                    >
                      <PlayIcon class="h-6 w-6 text-gray-500" />
                      {/* <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={data.img}
                                    // {"." + thisCourse?.image}
                                /> */}
                      {data.title === "SZA - Snooze" ? (
                      <p
                        className="ml-2 font-semibold 
                                          pl-6 text-sm"
                      >
                        {data.title} - Preview Available
                      </p>) : (<p
                        className="ml-2 font-semibold 
                                          pl-6 text-sm"
                      >
                        {data.title}
                      </p>)}

                      <p className="px-2 text-sm">{data.description}</p>
                    </div>
                  ))}
                </div>
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
                      <div className="w-screen flex h-screen flex-row mx-12">
                        <div className="w-full h-full  px-2 pt-2 
                            rounded-xl">
                          <iframe src={activeVid} className="w-full h-5/6"></iframe>
                          <div className="pt-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Title: {actTitle}
                            <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              Description:{description}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div class="border-b border-gray-900/10 pb-12">
                                            <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                            {String(thisAccount?.roleId) === "4" ? <p class="mt-1 text-sm leading-6 text-gray-600">Administrator</p>
                                            : <></>}
                                            {String(thisAccount?.roleId) === "3" ? <p class="mt-1 text-sm leading-6 text-gray-600">Staff</p>
                                            : <></>}
                                            {String(thisAccount?.roleId) === "2" ? <p class="mt-1 text-sm leading-6 text-gray-600">Student</p>
                                            : <></>}
                                            {String(thisAccount?.roleId) === "1" ? <p class="mt-1 text-sm leading-6 text-gray-600">Instructor</p>
                                            : <></>}
                                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div class="sm:col-span-3"> <label for="first-name"
                                                    class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                                    <div class="mt-2"> <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                                    value={thisAccount?.firstname} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-3"> <label for="last-name"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                                    <div class="mt-2"> <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                    value={thisAccount?.lastname} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-4"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                                    address</label>
                                                    <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email"
                                                    value={thisAccount?.email} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-4"> <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                                    <div class="mt-2"> <input id="phone" name="phone" type="text" autocomplete=""
                                                    value={thisAccount?.phone} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="col-span-full"> <label for="street-address"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                                    <div class="mt-2"> <input type="text" name="street-address" id="street-address"
                                                    value={thisAccount?.address} readOnly
                                                        autocomplete="street-address"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-2 sm:col-start-1"> <label for="city"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Facebook</label>
                                                    <div class="mt-2"> <input type="text" name="facebook" id="facebook" autocomplete="facebook"
                                                    value={thisAccount?.facebook} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-2"> <label for="region"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Twitter</label>
                                                    <div class="mt-2"> <input type="text" name="twitter" id="twitter" autocomplete="twitter"
                                                    value={thisAccount?.twitter} readOnly
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                                <div class="sm:col-span-2"> <label for="postal-code"
                                                    class="block text-sm font-medium leading-6 text-gray-900">GitHub</label>
                                                    <div class="mt-2"> <input type="text" name="github" id="github" autocomplete="github"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
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