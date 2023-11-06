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
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import ListAccount from './ListAccount'
import { createContext } from 'react'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const UserContext = createContext(null);
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
                roleId: roleId,
                isActive: 1
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
    const admin = "4"

    const [users, setUsers] = useState()
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
            message: 'add',
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
            message: 'add',
            user: admins
        },
    ]
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'


    ////////////////////////
    const contextValue = {
        getUsers
    };
    const data = [
        {
            label: "Instructors",
            value: "instructors",

            desc: <UserContext.Provider value={contextValue}>
                <ListAccount
                    user={instructors}
                    name={"Instructor Accounts"}
                    message={<h4 className="font-bold text-gray-900 mt-8">Number of Instructors on ArtHub : {instructors?.length}</h4>}
                />
            </UserContext.Provider>,
        },

        {
            label: "Students",
            value: "students",
            desc: <UserContext.Provider value={contextValue}><ListAccount
                user={students}
                name={"Student Accounts"}
                message={<h4 className="font-bold text-gray-900 mt-8">Number of Students on ArtHub : {students?.length}</h4>}
            /></UserContext.Provider>,
        },
        {
            label: "Staffs",
            value: "staffs",
            desc: <UserContext.Provider value={contextValue}><ListAccount
                user={staffs}
                name={"Staff Accounts"}
                message='add'
            /></UserContext.Provider>,
        },
        {
            label: "Admin",
            value: "admin",
            desc: <UserContext.Provider value={contextValue}><ListAccount
                user={admins}
                name={"Admin Accounts"}
                message='add'
            /></UserContext.Provider>,
        },
    ];
    const [activeTab, setActiveTab] = useState("instructors");

    return (

        <>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Acccounts</h1>
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
        </>
    )
}

