import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Video from "../learning/Video";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect} from 'react';
import apiCourse from '../api/axiosCourseConfig'
import { useNavigate } from 'react-router-dom';
import img from '../assets/image/course-01.jpg'
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
    const thisCourse = courses?.find((course) => String(course.id) === id)

    const navigate = useNavigate()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const isOwn = courses?.find((course) => course.accountId === thisAccount.id)
    if(isOwn == null) {
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
    const [activeVid, setActiveVid] = useState("https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH")
    const [actTitle, setActTitle] = useState("SZA - Snooze");
    const [description, setActiveDescription] = useState("My favorite song from my celebrity crush")
    //img config
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
                                    src={linkImg+thisCourse?.images?.three}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                // src={product.images[3].src}
                                // alt={product.images[3].alt}
                                src={linkImg+thisCourse?.images?.four}
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
                                    <p className="text-sm text-gray-600">{thisCourse?.description}</p>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section  */}

            </div>
            {/* content */}
            <div className="flex flex-row w-11/12 h-full pt-2">
                <Video
                    link={activeVid}
                    title={actTitle}
                    description={description}
                />
                <div
                    className="w-3/6 shadow-lg shadow-gray-600 
                           overflow-y-scroll flex flex-col 
                           mt-4 mr-20 border-slate-200 
                           border-2 rounded-lg"
                    style={{ height: "min(38vw, 650px)" }}
                >
                    <h3 className="text-2xl p-2 font-semibold">Section 1</h3>
                    <p className="px-2">All video in section 1</p>
                    {datas.map((data) => (
                        <div key={data.title}
                            className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       shadow-xl shadow-gray-300"
                            onClick={() => {
                                setActiveVid(data.link);
                                setActTitle(data.title);
                                setActiveDescription(data.description);
                            }}
                        >
                            <PlayIcon class="h-6 w-6 text-gray-500" />
                            {/* <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={data.img}
                                    // {"." + thisCourse?.image}
                                /> */}
                            <p
                                className="ml-2 font-semibold 
                                          pl-6 text-sm"
                            >
                                {data.title}
                            </p>
                            <p className="px-2 text-sm">{data.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* details */}
            <div className="isolate bg-white px-6 py-24 sm:py-0 lg:px-24">
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
            </div>
        </>
    )
}