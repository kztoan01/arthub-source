import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
const features = [
    {
        name: 'Push to deploy.',
        description:
            'Post your lessons anytime, anywhere with countless genres in drawing supported by us.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Quality Security - SSL certificates.',
        description: 'Lectures are absolutely confidential for unregistered students as well as lecturers outside the course.',
        icon: LockClosedIcon,
    },
    {
        name: 'Database backups.',
        description: 'Monetize your quality courses now with our full support.',
        icon: ServerIcon,
    },
]

const stats = [
    { id: 1, name: 'Total number of hours of lectures on the platform', value: '11 000' },
    { id: 2, name: 'Money saved by taking advantage of our offers', value: '$119 thousands' },
    { id: 3, name: 'Number of students who have participated in the courses', value: '46,000' },
]

export default function Feature(props) {
    let createButton1 = "";
    const createButton =<a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create your first Course</a>
    if(props.create === "true"){
       createButton1 = createButton
    }
    return (
        <>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">You are a teacher?</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Become our Instructor</p>
                                
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Whether you have experience teaching, or it’s your first time, we’ll help you package your knowledge into an online course that improves student lives.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                            alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432}
                            height={1442}
                        />
                    </div>
                    <Link to="/instructordashboard/courses/createcourse">{createButton1}</Link>
                </div> 
               
            </div>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

        </>
    )
}