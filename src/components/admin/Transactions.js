import { PencilIcon } from "@heroicons/react/24/solid";
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
import { useState, useEffect } from "react";
import logo from '../assets/image/paypal.webp'
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
  const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
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
                        <td className="">
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
                            {pay.totalPayout ? "$"+pay.totalPayout : "None"}
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
                              value={pay.recipient == "1" ? "Paid" : "Pending"}
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
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
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
  </>
  );
}