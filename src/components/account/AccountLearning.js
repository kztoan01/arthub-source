import { Link } from "react-router-dom";
export default function AccountLearning(props) {
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const learner = props.learner
    const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount.id);
    const courses = props.courses
    // console.log(thisStudent)
    // console.log(courses)
    const learningCourses = courses?.filter((course) => {
        return thisStudent.some((learn) => {
            return learn.courseId === course.id
        })
    })
    // console.log(learningCourses)
    // const learningCourses = props.courses?.map((course) => ({
    //     id : course.id,
    //     match: learner?.some((learn) => learn.courseId === course.id )

    // }))
    // console.log(learningCourses)
    // const learningCourses = props.courses?.filter((course) => course.id === thisStudent.courseId)

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Learning</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/*content */}
                    {learningCourses?.length === 0 ? (
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Vous n'avez encore participé à aucun cours. S'inscrire maintenant!</h1>
                    ) : <div className="bg-white">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {learningCourses?.map((product) => (
                            <Link to={`/learning/${product.id}`}><div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={"." + product.image}
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
                                    ) : <p className="text-sm font-medium text-gray-900">{product.price}</p>}

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