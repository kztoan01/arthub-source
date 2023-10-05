import logo from '../assets/image/ArtHub-logos_black.png'
import { BrowerRoute as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import api from '../api/axiosAccountConfig'
// import { users } from '../data/ListOfCategories.js'
function Login(props) {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const users = props.users;
    console.log(users)
    //local storage, session
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const handleSubmit = (e) => {
        e.preventDefault()
        // const thisCourse = props.courses?.find((course) => String(course.id) === id)
        const account = users?.find((user) => user.email === email);
        if (account && account.password === password) {
            if (account && account.roleId === "1") {
                if(localStorage.getItem("STU-authenticated")){
                    localStorage.removeItem("STU-authenticated")
                }
                setauthenticated(true)
                localStorage.setItem("INS-authenticated", true);
                localStorage.setItem("logined", JSON.stringify(account) );
                // console.log(account)
                navigate("/instructordashboard");
            } else if(account && account.roleId === "2"){
                if(localStorage.getItem("INS-authenticated")){
                    localStorage.removeItem("INS-authenticated")
                }
                setauthenticated(true)
                localStorage.setItem("STU-authenticated", true);
                localStorage.setItem("logined",JSON.stringify(account) );
                // console.log(account)
                navigate("/");
            } else if(account && account.roleId === "3"){
                navigate("/3");
            }else {
                if(localStorage.getItem("INS-authenticated") || localStorage.getItem("STU-authenticated")){
                    localStorage.removeItem("INS-authenticated")
                    localStorage.removeItem("STU-authenticated")
                }
                setauthenticated(true)
                localStorage.setItem("AD-authenticated", true);
                localStorage.setItem("logined",JSON.stringify(account) );
                navigate("/admindashboard");
            }

        } else {
            setOpen(true);
        }
        
    };
    //get data from mock api


    return (
        <>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-0">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm"> <img class="mx-auto h-21 w-auto"
                src={logo} alt="ArtHub" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2"> <input id="email" name="email" type="text" autocomplete="email" required value={email} onChange={(e) => setemail(e.target.value)}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between"> <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div class="text-sm"> <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                password?</a> </div>
                        </div>
                        <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e) => setpassword(e.target.value)}
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div class="relative flex gap-x-3">
                                                <div class="flex h-6 items-center"> <input id="remember" name="remember" type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> </div>
                                                <div class="text-sm leading-6"> 
                                                {/* <label for="remember" class="font-medium text-gray-900">Remember me</label> */}
                                                    <p class="text-gray-500">Remember me</p>
                                                </div>
                                            </div>
                    <div> <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log
                        in</button> </div>
                </form>
                <p class="mt-10 text-center text-sm text-gray-500"> Not a member? <Link to="/signup" ><a href="#"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up Now</a></Link> </p>
            </div>
        </div>
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
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                There was a problem logging in.
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    Check your email and password or create an account.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
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
        </>
    );
};

export default Login;