import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
// import { searchCourses } from '../data/ListOfCategories.js'
import { BrowerRoute as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import apiCourse from '../api/axiosCourseConfig'
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Caricature', href: '#' },
  { name: 'Cartoon', href: '#' },
  { name: 'Photorealism', href: '#' },
  { name: 'Scientific illustrations', href: '#' },
  { name: 'Sketch', href: '#' },
  { name: 'Technical', href: '#' },
]

const languages = [
  { value: '', label: 'All Languages', checked: true },
  { value: 'english', label: 'English', checked: false },
  { value: 'vietnamese', label: 'Vietnamese', checked: false },
  { value: 'french', label: 'French', checked: false },
  { value: 'japanese', label: 'Japanese', checked: false },
  { value: 'chinese', label: 'Chinese', checked: false },
  { value: 'dogese', label: 'Dogese', checked: false },
]
const levels = [
  { value: '', label: 'All Levels', checked: true },
  { value: 'beginner', label: 'Beginner', checked: false },
  { value: 'intermediate', label: 'Intermediate', checked: false },
  { value: 'expert', label: 'Expert', checked: false },
]
const prices = [
  { value: '', label: 'All Price', checked: true },
  { value: 'free', label: 'Free', checked: false },
  { value: 0, label: 'Paid', checked: false },
]
const filters = [
  {
    id: 'language',
    name: 'Language',
    options: [
      { value: '', label: 'All Languages', checked: true },
      { value: 'english', label: 'English', checked: false },
      { value: 'vietnamese', label: 'Vietnamese', checked: false },
      { value: 'french', label: 'French', checked: false },
      { value: 'japanese', label: 'Japanese', checked: false },
      { value: 'chinese', label: 'Chinese', checked: false },
      { value: 'dogese', label: 'Dogese', checked: false },
    ],
  },
  {
    id: 'level',
    name: 'Level',
    options: [
      { value: '', label: 'All Levels', checked: true },
      { value: 'beginner', label: 'Beginner', checked: false },
      { value: 'intermediate', label: 'Intermediate', checked: false },
      { value: 'expert', label: 'Expert', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '', label: 'All Price', checked: true },
      { value: 'free', label: 'Free', checked: false },
      { value: 0, label: 'Paid', checked: false },
    ],
    // options: [
    //   { value: '', label: 'All Price', checked: true },
    //   { value: '10-20', label: '10$ - 20$', checked: false },
    //   { value: '20-25', label: '20$ - 25$', checked: false },
    //   { value: '25-35', label: '25$ - 35$', checked: false },
    //   { value: '35-50', label: '35$ - 50$', checked: false },
    //   { value: '50-70', label: '50$ - 70$', checked: false },
    //   { value: '70', label: '70$ +', checked: false },
    // ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Search(props) {
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
  const location = useLocation();
  const state = location.state;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  // const realprice = courses.map((course) => (course.coursePrice - (course.coursePrice * course.courseCoupon) / 100).toFixed(2));
  // console.log(realprice);
  // const renderPrice = realprice.map((price, index) => <p key={index} className="text-sm font-medium text-gray-900">${price}</p>)
  const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name} >
                          <a href={category.href} className="block px-2 py-3" onClick={() => setSearch(category.name)}>
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="sm:col-span-3"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Type in anything you want to learn</label>
            <div class="mt-2"> <input id="search" name="search" type="text" autocomplete="search" placeholder="e.g Caricature" onChange={(e) => setSearch(e.target.value)}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Search Courses</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} onClick={() => setSearch(category.name)}>{category.name}</a>
                    </li>
                  ))}
                </ul>
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"

                                  onChange={(e) => {
                                    if (section.name === 'Language') {
                                      setLanguage(e.target.value)
                                    } if (section.name === 'Level') {
                                      setLevel(e.target.value)
                                    } if (section.name === 'Price') {
                                      setPrice(e.target.value)
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {courses?.filter((product) => {
                    if (String(product.status) === "2") {
                      if (search === '') {
                        if (language === '') {
                          return product;
                        } else {
                          return product.language?.toLowerCase().includes(language)
                        }
                      } else {
                        return product.name?.toLowerCase().includes(search.toLowerCase()) && product.language?.toLowerCase().includes(language)
                          || product.description?.toLowerCase().includes(search.toLowerCase()) && product.language?.toLowerCase().includes(language)
                          || product.instructorName?.toLowerCase().includes(search.toLowerCase()) && product.language?.toLowerCase().includes(language)

                        // || product.courseCategories.toLowerCase().includes(search)
                      }
                    }


                    // return  ? product : 
                  }).map((product) => (
                    <Link to={`/course/${product.id}`}><div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={linkImg + product.image}
                          alt=""
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructorName}</p>
                        </div>
                        {/* {realprice.map((price) => (
                                      <p className="text-sm font-medium text-gray-900">${realprice}</p>
                                    ))} */}
                        {/* {renderPrice} */}
                        <p className="text-sm font-medium text-gray-900">{product.price > 0 ? "$"+product.price : "Free"}</p>
                      </div>
                    </div></Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}