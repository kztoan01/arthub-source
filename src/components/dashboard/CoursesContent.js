import { useState, useEffect } from "react";
import apiCourse from '../api/axiosCourseConfig'
import { Link } from "react-router-dom";
export default function CoursesContent(props) {
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
    const [search, setSearch] = useState('')
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const courseOwn = courses?.filter((courses) => courses.accountId === thisAccount.id);
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Courses</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/*content */}
                    {courseOwn?.length === 0 ? (
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Vous n'avez pas encore créé de cours. Cliquez ci-dessous pour commencer à créer votre premier cours.</h1>
                    ) : <div className="bg-white">
                        <h2 className="text-2xl font-bold text-gray-900">Search your courses</h2>
                        <div class="mt-2"> <input id="search" name="search" type="text" autocomplete="search" placeholder="e.g Caricature" onChange={(e) => setSearch(e.target.value)}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      
                            {courseOwn?.filter((product) => {
                                if (String(product.status) === "2") {
                                    if (search === '') {
                                        return product;
                                    } else {
                                        return product.name?.toLowerCase().includes(search.toLowerCase())
                                    }
                                }
                            }).map((product) => (
                                <Link to={`/instructordashboard/preview/${product.id}`}><div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.image}
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
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructorName}</p>
                                        </div>
                                        {product.price === 0 ? (
                                            <p className="text-sm font-medium text-gray-900">Free</p>
                                        ) : <p className="text-sm font-medium text-gray-900">${product.price}</p>}

                                    </div>
                                </div></Link>
                               
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-20">Awaiting moderation</h2>
                        <h4 className="font-bold text-gray-900 mt-8">The courses are waiting to be approved by ArtHub</h4>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {courseOwn?.filter((product) => {
                                if (String(product.status) === "1") {
                                        return product;
                                }  
                            }).map((product) => (
                                <Link to={`/instructordashboard/preview/${product.id}`}><div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructorName}</p>
                                        </div>
                                        {product.price === 0 ? (
                                            <p className="text-sm font-medium text-gray-900">Free</p>
                                        ) : <p className="text-sm font-medium text-gray-900">${product.price}</p>}

                                    </div>
                                </div></Link>
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-20">Draft</h2>
                        <h4 className="font-bold text-gray-900 mt-8">Edit / Manage course</h4>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {courseOwn?.filter((product) => {
                                if (String(product.status) === "0") {
                                        return product;
                                }  
                            }).map((product) => (
                                <Link to={`/instructordashboard/preview/${product.id}`}><div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">Instructor: {product.instructorName}</p>
                                        </div>
                                        {product.price === 0 ? (
                                            <p className="text-sm font-medium text-gray-900">Free</p>
                                        ) : <p className="text-sm font-medium text-gray-900">${product.price}</p>}

                                    </div>
                                </div></Link>
                            ))}
                        </div>
                    </div>}

                </div>
            </main>
        </>
    )
}