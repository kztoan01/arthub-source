import { BrowerRoute as Router, Switch, Route, Link } from 'react-router-dom'
import sketch from '../assets/image/sketch.jpg'
import digital from '../assets/image/digital.avif'
import caricature from '../assets/image/caricature-03.jpg'
import course1 from '../assets/image/course-01.jpg'
import course2 from '../assets/image/course-02.jpg'
import course3 from '../assets/image/course-03.jpg'
import course4 from '../assets/image/course-04.jpg'

const callouts = [
    {
        name: 'Sketch Drawing',
        description: 'Rapidly executed freehand drawing',
        imageSrc: sketch,
        imageAlt: 'Sketch Drawing',
        href: '#',
    },
    {
        name: 'Caricature art',
        description: 'Exaggerated way through sketching',
        imageSrc: caricature,
        imageAlt: 'Caricature art',
        href: '#',
    },
    {
        name: 'Digital Art',
        description: 'Digital technology as part of presentation process',
        imageSrc: digital,
        imageAlt: 'Digital Art',
        href: '#',
    },
]
const types = [
    {
        name: 'Most Popular Courses',
        products : [
            {
                id: 1,
                name: 'Blender Material Nodes Master: Create Procedural 3D Textures',
                href: '#',
                imageSrc: course1,
                imageAlt: "1course",
                price: '₫299,000',
                instructor: 'Stephen Woods',
            },
            {
                id: 2,
                name: 'How to Draw Cute Cartoon Characters',
                href: '#',
                imageSrc: course2,
                imageAlt: "2course",
                price: '₫1,499,000',
                instructor: 'Ben Colefax',
            },
            {
                id: 3,
                name: 'Design Mastery and Earn with Canva | Move From Novice to Pro',
                href: '#',
                imageSrc: course3,
                imageAlt: "3course",
                price: '₫429,000',
                instructor: 'Tunde Victor Olonitola',
            },
            {
                id: 4,
                name: 'The Ultimate Cartoon Caricature Master Class',
                href: '#',
                imageSrc: course4,
                imageAlt: "4course",
                price: '₫2,208,000',
                instructor: 'AnBecks',
            },
        ],
    },
    {
        name: 'Caricature Courses',
        products : [
            {
                id: 1,
                name: 'The Ultimate Cartoon Caricature Master Class',
                href: '#',
                imageSrc: course4,
                imageAlt: "4course",
                price: '₫2,208,000',
                instructor: 'AnBecks',
            },
            {
                id: 2,
                name: 'The Ultimate Cartoon Caricature Master Class',
                href: '#',
                imageSrc: course4,
                imageAlt: "4course",
                price: '₫2,208,000',
                instructor: 'AnBecks',
            },
            {
                id: 3,
                name: 'The Ultimate Cartoon Caricature Master Class',
                href: '#',
                imageSrc: course4,
                imageAlt: "4course",
                price: '₫2,208,000',
                instructor: 'AnBecks',
            },
            {
                id: 4,
                name: 'The Ultimate Cartoon Caricature Master Class',
                href: '#',
                imageSrc: course4,
                imageAlt: "4course",
                price: '₫2,208,000',
                instructor: 'AnBecks',
            },
        ],
    },
    {
        name: 'Cartoon Courses',
        products : [
            {
                id: 1,
                name: 'How to Draw Cute Cartoon Characters',
                href: '#',
                imageSrc: course2,
                imageAlt: "2course",
                price: '₫1,499,000',
                instructor: 'Ben Colefax',
            },
            {
                id: 2,
                name: 'How to Draw Cute Cartoon Characters',
                href: '#',
                imageSrc: course2,
                imageAlt: "2course",
                price: '₫1,499,000',
                instructor: 'Ben Colefax',
            },
            {
                id: 3,
                name: 'How to Draw Cute Cartoon Characterso',
                href: '#',
                imageSrc: course2,
                imageAlt: "2course",
                price: '₫1,499,000',
                instructor: 'Ben Colefax',
            },
            {
                id: 4,
                name: 'How to Draw Cute Cartoon Characters',
                href: '#',
                imageSrc: course2,
                imageAlt: "2course",
                price: '₫1,499,000',
                instructor: 'Ben Colefax',
            },
        ],
    },
]


function Course() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Categories - What you want to learn</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {callouts.map((callout) => (
                                <Link to="/search"><div key={callout.name} className="group relative">
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                </div></Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {types.map((type) => (
                <div key={type.name} className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{type.name}</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {type.products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructor}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ))}
            
        </>
    );
};

export default Course;