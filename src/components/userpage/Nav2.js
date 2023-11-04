import logo from '../assets/image/ArtHub-only-logo.png'
import { BrowerRoute as Router, Switch, Route, Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  XMarkIcon,
  HeartIcon,
  PaintBrushIcon,
  BugAntIcon,
  BoltIcon,
  PhotoIcon,
  PencilIcon,
  SparklesIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { ShopContext } from '../coursepage/shop-context'
import { useEffect, useContext } from 'react'
import apiCourse from '../api/axiosCourseConfig'
import emptyCart from '../assets/image/emptycart.png'
import apiLearner from '../api/axiosLearnerConfig'
import { users } from '../data/ListOfCategories'
import api from '../api/axiosAccountConfig'
import { setSelectionRange } from '@testing-library/user-event/dist/utils'
const products = [
  { name: 'Caricature', state: 'Caricature', description: 'Get a better understanding of your traffic', href: '#', icon: PaintBrushIcon },
  { name: 'Cartoon', state: 'Cartoon', description: 'Speak directly to your customers', href: '#', icon: BugAntIcon },
  { name: 'Figure', state: 'Figure', description: 'Your customers’ data will be safe and secure', href: '#', icon: PhotoIcon },
  { name: 'Gesture', state: 'Gesture', description: 'Connect with third-party tools', href: '#', icon: SparklesIcon },
  { name: 'Photorealism', state: 'Photorealism', description: 'Build strategic funnels that will convert', href: '#', icon: PencilIcon },
  { name: 'Scientific illustrations', state: 'Scientific illustrations', description: 'Build strategic funnels that will convert', href: '#', icon: BoltIcon },
  { name: 'Sketch', state: 'Sketch', description: 'Build strategic funnels that will convert', href: '#', icon: ChartPieIcon },
  { name: 'Technical', state: 'Technical', description: 'Build strategic funnels that will convert', href: '#', icon: CubeTransparentIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]


const navigation = [
  { name: 'Dashboard', href: '#', current: true, link: '/instructordashboard/dashboard' },
  { name: 'Courses', href: '#', current: false, link: '/instructordashboard/courses' },
  { name: 'Student', href: '#', current: false, link: '/instructordashboard/student' },
  { name: 'Reports', href: '#', current: false, link: '/instructordashboard/reports' },
  { name: 'Performance', href: '#', current: false, link: '/instructordashboard/performance' },
]
const handleLogout = (e) => {
  localStorage.removeItem("STU-authenticated");
  localStorage.removeItem("AD-authenticated");
  localStorage.removeItem("logined");
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Nav2(props) {
  //banner
  const [banner, setBanner] = useState(true)
  //get user
  const [users, setUsers] = useState()
  const getUsers = async () => {
    try {
      const response = await api.get("/accounts");
      // console.log(response.data)
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []
  )
  const [open, setOpen] = useState(false)
  let logStatus = '';
  let sigStatus = '';
  let userNavigation = []
  let user = []
  const loginedUser = JSON.parse(localStorage.getItem("logined"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
  if (localStorage.getItem("logined")) {
    userNavigation = [
      { name: loginedUser.lastname + " " + loginedUser.firstname, href: '#', link: '/account/setting' },
      { name: loginedUser.email, href: '#', link: '/account/setting' },
      { name: 'Cart', href: '#', link: '/error' },
      { name: 'Wishlist Cart', href: '#', link: '/error' },
      { name: 'My Learning', href: '#', link: '/account/learning' },
      { name: 'Notifications', href: '#', link: '/account/notification' },
      { name: 'Account Settings', href: '#', link: '/account/setting' },
      { name: 'Purchase history', href: '#', link: '/account/purchase' },
    ]
    user = {
      name: loginedUser.lastname + " " + loginedUser.firstname,
      email: loginedUser.email,
      imageUrl:
        linkImg + loginedUser?.image,
    }
  } else {
    logStatus = props.login
    sigStatus = props.signup
  }

  console.log(linkImg + loginedUser?.image)
  //get courses
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
  // cart

  const { countCart,cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, checkout } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const cartproducts = courses?.filter((course) => cartItems[course.id] === true);

  // notify user that they receive a course

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
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const haveReceiveCourse = learner?.filter((learner) => learner?.accountId == thisAccount?.id && learner?.status == 1)
  // const courseReceive = courses?.filter((course) => {
  //   return haveReceiveCourse?.some((learn) => {
  //     return learn.courseId === course.id
  //   })
  // })
  const [no, setNo] = useState(false)
  const [gift, setGift] = useState(false)
  const findAccountById = (id) => {
    return users?.find((user) => user.id === id)
  }
  const findCourseById = (id) => {
    return courses?.find((course) => course.id === id)
  }
  /////////////////
  const checkNoti = () => {
    if (haveReceiveCourse?.length > 0) {
      return setGift(true)
    } else {
      return setNo(true)
    }
  }
  return (
    <>
      {banner == true ? <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
        </div>
        <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">ArtHub 2023</strong><svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>Register for the course from August 22 - December 22 to receive the best deals.
          </p>
          <Link to="/login">
            <a href="#" className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Register now <span aria-hidden="true">&rarr;</span></a>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <button onClick={() => setBanner(false)} type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div> : <></>}

      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">ArtHub</span>
              <Link to="/"><img className="h-8 w-auto" src={logo} alt="" /></Link>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 outline-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Categories
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products?.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-purple-600" aria-hidden="true" />
                        </div>
                        <Link to="/search" state={item.state}><div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div></Link>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              <Link to="/instructordashboard">Instructor</Link>
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              <Link to="/account/learning">My Learning</Link>
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              <Link to="/search">Explore</Link>
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900"
              onClick={(e) => { checkNoti() }
              }

            >
              Notifications
            </a>
         
          </Popover.Group>
          <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon onClick={(e) => setOpen(true)}
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{countCart}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login"><a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-5">
              {logStatus}
            </a></Link>
            <Link to="/signup"><a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              {sigStatus}
            </a></Link>
          </div>
          {localStorage.getItem("logined") ? (
            <div>
              <div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full  object-cover object-center" src={loginedUser?.image ? user.imageUrl : '../assets/image/default.jpg'} alt="" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link to={item.link}><a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a></Link>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/login">
                            <a
                              href=""
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Log out
                            </a>
                          </Link>)}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ) : <></>}

        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">ArtHub</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Categories
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <Link to="/instructordashboard">Instructor</Link>
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <Link to="/account/learning">My Learning</Link>
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <Link to="/search">Explore</Link>
                  </a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={(e) => { checkNoti() }
                    }

                  >
                    Notifications
                  </a>
                  {/* <div className="flex lg:ml-6"> */}
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                {/* </div> */}

                {/* Cart */}
                {/* <div className="ml-4 flow-root lg:ml-6"> */}
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon onClick={(e) => setOpen(true)}
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{countCart}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                {/* </div> */}
                </div>
                <div className="py-6">
                  <Link to="/login"><a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {logStatus}
                  </a></Link>
                  <Link to="/signup"><a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {sigStatus}
                  </a></Link>
                </div>
                <div>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full  object-cover object-center" src={loginedUser?.image ? user.imageUrl : '../assets/image/default.jpg'} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>

                          <a
                            href=""
                            onClick={handleLogout}
                            className={classNames(
                              true ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign Out
                          </a>

                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        {/* Shopping cart */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
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
                          </div>
                        </div>
                        {totalAmount > 0 ? (
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>${totalAmount}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Coupon calculated at checkout.</p>
                            <Link to="/checkout"><div className="mt-6" onClick={() => setOpen(false)}>
                              <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                              >
                                Checkout
                              </a>
                            </div> </Link>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <p>
                                <button
                                  type="button"
                                  className="font-medium text-purple-600 hover:text-purple-500"
                                  onClick={() => setOpen(false)}
                                >
                                  Continue Buying
                                  <span aria-hidden="true"> &rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>) : (
                          <div className="">
                            <div className="flow-root flex items-start justify-between">
                              <img src={emptyCart} className='pb-48' />
                            </div>
                          </div>
                        )}

                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* notify  */}
        <Transition.Root show={gift} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setGift}>
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
                      {/* content */}
                      <header className="bg-white">
                        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">ArtHub Gift</h1>
                        <h3 className="text-center text-xl text-gray-500 mt-4">Some one send you these course as gift</h3>

                        {haveReceiveCourse?.map((sender) => (
                          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

                            {/* this course info */}
                            <div className="items-center mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                              <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                                <Link to={`/course/${findCourseById(sender?.courseId)?.id}`}><div className="group relative">
                                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                      src={linkImg + findCourseById(sender?.courseId)?.image}
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
                                          {findCourseById(sender?.courseId)?.name}
                                        </a>
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">Instructor: {findCourseById(sender?.courseId)?.instructorName}</p>
                                    </div>
                                    {findCourseById(sender?.courseId)?.price === 0 ? (
                                      <p className="text-sm font-medium text-gray-900">Free</p>
                                    ) : <p className="text-sm font-medium text-gray-900">${findCourseById(sender?.courseId)?.price}</p>}

                                  </div>
                                </div></Link> </div>
                            </div>
                            <div key={sender?.id} className="sm:flex sm:items-start mt-8">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <HeartIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                  {findAccountById(sender?.senderId)?.firstname} has sent you these courses as gift with the message below
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="mt-8 text-sm text-gray-500">
                                    {sender?.message}
                                  </p>
                                  <p className="mt-8 text-sm text-gray-500">
                                    We have sent you information about the gifted course including the sender's name and accompanying message! Please check your email. If you have already seen it, please ignore this notice
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>))}
                      </header>


                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={no} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setNo}>
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
                      {/* content */}
                      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">You have no notification</h1>

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </header>
    </>
  )
}