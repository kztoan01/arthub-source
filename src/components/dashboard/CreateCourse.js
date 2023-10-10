import { useState, version } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import axios from 'axios'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CreateCourse() {
    const [agreed, setAgreed] = useState(false)
    // Create Course
    const thisInstructor = JSON.parse(localStorage.getItem("logined"))
    const [name, setName] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("1")
    const [language, setLanguage] = useState("English")
    const [level, setLevel] = useState("Beginner")
    const [price, setPrice] = useState("")
    const [coupon, setCoupon] = useState("")
    const [lo2, setLo2] = useState("")
    const [lo1, setLo1] = useState("")
    const [lo3, setLo3] = useState("")
    const [lo4, setLo4] = useState("")
    const [sec1, setSec1] = useState("")
    const [sec2, setSec2] = useState("")
    const [sec3, setSec3] = useState("")
    const [sec4, setSec4] = useState("")
    const [sec5, setSec5] = useState("")
    const [sec6, setSec6] = useState("")
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/course/addCourse", {
                accountId: thisInstructor.id,
                status : 0,
                isApproved: 0,
                iPassed: 0,
                coupon: coupon,
                price: price,
                language: language,
                level: level,
                introduction: introduction,
                description: description,
                name: name,
                sections: [
                    {
                        name: sec1,
                        accountId: thisInstructor.id
                    },
                    {
                        name: sec2,
                        accountId: thisInstructor.id
                    },
                    {
                        name: sec3,
                        accountId: thisInstructor.id
                    },
                    {
                        name: sec4,
                        accountId: thisInstructor.id
                    },
                    {
                        name: sec5,
                        accountId: thisInstructor.id
                    },
                    {
                        name: sec6,
                        accountId: thisInstructor.id
                    }

                ],
                learningObjective: {
                    one: lo1,
                    two: lo2,
                    three: lo3,
                    four: lo4
                },
                categories: [
                    {
                        categoryId: category
                    }
                ]
            });
            alert("Create Course Success!");

        } catch (err) {
            alert(err);
        }
        // console.log(name + " " + introduction + " " +description + " " +category + " " +language + " " +level
        // + " " +price + " " +coupon + " " +lo1 + " " +lo2 + " " +lo3 + " " +lo4 + " " +sec1 + " " +sec2 + " " +sec3 + " " +sec4 + " " +sec5 + " " +sec6)
    }
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            {/* <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create new course</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Tell us a little bit about your course.
                </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course title
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course subtitle
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course Introduction
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setIntroduction(e.target.value);
                                }} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course description
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-3"> <label for="country"
                        class="block text-sm font-medium leading-6 text-gray-900">Select Category</label>
                        <div class="mt-2"> <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            id="country" name="country" autocomplete="country-name"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value={1}>Caricature</option>
                            <option value={2}>Cartoon</option>
                            <option value={3}>Figure</option>
                            <option value={4}>Gesture</option>
                            <option value={5}>Perspective</option>
                            <option value={6}>Photorealism</option>
                            <option value={7}>Scientific illustrations</option>
                            <option value={8}>Scatchboard</option>
                            <option value={9}>Stillhouette</option>
                            <option value={10}>Sketch</option>
                            <option value={11}>Techical</option>
                        </select> </div>
                    </div>
                    <div class="sm:col-span-3"> <label for="country"
                        class="block text-sm font-medium leading-6 text-gray-900">Select Language</label>
                        <div class="mt-2"> <select
                        value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                            id="country" name="country" autocomplete="country-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value={"English"}>English</option>
                            <option value={"Vietnamese"}>Vietnamese</option>
                            <option value={"French"}>French</option>
                            <option value={"Japanese"}>Japanese</option>
                            <option value={"Chinese"}>Chinese</option>
                            <option value={"Dogese"}>Dogese</option>
                        </select> </div>
                    </div>
                    <div class="sm:col-span-3"> <label for="country"
                        class="block text-sm font-medium leading-6 text-gray-900">Select Level</label>
                        <div class="mt-2"> <select
                        value={level}
                            onChange={(e) => {
                                setLevel(e.target.value);
                            }}
                            id="country" name="country" autocomplete="country-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value={"Beginner"}>Beginner</option>
                            <option value={"Intermediate"}>Intermediate</option>
                            <option value={"Expert"}>Expert</option>
                        </select> </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Price
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Price
                                </label>
                                <select
                                    // id="country"
                                    // name="country"
                                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                >
                                    <option>USD</option>
                                    <option>VND</option>
                                </select>
                                <ChevronDownIcon
                                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <input
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                type="number"
                                // name="phone-number"
                                // id="phone-number"
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Coupon
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Coupon
                                </label>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                    <span className="text-gray-500 sm:text-sm pl-7">%</span>
                                </div>
                            </div>
                            <input
                                onChange={(e) => {
                                    setCoupon(e.target.value);
                                }}
                                type="number"
                                name="phone-number"
                                id="phone-number"
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">What will students learn in your course?</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">You must enter at least 6 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
                        {/* <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course Introduction
                        </label> */}
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setLo1(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Learning objectives #1'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setLo2(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Learning objectives #2'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setLo3(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Learning objectives #3'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setLo4(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Learning objectives #4'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Curriculum</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Start putting together your course by creating sections, lectures and practice activities. You can enter up to 6 sections in your course</p>
                        {/* <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Course Introduction
                        </label> */}
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setSec1(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #1'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setSec2(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #2'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setSec3(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #3'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setSec4(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #4'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setSec5(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #5'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <input
                                onChange={(e) => {
                                    setSec6(e.target.value);
                                }}
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder='Section name #6'
                                className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
                            <a href="#" className="font-semibold text-indigo-600">
                                privacy&nbsp;policy
                            </a>
                            .
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Let's talk
                    </button>
                </div>
            </form>
        </div>
    )
}