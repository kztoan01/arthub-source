import { PencilIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import logo from '../assets/image/paypal.webp'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Transactions() {
  const [allPayout, setAllPayOut] = useState()
  const getPayout = async () => {
    try {
      const response = await axios.get("http://localhost:8080/payout/getPayoutInformations");
      setAllPayOut(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPayout();
  }, []
  )
  let newDate = new Date()
  let thisMonth = newDate.getMonth() + 1
  let lastMonth = thisMonth - 1
  const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
  const [open, setOpen] = useState(false)
  const [platform, setPlatform] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientUsername, setRecipientUsername] = useState();
  const [recipientEmail, setRecipientEmail] = useState();
  const [recipientPhone, setRecipientPhone] = useState();
  const [recipientImage, setRecipientImage] = useState();
  const [total, setTotal] = useState();
  //let payoutDetail
 // const getPayoutDetail = () => {
    //payoutDetail = JSON.parse(localStorage.getItem("_payout_detail"))
   // setOpen(true)
  //}
  return (<>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Transactions</h1>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography color="gray" className="ml-4 mt-4 tracking-tight text-gray-900">
                  These are details about the last transactions
                </Typography>
              </div>

            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPayout?.map((pay) => (
                  <>
                    <tr key={pay.id}>
                      {pay.totalPayout > 0 && pay.recipient == lastMonth - 1 ? <><td className="">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={linkImg + pay.image}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {pay.lastname} {pay.firstname}
                          </Typography>
                        </div>
                      </td>
                        <td className="">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal ml-4"
                          >
                            {pay.totalPayout ? "$" + pay.totalPayout * 65 / 100 : "None"}
                          </Typography>
                        </td>
                        <td className="">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Wed 3:00pm
                          </Typography>
                        </td>
                        <td className="">
                          <div className="w-max">
                            <Chip
                              className="ml-3"
                              size="sm"
                              variant="ghost"
                              value={pay.recipient == lastMonth ? "Paid" : "Pending"}
                              color={
                                pay.recipient === "1"
                                  ? "green"
                                  : pay.recipient === "0"
                                    ? "amber"
                                    : "red"
                              }
                            />
                          </div>
                        </td>
                        <td className="">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                              <Avatar
                                src={
                                  pay.platform === "PayPal"
                                    ? logo
                                    : logo
                                }
                                size="sm"
                                alt={pay.platform}
                                variant="square"
                                className="h-full w-full object-contain p-1"
                              />
                            </div>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal capitalize"
                              >
                                {pay.platform} {pay.recipientPhone}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {pay.recipientEmail}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="">
                          <Tooltip content="Payout Instructor">
                            <IconButton variant="text">
                              <CreditCardIcon className="h-8 w-8"
                                onClick={() => {
                                  setPlatform(pay.platform)
                                  setRecipientEmail(pay.recipientEmail)
                                  setRecipientName(pay.recipientName)
                                  setRecipientUsername(pay.recipientUsername)
                                  setRecipientPhone(pay.recipientPhone)
                                  setRecipientImage(linkImg + pay.image)
                                  setTotal(pay.totalPayout)
                                  // localStorage.setItem("_payout_detail", JSON.stringify({
                                  //   "platform": platform,
                                  //   "recipientName": recipientName,
                                  //   "recipientUsername": recipientUsername,
                                  //   "recipientEmail": recipientEmail,
                                  //   "recipientPhone": recipientPhone,
                                  //   "recipientImage": recipientImage
                                  // }))
                                  setOpen(true)
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </td></> : <></>}

                    </tr></>
                ))}

              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card></div>
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
                      <img src={recipientImage} alt="" className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{recipientName}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          payoutDetail information
                        </h3>

                        <p className="text-2xl text-gray-900">{recipientEmail}</p>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          payoutDetail options
                        </h3>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Total Payout</h3>
                          <div className="mt-4">
                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                              <li className="text-gray-400">
                                <span className="text-gray-600">Total: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    ${total*65/100}&nbsp;
                                  </a>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Payout details</h3>
                          <div className="mt-4">
                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                              <li className="text-gray-400">
                                <span className="text-gray-600">Platform: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    {platform}&nbsp;
                                  </a>
                                </span>
                              </li>
                              <li className="text-gray-400">
                                <span className="text-gray-600">Recipient Name: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    {recipientName}&nbsp;
                                  </a>
                                </span>
                              </li>
                              <li className="text-gray-400">
                                <span className="text-gray-600">Recipient Username: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    {recipientUsername}&nbsp;
                                  </a>
                                </span>
                              </li>
                              <li className="text-gray-400">
                                <span className="text-gray-600">Recipient Email: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    {recipientEmail}&nbsp;
                                  </a>
                                </span>
                              </li>
                              <li className="text-gray-400">
                                <span className="text-gray-600">Recipient Phone: {' '}
                                  <a href="#" className="font-semibold text-purple-600">
                                    {recipientPhone}&nbsp;
                                  </a>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <form>
                          <button
                            type="submit"

                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                          >
                            Complete Payout
                          </button>
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
  );
}