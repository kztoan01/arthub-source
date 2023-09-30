import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import detail01 from '../assets/image/3d-detail-01.png'
import detail02 from '../assets/image/3d-detail-02.jpg'
import detail03 from '../assets/image/3d-detail-03.jpg'
import detail04 from '../assets/image/course-01.jpg'
import apiCourse from '../api/axiosCourseConfig.js'
// const product = {
//   name: 'Create Procedural 3D Textures',
//   price: '₫299,000',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Popular Course', href: '#' },
//     { id: 2, name: 'Cartoon', href: '#' },
//   ],
//   images: [
//     {
//       src: detail01,
//       alt: 'img1',
//     },
//     {
//       src: detail02,
//       alt: 'img2',
//     },
//     {
//       src: detail03,
//       alt: 'img3',
//     },
//     {
//       src: detail04,
//       alt: 'img4',
//     },
//   ],
//   introduction:
//     'Create your own customisable procedural materials & spectacular textures for any Blender project.',
//   highlights: [
//     'Create procedural shaders using the node editor.',
//     'Learn the optimal way to frame, colour code and re-arrange your node trees for readability.',
//     'Use the Node Wrangler add-on to speed up your workflow.',
//     'Manipulate vectors, process values and colours, and generate complex procedural textures.',
//   ],
//   descriptions: [
//     'Learn how to create any material from scratch using nodes in Blender!',
//     'You’ll create many different textures, from beginner to advanced level (including mud shader, wood shader and brick shader). Along the way you’ll learn a lot of advanced techniques that you can then use to make any materials you can think of.',
//     'You’ll learn procedural texturing, which is where you create your materials and shaders without using any image based textures. So anytime you need a particular pattern or look you’ll create it entirely using nodes (and some interesting maths!).',
//     'You’ll also gain access to a course forum where you can discuss topics on a course-wide basis, or down to the individual video. Get plugged into our communities of amazing developers on Facebook (nearly 20k), in our own TA-curated Community (17k views/day), and our student chat group (10k live at any one time).',
//     'Create spectacular textures and become a Blender Material Nodes Master today!',
//   ]

// }

const includes = [
  '15.5 hours on-demand video.',
  '1 article.',
  '6 downloadable resources',
  'Access on mobile and TV',
  'Certificate of completion',
]


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CoursePreview(props) {


  const { id } = useParams()
  const thisCourse = props.courses?.find((course) => String(course.id) === id)
  let enroll = '';
  let price = '';
  if (thisCourse?.price > 0) {
    enroll = 'Add to cart'
    price = '$' + thisCourse?.price;
  } else {
    enroll = 'Enroll Now'
    price = 'Free'
  }
  // const [courses, setCourses] = useState();

  // const getCourses = async () => {
  //   try {
  //     const response = await apiCourse.get("/getCourses");
  //     console.log(response.data)
  //     setCourses(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []
  // )
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {thisCourse?.categories?.map((cate) => (
              <li key={cate.id}>
                <div className="flex items-center">
                  <a href="" className="mr-2 text-sm font-medium text-gray-900">
                    {cate?.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {thisCourse?.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              // src={product.images[0].src}
              // alt={product.images[0].alt}
              src={thisCourse?.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                // src={product.images[1].src}
                // alt={product.images[1].alt}
                src={thisCourse?.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                // src={product.images[2].src}
                // alt={product.images[2].alt}
                src={thisCourse?.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              // src={product.images[3].src}
              // alt={product.images[3].alt}
              src={thisCourse?.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{thisCourse?.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Includes */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">This course includes:</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {includes?.map((include) => (
                      <li key={include} className="text-gray-400">
                        <span className="text-gray-600">{include}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sizes
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>
              </div> */}
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {enroll}
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Introduction</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{thisCourse?.introduction}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">What you'll learn</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.one}</span>
                  </li>
                </ul>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.two}</span>
                  </li>
                </ul>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.three}</span>
                  </li>
                </ul>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.four}</span>
                  </li>
                </ul>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.five}</span>
                  </li>
                </ul>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">{thisCourse?.learningObjective?.six}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div className="mt-4 space-y-6">
                {/* {thisCourse.descriptions.map((description) => ( */}
                <p className="text-sm text-gray-600">{thisCourse?.description}</p>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}