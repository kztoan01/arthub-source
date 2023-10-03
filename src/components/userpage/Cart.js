// import { Link } from 'react-router-dom'
// import { callouts } from '../data/ListOfCategories.js'
// import { types } from '../data/ListOfCategories.js'
// import course1 from '../assets/image/course-01.jpg'
// import course2 from '../assets/image/course-02.jpg'
// import course3 from '../assets/image/course-03.jpg'
// import course4 from '../assets/image/course-04.jpg'

// const products = [
//     // {
//     //     id: 1,
//     //     name: 'The Ultimate Cartoon Caricature Master Class',
//     //     href: '#',
//     //     imageSrc: course4,
//     //     imageAlt: "4course",
//     //     price: '₫2,208,000',
//     //     instructor: 'AnBecks',
//     // },
//     // {
//     //     id: 2,
//     //     name: 'The Ultimate Cartoon Caricature Master Class',
//     //     href: '#',
//     //     imageSrc: course4,
//     //     imageAlt: "4course",
//     //     price: '₫2,208,000',
//     //     instructor: 'AnBecks',
//     // },
//     // {
//     //     id: 3,
//     //     name: 'The Ultimate Cartoon Caricature Master Class',
//     //     href: '#',
//     //     imageSrc: course4,
//     //     imageAlt: "4course",
//     //     price: '₫2,208,000',
//     //     instructor: 'AnBecks',
//     // },
//     // {
//     //     id: 4,
//     //     name: 'The Ultimate Cartoon Caricature Master Class',
//     //     href: '#',
//     //     imageSrc: course4,
//     //     imageAlt: "4course",
//     //     price: '₫2,208,000',
//     //     instructor: 'AnBecks',
//     // },
// ]

// function Cart() {
//     return (
//         <div className="h-screen pt-20">
//             <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
             
//              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//                 {/* {products.map((product) => ( */}
//                 <div className="rounded-lg md:w-2/3">
//                     {/* <div key={product.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
//                         <img src={product.imageSrc} alt={product.imageAlt} class="w-full rounded-lg sm:w-40" />
//                         <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                             <div className="mt-5 sm:mt-0">
//                                 <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
//                                 <p className="mt-1 text-xs text-gray-700">{product.instructor}</p>
//                             </div>
//                             <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//                                 <div className="flex items-center space-x-4">
//                                     <p className="text-sm">{product.price}</p>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}
//                     <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
//                         <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
//                         <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                             <div className="mt-5 sm:mt-0">
//                                 <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
//                                 <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
//                             </div>
//                             <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//                                 <div className="flex items-center space-x-4">
//                                     <p className="text-sm">259.000 ₭</p>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
//                         <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
//                         <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                             <div className="mt-5 sm:mt-0">
//                                 <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
//                                 <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
//                             </div>
//                             <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//                                 <div className="flex items-center space-x-4">
//                                     <p className="text-sm">259.000 ₭</p>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                 </div>
//                 {/* ))} */}
//                 <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
//                     <div className="mb-2 flex justify-between">
//                         <p className="text-gray-700">Subtotal</p>
//                         <p className="text-gray-700">$129.99</p>
//                     </div>
//                     <div className="flex justify-between">
//                         <p className="text-gray-700">Shipping</p>
//                         <p className="text-gray-700">$4.99</p>
//                     </div>
//                     <hr className="my-4" />
//                     <div className="flex justify-between">
//                         <p className="text-lg font-bold">Total</p>
//                         <div className="">
//                             <p className="mb-1 text-lg font-bold">$134.98 USD</p>
//                             <p className="text-sm text-gray-700">including VAT</p>
//                         </div>
//                     </div>
//                     <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart;