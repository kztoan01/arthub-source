
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRef, useEffect } from 'react'
import {
    CheckCircleIcon
} from '@heroicons/react/20/solid'
import axios from 'axios'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Switch } from '@headlessui/react'
import logoArtHub from '../assets/image/ArtHub-logos_black.png'
import logoPaypal from '../assets/image/paypal.webp'
import { Link } from 'react-router-dom'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PremiumInstructor(props) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()
    const [detailMessage, setDetailMessage] = useState()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const [image, setImage] = useState('')
    const formData = new FormData();
    const [detail, setDetail] = useState(false)
    formData.append('accountId', thisAccount?.id);
    formData.append('image', image);

    async function save(e) {
        e.preventDefault();
        try {
            await axios.post("https://arthubplatform1.azurewebsites.net/api/updateAccountImage", formData).then(response => {
                setDetail(false)
            });;
        } catch (err) {
            alert(err);
        }
    }
    const cancelButtonRef = useRef(null)
    const inputRef = useRef(null);
    const handleImageClick = () => {
        inputRef?.current.click();
    }
    const handleIMG = (e) => {
        const file = e.target.files[0];
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const [bio, setBio] = useState(thisAccount?.bio);
    const [firstname, setFirstname] = useState(thisAccount?.firstname);
    const [lastname, setLastname] = useState(thisAccount?.lastname);
    const [email, setEmail] = useState(thisAccount?.email);
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put("https://arthubplatform1.azurewebsites.net/api/accounts", {
                id: thisAccount.id,
                username: thisAccount.username,
                bio: bio,
                lastname: lastname,
                firstname: firstname,
                email: email,
                image: image.name,
                phone: thisAccount.phone,
                address: thisAccount.address,
                facebook: thisAccount.facebook,
                twitter: thisAccount.twitter,
                roleId: thisAccount.roleId,
                isActive: 1,
                isActive: 0,
                isPremium: thisAccount.isPremium
            }).then(response => {
                const updatedAccount = response.data;
                localStorage.setItem("logined", JSON.stringify(updatedAccount));
            });
            setMessage("Account Update Successfully")
            setDetailMessage("We have updated your account information, please check your personal information.")
            setOpen(true)
        } catch (err) {
            alert(err);
        }
    }
    const [link, setLink] = useState()
    const [platform, setPlatform] = useState();
    const [recipientName, setRecipientName] = useState();
    const [recipientUsername, setRecipientUsername] = useState();
    const [recipientEmail, setRecipientEmail] = useState();
    const [recipientPhone, setRecipientPhone] = useState();
    const [recipient, setRecipient] = useState("1");
    const [agreed, setAgreed] = useState(false)
    async function handlePayout(e) {
        e.preventDefault();
        try {
            await axios.post("https://arthubplatform1.azurewebsites.net/payout/create", {
                accountId: parseInt(thisAccount.id),
                platform: "PayPal",
                recipientName: recipientName,
                recipientUsername: recipientUsername,
                recipientEmail: recipientEmail,
                recipientPhone: recipientPhone,
                recipient: recipient
            }).then(response => {
                const updatedAccount = response.data;
                localStorage.setItem("logined", JSON.stringify(updatedAccount));
                setMessage("Payment method initialized successfully")
                setDetailMessage("You can create your course and add pricing now!")
                setLink("/instructordashboard/courses")
                setOpen(true)
            });

        } catch (err) {
            alert(err);
        }
    }
    const data = [
        {
            label: "Personal Information",
            value: "personal",

            desc: <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Basics:</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">This information will be made public to students. Do your best to deliver good marketing results.</p>
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3"> <label for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                    <div class="mt-2"> <input type="text" name="first-name" id="first-name" autocomplete="given-name" required
                                        value={firstname}
                                        onChange={(e) => {
                                            setFirstname(e.target.value)
                                        }}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-3"> <label for="last-name"
                                    class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                    <div class="mt-2"> <input type="text" name="last-name" id="last-name" autocomplete="family-name" required
                                        value={lastname}
                                        onChange={(e) => {
                                            setLastname(e.target.value)
                                        }}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-3"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                    <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email" value={email} readOnly required
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="col-span-full"> <label for="about"
                                    class="block text-sm font-medium leading-6 text-gray-900">About</label>
                                    <div class="mt-2"> <textarea id="about" name="about" rows="3" value={bio} required
                                        onChange={(e) => {
                                            setBio(e.target.value)
                                        }}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                    <p class="mt-3 text-sm leading-6 text-gray-600">Your instructor biography should emphasize your experience and expertise. It should have at least 50 characters and may not contain links or coupon codes.</p>
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
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-x-6"> <button type="button"
                        class="text-sm font-semibold leading-6 text-gray-900">Cancel</button> <button type="submit"
                            class="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Save</button>
                    </div>
                </form ></div>,
        },
        {
            label: "Payout & Tax Details",
            value: "payout",
            desc: <>
                {thisAccount.isPremium == 0 ? <form onSubmit={handlePayout} className="mx-auto mt-16 max-w-xl" >
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">  <img class="mx-auto h-40 w-40 sm:col-span-3"
                        src={logoPaypal} alt="ArtHub" />
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter your PayPal account
                        </h2>

                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Recipient Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        setRecipientName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                Recipient Username
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        setRecipientUsername(e.target.value);
                                    }} />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                Recipient Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        setRecipientEmail(e.target.value);
                                    }} />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                Recipient Phone
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        setRecipientPhone(e.target.value);
                                    }} />
                            </div>
                        </div>
                        <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? 'bg-purple-600' : 'bg-gray-200',
                                        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
                                    )}
                                >
                                    <span className="sr-only">Agree to policies</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            agreed ? 'translate-x-3.5' : 'translate-x-0',
                                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                            </div>
                            <Switch.Label className="text-sm leading-6 text-gray-600">
                                By selecting this, you agree to our{' '}
                                <a href="#" className="font-semibold text-purple-600">
                                    privacy&nbsp;policy
                                </a>
                                .
                            </Switch.Label>
                        </Switch.Group>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                            Create Course
                        </button>
                    </div>
                </form> : <> <div class="sm:mx-auto sm:w-full sm:max-w-sm">  <img class="mx-auto h-21 w-auto sm:col-span-3"
                    src={logoArtHub} alt="ArtHub" />
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">You are a Permium Instructor!
                    </h2>

                </div></>}
            </>,
        },
        {
            label: "Instructor Terms",
            value: "terms",
            desc: <div class="sm:mx-auto sm:w-full sm:max-w-sm">  <img class="mx-auto h-21 w-auto sm:col-span-3"
                src={logoArtHub} alt="ArtHub" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">You are a Permium Instructor!
                </h2>

            </div>,
        },

    ];
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Premium Instructor Application</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/*content */}
                    <div className="container isolate bg-white px-6 py-24 sm:py-0 lg:px-24">
                        <Tabs value={activeTab}>
                            <TabsHeader
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className:
                                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                            >
                                {data.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className={activeTab === value ? "text-gray-900" : ""}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody animate={{
                                initial: { y: 250 },
                                mount: { y: 0 },
                                unmount: { y: 250 },
                            }}>
                                {data.map(({ value, desc }) => (
                                    <TabPanel key={value} value={value}>
                                        {desc}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>
            </main>
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
                                                    {message}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {detailMessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link to={link}><button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Done
                                        </button></Link>
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
        </>
    )
}

