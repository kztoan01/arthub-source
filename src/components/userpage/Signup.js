import { BrowerRoute as Router, Switch, Route, Link } from 'react-router-dom'
import logo from '../assets/image/ArtHub-logos_black.png'
import { useState } from 'react';
import axios from 'axios';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, CheckCircleIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
function generateString(length) {
    const result = Math.random().toString(36).substring(2, length + 2)
    return result;
}
function Signup() {
    const [open, setOpen] = useState(false)
    const [successopen, setSuccessOpen] = useState(false)
    const [message, setMessage] = useState()
    const [detailmessage, setDetailMessage] = useState()
    const cancelButtonRef = useRef(null)
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState("2");
    const [token, setToken] = useState()
    const [isopen, setIsOpen] = useState(false)

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }
    async function save(e) {
        e.preventDefault();
        if (containsUppercase(password) == false) {
            setMessage("Password must contain uppercase characters.")
            setDetailMessage("Please re-enter your new password.")
            setOpen(true)
        } else if (password.length < 8) {
            setMessage("Password must contain more than 8 characters.")
            setDetailMessage("Please re-enter your new password.")
            setOpen(true)
        } else {
            try {
                setIsOpen(true)
                localStorage.setItem('refreshtoken', true)
                await axios.post("https://arthubplatform1.azurewebsites.net/api/accounts", {
                    username: username,
                    lastname: lastname,
                    firstname: firstname,
                    email: email,
                    password: password,
                    roleId: roleId,
                    isActive: 1,
                    token: generateString(5),
                    isPremium: 0
                }).then(response => {
                    if (response.status == 201) {
                        localStorage.setItem('_id', response.data.id)
                        localStorage.removeItem('refreshtoken')
                        //setSuccessOpen(true)
                        setIsOpen(true)
                    } else if (response.status == 204) {
                        setIsOpen(false)
                        setMessage("Username already exists")
                        setDetailMessage("Please enter another username")
                        setOpen(true)
                    }
                })
            } catch (err) {
                if (err.response.status == 403) {
                    setIsOpen(false)
                    setMessage("Email already exists")
                    setDetailMessage("Please enter another email or login")
                    setOpen(true)
                }
            }
        }
    }
    const [ertoken, setErtoken] = useState(false)
    const formCheckToken = new FormData();
    formCheckToken.append('id', localStorage.getItem('_id'))
    formCheckToken.append('token', token)
    const handleCheckToken = async (e) => {
        e.preventDefault()
        if (localStorage.getItem('refreshtoken')) {
            setMessage("Something went wrong!")
            setDetailMessage("Maybe the token hasn't been created yet or you haven't received the email yet. Please wait a moment.")
            setErtoken(true)
        } else {
            try {
                const response = await axios.post("https://arthubplatform1.azurewebsites.net/api/accounts/checkToken", formCheckToken).
                    then(response => {
                        setSuccessOpen(true)
                        localStorage.removeItem('_id')
                    })
            } catch (e) {
                if (e.response.status == 403 || e.response.status == 404) {
                    setMessage("Wrong OTP")
                    setDetailMessage("Please enter the right OTP we sent you via your email address.")
                    setErtoken(true)
                }
            }
        }


    }
    return (
        <>
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-0  relative isolate px-6 lg:px-8">
                <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
                    <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
                <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
                    <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
                <div class="sm:mx-auto sm:w-full sm:max-w-sm"> <img class="mx-auto h-21 w-auto"
                    src={logo} alt="ArtHub" />
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up and start learning
                    </h2>
                </div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" method="POST">
                        <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <div class="mt-2"> <input id="name" name="name" type="text" autocomplete="name" required value={firstname}
                                onChange={(e) => {
                                    setFirstname(e.target.value);
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                            </div>
                        </div>
                        <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                            <div class="mt-2"> <input id="name" name="name" type="text" autocomplete="name" required
                                value={lastname}
                                onChange={(e) => {
                                    setLastname(e.target.value);
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                            </div>
                        </div>
                        <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                            <div class="mt-2"> <input id="username" name="username" type="text" autocomplete="text" required
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                            </div>
                        </div>
                        <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email" required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between"> <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                                required value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between"> <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Which one are you?</label><a href="#"
                                    class="font-semibold leading-6 text-purple-600 hover:text-purple-500 text-sm">Learn more</a>
                            </div>
                            <select id="country" name="country" autocomplete="country-name"
                                value={roleId}
                                onChange={(e) => {
                                    setRoleId(e.target.value);
                                }}
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6">
                                <option value={1}>Instructor</option>
                                <option value={2}>Student</option>
                            </select> </div>
                        <div> <button type="submit" onClick={save}
                            class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign
                            up</button> </div>
                    </form>
                    <p class="mt-10 text-center text-sm text-gray-500"> Already have an account? <Link to="/login"><a href="#"
                        class="font-semibold leading-6 text-purple-600 hover:text-purple-500">Login</a></Link> </p>
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
                                                    {message}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {detailmessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
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
            <Transition.Root show={successopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSuccessOpen}>
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
                                                    Create Account Successfully
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        You need to log in again to continue accessing.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link to="/login"> <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                        >
                                            Done
                                        </button></Link>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={isopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
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
                                        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <FingerPrintIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            Verify your account.
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                We have sent you a confirmation email.
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Please check. If not received within 30 minutes. Check your spam mailbox. The email address is arthub.edu@gmail.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <form class="space-y-6" onSubmit={(e) => handleCheckToken(e)}>
                                                <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">OTP Token</label>
                                                    <div class="mt-2"> <input id="name" name="name" type="text" autocomplete="name" required value={token}
                                                        onChange={(e) => {
                                                            setToken(e.target.value);
                                                        }}
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div>
                                                <div> <button type="submit"
                                                    class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                                    Verify</button> </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={ertoken} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setErtoken}>
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
                                                    {message}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {detailmessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                setErtoken(false)
                                                setIsOpen(true)
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
        </>
    );
};

export default Signup;