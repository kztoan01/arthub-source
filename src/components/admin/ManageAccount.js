import course1 from '../assets/image/toan.jpg'
export default function ManageAccount(props) {
    const admin = "4"
    const users = props.users;
    const students = users?.filter((user) => String(user.roleId) === "2");
    const staffs = users?.filter((user) => String(user.roleId) === "3");
    const instructors = users?.filter((user) => String(user.roleId) === "1");
    const admins = users?.filter((user) => String(user.roleId) === "4");
    const manage = [
        {
            name: 'Staff Account',
            user : staffs
        },
        {
            name: 'Instructor Account',
            user :instructors
        },
        {
            name: 'Student Account',
            user :students
        }, {
            name: 'Admin Account',
            user :admins
        },
    ]
    return (

        <>
            {manage?.map((callout) => (
                <>
                    <header className="bg-white shadow" key={manage.name}>
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{callout.name}</h1>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <ul role="list" className="divide-y divide-gray-100">
                                {callout.user?.map((person) => (
                                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.image} alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.lastname} {person.firstname}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{person.address}</p>
                                            <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
                                            {person.roleId === admin ? (
                                                <p className="text-sm leading-6 text-gray-900">Administrator</p>
                                            ) : <></>}
                                            {/* <p className="text-sm leading-6 text-gray-900">{person.roleId}</p> */}
                                            {/* {person.lastSeen ? (
                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                </p>
                                            ) : (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                                </div>
                                            )} */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>
                </>
            ))}
        </>
    )
}