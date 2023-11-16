import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import apiCourse from '../api/axiosCourseConfig'
import { Link } from 'react-router-dom'
// const product = {
//     name: 'Basic Tee 6-Pack ',
//     price: '$192',
//     rating: 3.9,
//     reviewCount: 117,
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
//     imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
//     colors: [
//         { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//         { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//     ],
//     sizes: [
//         { name: 'XXS', inStock: true },
//         { name: 'XS', inStock: true },
//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: true },
//         { name: 'XXL', inStock: true },
//         { name: 'XXXL', inStock: false },
//     ],
// }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const products = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
]
export default function AccountPurchase() {
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const [allcourses, setAllCourses] = useState()
    const getAllCourses = async () => {
        try {
            const response = await apiCourse.get("/getCourses");
            setAllCourses(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllCourses();
    }, []
    )
    //get purchase history by account id
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const form = new FormData()
    form.append("accountId", thisAccount?.id)
    const [courses, setCourses] = useState()
    const getCourses = async () => {
        try {
            const response = await axios.post("https://arthubplatform1.azurewebsites.net/learner/showStudentPurchase", form);
            setCourses(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourses();
    }, []
    )
    const [open, setOpen] = useState(false)
    const [courseId, setCourseId] = useState('')
    const [orderDate, setOrderDate] = useState('')
    const product = allcourses?.find((course) => course.id == courseId)
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Purchase History</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/*content */}
                    {courses?.length > 0 ? <><h2 class="text-base font-semibold leading-7 text-gray-900">Click on the course to see detailed payment history</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" >

                        {courses?.map((product) => (
                            <div key={product.id} className="group cursor-pointer" onClick={() => {
                                setCourseId(product.courseId)
                                setOrderDate(product.date)
                                setOpen(true)
                            }}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={linkImg + product.course.image}
                                        alt=""
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.course.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.course.price}</p>
                            </div>
                        ))}
                    </div> </>:<h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-96">You don't have any course purchases.</h1> }
                    {/* <div className="bg-white" onClick={() => setOpen(true)}> */}
                    {/* <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"> */}
                    
                    {/* </div>
                    </div> */}
                </div>
            </main>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                                <img src={linkImg + product?.image} alt="" className="object-cover object-center" />
                                            </div>
                                            <div className="sm:col-span-8 lg:col-span-7">
                                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>

                                                <section aria-labelledby="information-heading" className="mt-2">
                                                    <h3 id="information-heading" className="sr-only">
                                                        Product information
                                                    </h3>

                                                    <p className="text-2xl text-gray-900">${product?.price}</p>

                                                    {/* Reviews */}
                                                    <div className="mt-6">
                                                        <h4 className="sr-only">Reviews</h4>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center">
                                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                                    <StarIcon
                                                                        key={rating}
                                                                        className={classNames(
                                                                            4 > rating ? 'text-gray-900' : 'text-gray-200',
                                                                            'h-5 w-5 flex-shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="sr-only">{product?.rating} out of 5 stars</p>
                                                            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                117 reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                </section>

                                                <section aria-labelledby="options-heading" className="mt-10">
                                                    <h3 id="options-heading" className="sr-only">
                                                        Product options
                                                    </h3>

                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">Payment details</h3>
                                                        <div className="mt-4">
                                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                                <li className="text-gray-400">
                                                                    <span className="text-gray-600">Ordered: {orderDate.split('T')[0]}</span>
                                                                </li>
                                                                <li className="text-gray-400">
                                                                    <span className="text-gray-600">Amount: ${product?.price}</span>
                                                                </li>
                                                                {product?.coupon > 0 ? 
                                                                <li className="text-gray-400">
                                                                    <span className="text-gray-600">Coupon: {product?.coupon}</span>
                                                                </li> : 
                                                                <li className="text-gray-400">
                                                                    <span className="text-gray-600">Coupon: None</span>
                                                                </li>}
                                                                
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <form>
                                                        <Link to={`/learning/${product?.id}`}> <button
                                                            type="submit"
                                                            //className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
                                                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Go to course
                                                        </button></Link>
                                                    </form>
                                                </section>
                                            </div>
                                        </div>
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