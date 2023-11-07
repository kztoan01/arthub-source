import { useState } from "react";
import axios from 'axios';
import api from '../api/axiosAccountConfig'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, PencilSquareIcon, ExclamationTriangleIcon, EyeIcon } from '@heroicons/react/24/outline'
export default function AccountSetting() {
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const [image, setImage] = useState('')
    const formData = new FormData();
    formData.append('accountId', thisAccount?.id);
    formData.append('image', image);

    async function save(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/updateAccountImage", formData).then(response => {
                setDetail(false)
            });;
        } catch (err) {
            alert(err);
        }
    }
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)


    const [username, setUsername] = useState(thisAccount?.username);
    const [bio, setBio] = useState(thisAccount?.bio);
    const [firstname, setFirstname] = useState(thisAccount?.firstname);
    const [lastname, setLastname] = useState(thisAccount?.lastname);
    const [email, setEmail] = useState(thisAccount?.email);
    const [phone, setPhone] = useState(thisAccount?.phone);
    const [address, setAddress] = useState(thisAccount?.address);
    const [facebook, setFacebook] = useState(thisAccount?.facebook);
    const [twitter, setTwitter] = useState(thisAccount?.twitter);
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/api/accounts", {
                id: thisAccount.id,
                username: username,
                bio: bio,
                lastname: lastname,
                firstname: firstname,
                email: email,
                image: image.name,
                phone: phone,
                address: address,
                facebook: facebook,
                twitter: twitter,
                roleId: thisAccount.roleId,
                isActive: 1
            }).then(response => {
                const updatedAccount = response.data;
                localStorage.setItem("logined", JSON.stringify(updatedAccount));
            });
            setOpen(true)
        } catch (err) {
            alert(err);
        }
    }
    const [detail, setDetail] = useState(false)
    const inputRef = useRef(null);
    const handleImageClick = () => {
        inputRef?.current.click();
    }
    const handleIMG = (e) => {
        const file = e.target.files[0];
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    const [openPass, setOpenPass] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [Eropen, setErOpen] = useState(false)
    const [mainMessage, setMainMessage] = useState()
    const [message, setMessage] = useState()
    const formChangePassword = new FormData();
    formChangePassword.append('email', thisAccount?.email)
    formChangePassword.append('newPassword', newPassword)
    formChangePassword.append('oldPassword', oldPassword)
    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }
    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (confirmPassword != newPassword) {
            setMainMessage("Confirmed wrong password.")
            setMessage("Please confirm your new password.")
            setErOpen(true)
            setOpenPass(true)
        } else if (newPassword == oldPassword) {
            setMainMessage("Look like you enter the old password.")
            setMessage("Please enter a new password different from the current one.")
            setErOpen(true)
            setOpenPass(true)
        } else if (containsUppercase(newPassword) == false) {
            setMainMessage("Password must contain uppercase characters.")
            setMessage("Please re-enter your new password.")
            setErOpen(true)
            setOpenPass(true)
        } else if (newPassword.length < 8) {
            setMainMessage("Password must contain more than 8 characters.")
            setMessage("Please re-enter your new password.")
            setErOpen(true)
            setOpenPass(true)
        }
        else {
            try {
                const response = await axios.post("http://localhost:8080/api/accounts/changePassword", formChangePassword).
                    then(response => {
                        setOpenPass(false)
                        setOpen(true)
                    })
            } catch (e) {
                if (e.response.status == 403 || e.response.status == 404) {
                    setMainMessage("Your password was incorrect.")
                    setMessage("Please re-enter your correct password.")
                    setErOpen(true)
                    setOpenPass(true)
                }
            }
        }

    }
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Setting</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Account Security</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">Update your account.</p>
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                    <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email" value={email} readOnly
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-3"> <label for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    {/* <div class="mt-2"> <input type="password" name="password" id="password" autocomplete="" value={thisAccount?.password} readOnly
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                    </div> */}
                                    <div class="mt-2"> <PencilSquareIcon className="w-8 h-8 cursor-pointer" onClick={() => setOpenPass(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what
                                    you share.</p>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-4"> <label for="username"
                                        class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                        <div class="mt-2">
                                            <div
                                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 sm:max-w-md">
                                                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">arthub.com/</span> <input
                                                    type="text" name="username" id="username" autocomplete="username" value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="janesmith" /> </div>
                                        </div>
                                    </div>
                                    <div class="col-span-full"> <label for="about"
                                        class="block text-sm font-medium leading-6 text-gray-900">About</label>
                                        <div class="mt-2"> <textarea id="about" name="about" rows="3" value={bio}
                                            onChange={(e) => {
                                                setBio(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                    </div>
                                    <div class="col-span-full"> <label for="photo"
                                        class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                        <div class="mt-2 flex items-center gap-x-3">
                                            {/* <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                            fill="currentColor" aria-hidden="true"> */}
                                            {thisAccount?.image ? (<>
                                                <img className="h-12 w-12 object-cover object-center rounded-full" src={image ? URL.createObjectURL(image) : (linkImg + thisAccount?.image)} alt="" />
                                            </>) : (<>
                                                <img className="h-12 w-12 object-cover object-center rounded-full" src={image ? URL.createObjectURL(image) : '../assets/image/default.jpg'} alt="" />
                                            </>)}
                                            {/* </svg>  */}
                                            <button type="button"
                                                onClick={() => setDetail(true)}
                                                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                        </div>
                                    </div>
                                    <div class="col-span-full"> <label for="cover-photo"
                                        class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                                        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-gray-900/10 pb-12">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3"> <label for="first-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                        <div class="mt-2"> <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                            value={firstname}
                                            onChange={(e) => {
                                                setFirstname(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3"> <label for="last-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                        <div class="mt-2"> <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                            value={lastname}
                                            onChange={(e) => {
                                                setLastname(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                        address</label>
                                        <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4"> <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                        <div class="mt-2"> <input id="phone" name="phone" type="text" autocomplete=""
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3"> <label for="country"
                                        class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                        <div class="mt-2"> <select id="country" name="country" autocomplete="country-name"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>United States</option>
                                            <option>Vietnam</option>
                                            <option>Canada</option>
                                        </select> </div>
                                    </div>
                                    <div class="col-span-full"> <label for="street-address"
                                        class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                        <div class="mt-2"> <input type="text" name="street-address" id="street-address"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value)
                                            }}
                                            autocomplete="street-address"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-2 sm:col-start-1"> <label for="city"
                                        class="block text-sm font-medium leading-6 text-gray-900">Facebook</label>
                                        <div class="mt-2"> <input type="text" name="facebook" id="facebook" autocomplete="facebook"
                                            value={facebook}
                                            onChange={(e) => {
                                                setFacebook(e.target.value)
                                            }}
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-2"> <label for="region"
                                        class="block text-sm font-medium leading-6 text-gray-900">Twitter</label>
                                        <div class="mt-2"> <input type="text" name="twitter" id="twitter" autocomplete="twitter"
                                            value={twitter}
                                            onChange={(e) => {
                                                setTwitter(e.target.value)
                                            }}
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
                            </div>
                            <div class="border-b border-gray-900/10 pb-12">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick
                                    what else you want to hear about.</p>
                                <div class="mt-10 space-y-10">
                                    <fieldset>
                                        <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                        <div class="mt-6 space-y-6">
                                            <div class="relative flex gap-x-3">
                                                <div class="flex h-6 items-center"> <input id="comments" name="comments" type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" /> </div>
                                                <div class="text-sm leading-6"> <label for="comments" class="font-medium text-gray-900">Comments</label>
                                                    <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                </div>
                                            </div>
                                            <div class="relative flex gap-x-3">
                                                <div class="flex h-6 items-center"> <input id="candidates" name="candidates" type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" /> </div>
                                                <div class="text-sm leading-6"> <label for="candidates"
                                                    class="font-medium text-gray-900">Instructor</label>
                                                    <p class="text-gray-500">Get notified when your instructor replies your assignment.</p>
                                                </div>
                                            </div>
                                            <div class="relative flex gap-x-3">
                                                <div class="flex h-6 items-center"> <input id="offers" name="offers" type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" /> </div>
                                                <div class="text-sm leading-6"> <label for="offers" class="font-medium text-gray-900">Offers</label>
                                                    <p class="text-gray-500">Get notified when you get a discount for a course.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    {/* <fieldset>
                                    <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                    <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                    <div class="mt-6 space-y-6">
                                        <div class="flex items-center gap-x-3"> <input id="push-everything" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600" /> <label for="push-everything"
                                                class="block text-sm font-medium leading-6 text-gray-900" >Everything</label> </div>
                                        <div class="flex items-center gap-x-3"> <input id="push-email" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600" /> <label for="push-email"
                                                class="block text-sm font-medium leading-6 text-gray-900">Same as email</label> </div>
                                        <div class="flex items-center gap-x-3"> <input id="push-nothing" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600" /> <label for="push-nothing"
                                                class="block text-sm font-medium leading-6 text-gray-900">No push notifications</label> </div>
                                    </div>
                                </fieldset> */}
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 flex items-center justify-end gap-x-6"> <button type="button"
                            class="text-sm font-semibold leading-6 text-gray-900">Cancel</button> <button type="submit"
                                class="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Save</button>
                        </div>
                    </form ></div>
            </main>
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
                                                    Account Update Successfully
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        We have updated your account information, please check your personal information.
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
            {/* change image */}
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
                                        <div onClick={handleImageClick} style={{ cursor: "pointer" }} className="rounded-lg h-full w-full">
                                            <input ref={inputRef} type="file" class="sr-only" onChange={handleIMG} style={{ display: "none" }} />
                                            {thisAccount?.image == null ? (<>
                                                {image ? (<>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt=""
                                                        className="h-96 w-96 object-cover object-center rounded-full"
                                                    /></>)
                                                    : (
                                                        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                                                        </div>
                                                    )}

                                            </>) : (<>
                                                <img
                                                    // src={product.images[0].src}
                                                    // alt={product.images[0].alt}
                                                    src={image ? URL.createObjectURL(image) : (linkImg + thisAccount?.image)}
                                                    alt=""
                                                    className="h-96 w-96 object-cover object-center rounded-full"
                                                />
                                            </>)}
                                        </div>
                                        <button type="submit"
                                            onClick={(e) => save(e)}
                                            class="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 mt-96 ">Save</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={openPass} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenPass}>
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
                                        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                                            <h3 class="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Change password
                                            </h3>
                                            <form class="space-y-6" onSubmit={(e) => handleChangePassword(e)}>

                                                {/* <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Current password</label>
                                                <div class="text-sm"> <a href="#" class="font-semibold text-purple-600 hover:text-purple-500"><EyeIcon className="w-6 h-6"/></a> </div>
                                                    <div class="mt-2"> <input id="username" name="username" type="password" autocomplete="text" required
                                                        value={oldPassword}
                                                        onChange={(e) => {
                                                            setOldPassword(e.target.value);
                                                        }}
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                   
                                                    </div>
                                                </div> */}
                                                <div>
                                                    <div class="flex items-center justify-between"> <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                        {/* <div class="text-sm"> <div class="font-semibold text-purple-600 hover:text-purple-500"><EyeIcon className="w-6 h-6"/></div> </div> */}
                                                    </div>
                                                    <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                                                        value={oldPassword}
                                                        onChange={(e) => {
                                                            setOldPassword(e.target.value);
                                                        }}
                                                        required
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex items-center justify-between"> <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                        {/* <div class="text-sm"> <div class="font-semibold text-purple-600 hover:text-purple-500"><EyeIcon className="w-6 h-6"/></div> </div> */}
                                                    </div>
                                                    <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                                                       value={newPassword}
                                                       onChange={(e) => {
                                                           setNewPassword(e.target.value);
                                                       }}
                                                        required
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex items-center justify-between"> <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                        {/* <div class="text-sm"> <div class="font-semibold text-purple-600 hover:text-purple-500"><EyeIcon className="w-6 h-6"/></div> </div> */}
                                                    </div>
                                                    <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                                                        required value={confirmPassword}
                                                        onChange={(e) => {
                                                            setConfirmPassword(e.target.value);
                                                        }}
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div>
                                                {/* <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">New password</label>
                                                    <div class="mt-2"> <input id="email" name="email" type="password" autocomplete="email" required
                                                        value={newPassword}
                                                        onChange={(e) => {
                                                            setNewPassword(e.target.value);
                                                        }}
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex items-center justify-between"> <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Confirm new password</label>
                                                    </div>
                                                    <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                                                        required value={confirmPassword}
                                                        onChange={(e) => {
                                                            setConfirmPassword(e.target.value);
                                                        }}
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                                                    </div>
                                                </div> */}
                                                <div className="mt-16"> <button type="submit"
                                                    class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                                    Change password</button> </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={Eropen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setErOpen}>
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
                                                    {mainMessage}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {message}
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
                                                setErOpen(false)
                                                setOpenPass(true)
                                            }}
                                        >
                                            Done
                                        </button>
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

