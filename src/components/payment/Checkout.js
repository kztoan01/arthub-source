import { CLIENT_ID } from '../../config/Config'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import apiCourse from '../api/axiosCourseConfig'
import { ShopContext } from '../coursepage/shop-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
import apiLearner from '../api/axiosLearnerConfig'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Checkout() {
    //get account
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    //Get courses
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
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

    //get learner
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
    //CART
    const { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, checkout } =
        useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const cartproducts = courses?.filter((course) => cartItems[course.id] === true);

    //
    const countries = ["China", "Russia", "UK"];
    const [menu, setMenu] = useState(false);
    const [country, setCountry] = useState("United States");

    const changeText = (e) => {
        setMenu(false);
        setCountry(e.target.textContent);
    };
    //paypal
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "ArtHub Cart Payment",
                    amount: {
                        currency_code: "USD",
                        value: totalAmount,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            setShow(false)
            setOpen(true)
            checkout()
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <div className="flex justify-center items-center">
                    <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                        <div className="flex flex-col justify-start items-start w-full space-y-9">
                            <div className="flex justify-start flex-col items-start space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Check out</h1>
                                <p className="text-base leading-normal sm:leading-4 text-gray-600">
                                    Order details
                                </p>
                            </div>
                            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                                {/* show cart */}
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartproducts?.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={linkImg + product.image}
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="">{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">${product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">By {product.instructorName}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        5
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    5 > rating ? 'text-purple-600' : 'text-purple-200',
                                                                    'h-5 w-5 flex-shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">{product.language} / {product.level}</p>

                                                        <div className="flex">
                                                            <button
                                                                onClick={() => removeFromCart(parseInt(product.id))}
                                                                type="button"
                                                                className="font-medium text-purple-600 hover:text-purple-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    {cartproducts?.map((product) => (
                                        <Link to={`/${product.id}`}><div key={product.id} className="group relative">
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                <img
                                                    src={linkImg + product.image}
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
                                </div> */}

                                <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                                    <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                                        <div>
                                            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                                                    fill="currentColor"
                                                />
                                                <path d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-base leading-4">Pay</p>
                                        </div>
                                    </button>
                                    <div className="flex flex-row justify-center items-center mt-6">
                                        <hr className="border w-full" />
                                        <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or pay with Paypal</p>
                                        <hr className="border w-full" />
                                    </div>
                                    <button onClick={() =>{
                                        if(show) {
                                           setShow(false) 
                                        }else{
                                            setShow(true)
                                        }
                                        
                                        } } className="mt-4 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                                        <div>
                                            {/* <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                                                    fill="currentColor"
                                                />
                                                <path d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z" fill="currentColor" />
                                            </svg> */}
                                        </div>
                                        <div>
                                            <p className="text-base leading-4">PayPal</p>
                                        </div>
                                    </button>
                                    {show ? (
                                        <PayPalButtons className='mt-4'
                                            style={{ layout: "vertical" }}
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                        />
                                    ) : null}

                                    <div className="flex flex-row justify-center items-center mt-6">
                                        <hr className="border w-full" />
                                        <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or pay with card</p>
                                        <hr className="border w-full" />
                                    </div>

                                    <div className="mt-8">
                                        <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Email" />
                                    </div>

                                    <label className="mt-8 text-base leading-4 text-gray-800">Card details</label>
                                    <div className="mt-2 flex-col">
                                        <div>
                                            <input className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="0000 1234 6549 15151" />
                                        </div>
                                        <div className="flex-row flex">
                                            <input className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="MM/YY" />
                                            <input className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="CVC" />
                                        </div>
                                    </div>

                                    <label className="mt-8 text-base leading-4 text-gray-800">Name on card</label>
                                    <div className="mt-2 flex-col">
                                        <div>
                                            <input className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Name on card" />
                                        </div>
                                    </div>

                                    <label className="mt-8 text-base leading-4 text-gray-800">Country or region</label>
                                    <div className="mt-2 flex-col">
                                        <div className="relative">
                                            <button className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white" type="email">
                                                {country}
                                            </button>
                                            <svg onClick={() => setMenu(!menu)} className={"transform  cursor-pointer absolute top-4 right-4 " + (menu ? "rotate-180" : "")} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.5 5.75L8 10.25L12.5 5.75" stroke="#27272A" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className={"mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " + (menu ? "block" : "hidden")}>
                                                {countries.map((country) => (
                                                    <div key={country} className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2" onClick={changeText}>
                                                        {country}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <input className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="ZIP" />
                                    </div>

                                    <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                                        <div>
                                            <p className="text-base leading-4">Pay ${totalAmount}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>

            </div>
            {/* notify */}
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
                                                    Payment success
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Great choice, {thisAccount?.firstname}. Click Done to go to the course content now!
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ArtHub and its instructors thank you for trusting and choosing us.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link to={`/account/learning`}><button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                getLearner()
                                                setOpen(false)
                                            }}
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
        </PayPalScriptProvider>
    );
}

export default Checkout