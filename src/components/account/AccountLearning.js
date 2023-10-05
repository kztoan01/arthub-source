export default function AccountLearning(props) {
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const learner = props.learner
    const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount.id);
    console.log(thisStudent)
    // const learningCourses = props.courses?.map((course) => ({
    //     id : course.id,
    //     match: learner?.some((learn) => learn.courseId === course.id )

    // }))
    // console.log(learningCourses)
    // const learningCourses = props.courses?.filter((course) => course.id === thisStudent.courseId)
    console.log(props.courses)
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Learning</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}</div>
            </main>
        </>
    )
}