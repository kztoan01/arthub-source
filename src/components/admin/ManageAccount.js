import course1 from '../assets/image/toan.jpg'
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import api from '../api/axiosAccountConfig'
import {
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    UserIcon,
    LanguageIcon,
    TrashIcon,
    ExclamationTriangleIcon,
    ChevronRightIcon,
    CheckCircleIcon
} from '@heroicons/react/20/solid'
import { Menu } from '@headlessui/react'
import axios from 'axios'
const product = {
    name: 'Basic Tee 6-Pack ',
    price: '$192',
    rating: 3.9,
    reviewCount: 117,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
    imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: 'XXL', inStock: true },
        { name: 'XXXL', inStock: false },
    ],
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function ManageAccount(props) {
    const [accept, setAccept] = useState(false)
    const [id, setId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState("3");
    async function save(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/accounts", {
                username: username,
                lastname: lastname,
                firstname: firstname,
                email: email,
                password: password,
                roleId: roleId
            });
            setOpen(false)
            setAddOpen(true)
            getUsers();
        } catch (err) {
            alert(err);
        }
    }
    async function deleteAccount(id, e) {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/api/accounts/${id}`)
                .then(response => {
                    setIsOpen(false)
                    setDeleteOpen(true)
                    getUsers();
                });
        } catch (err) {
            alert(err);
        }

    }
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const [addopen, setAddOpen] = useState(false)
    const [isopen, setIsOpen] = useState(false)
    const [detail, setDetail] = useState(false)
    const cancelButtonRef = useRef(null)
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const admin = "4"
    const [users,setUsers] = useState()
    const getUsers = async () => {
        try {
          const response = await api.get("/accounts");
          setUsers(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    
      useEffect(() => {
        getUsers();
      }, []
      )
    const thisAccount = users?.find((user) => user.id === id);
    const students = users?.filter((user) => String(user.roleId) === "2");
    const staffs = users?.filter((user) => String(user.roleId) === "3");
    const instructors = users?.filter((user) => String(user.roleId) === "1");
    const admins = users?.filter((user) => String(user.roleId) === "4");
    const manage = [
        {
            name: 'Staff Account',
            message: <button type="submit" onClick={() => setOpen(true)}
                class="mt-4 flex justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                Create new account</button>,
            user: staffs
        },
        {
            name: 'Instructor Account',
            message: <h4 className="font-bold text-gray-900 mt-8">Number of Instructors on ArtHub : {instructors?.length}</h4>,
            user: instructors
        },
        {
            name: 'Student Account',
            message: <h4 className="font-bold text-gray-900 mt-8">Number of Students on ArtHub : {students?.length}</h4>,
            user: students
        }, {
            name: 'Admin Account',
            message: <button type="submit" onClick={() => setOpen(true)}
                class="mt-4 flex justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                Create new account</button>,
            user: admins
        },
    ]
    const linkImg = 'http://localhost:8080//images//'
    return (

        <>
            {manage?.map((callout) => (
                <>
                    <header className="bg-white shadow" key={manage.name}>
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{callout.name}</h1>
                            {callout.message}
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <ul role="list" className="divide-y divide-gray-100">
                                {callout.user?.map((person) => (
                                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            {person.image == null ? (<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='../assets/image/default.jpg' alt="" />)
                                                :
                                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={linkImg + person.image} alt="" />}

                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.lastname} {person.firstname}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                            </div>
                                            {/* <div className="mt-5 flex lg:ml-4 lg:mt-0 float-left">
                                                
                                            </div> */}
                                        </div>
                                        <div className="mt-5 flex lg:ml-4 lg:mt-0 ">
                                            <span className="hidden sm:block">
                                                <button
                                                    onClick={(e) => {
                                                        setIsOpen(true)
                                                        setId(person.id)
                                                    }}
                                                    type="button"
                                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    Delete
                                                </button>
                                            </span>
                                            <span className="ml-3 hidden sm:block"><button
                                                onClick={(e) => {
                                                    setDetail(true)
                                                    setId(person.id)
                                                }}
                                                type="button"
                                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                View
                                            </button>
                                            </span>
                                            {/* {person.roleId === admin ? (
                                                <p className="text-sm leading-6 text-gray-900">Administrator</p>
                                            ) : <></>} */}
                                            {/* <p className="text-sm leading-6 text-gray-900">{person.roleId}</p> */}
                                            {/* {person.lastSeen ? (
                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                </p>
                                            ) : (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                                </div>
                                            )} */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>
                </>
            ))}
            {/* create account */}
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
                                        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                            <h3 class="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Account
                                            </h3>
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
                                                        class="block text-sm font-medium leading-6 text-gray-900">Create account for</label>
                                                    </div>
                                                    <select id="country" name="country" autocomplete="country-name"
                                                        value={roleId}
                                                        onChange={(e) => {
                                                            setRoleId(e.target.value);
                                                        }}
                                                        class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6">
                                                        <option value={3}>Staff</option>
                                                        <option value={4}>Admin</option>
                                                    </select> </div>
                                                <div> <button type="submit" onClick={save}
                                                    class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                                    Create</button> </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* account detail */}
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

                                        <div class="border-b border-gray-900/10 pb-12">
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
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* notification */}
            <Transition.Root show={isopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                                                    Are you sure you want to delete this account?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Clicking Accept means permanently deleting the account.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => deleteAccount(id, e)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setIsOpen(false)}
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
            {/* delete success */}
            <Transition.Root show={deleteopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDeleteOpen}>
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
                                                    Account Delete Successfully
                                                </Dialog.Title>
                                                {/* <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    We have updated your account information, please check your personal information.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setDeleteOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setDeleteOpen(false)}
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
            {/* add account success */}
            <Transition.Root show={addopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setAddOpen}>
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
                                                    Account Create Successfully
                                                </Dialog.Title>
                                                {/* <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    We have updated your account information, please check your personal information.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
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
    )
}