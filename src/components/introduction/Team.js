import toan from '../assets/image/toan.jpg'
import nha from '../assets/image/nha.jpg'
import loc from '../assets/image/loc.jpg'
import phu from '../assets/image/default.jpg'
const people = [
    {
        name: 'Trần Bảo Toàn',
        role: 'Co-Founder / CEO',
        imageUrl: toan,
    },
    {
        name: 'Ngô Huỳnh Tấn Lộc',
        role: 'Co-Founder / CFO',
        imageUrl: loc,
    },
    {
        name: 'Nguyễn Hiệp Phú',
        role: 'Co-Founder / CTO',
        imageUrl: phu,
    },
    {
        name: 'Huỳnh Thanh Nhã',
        role: 'Co-Founder / CHRO',
        imageUrl: nha,
    },
    {
        name: 'Phan Bông Quốc Huy',
        role: 'Co-Founder / CCO',
        imageUrl: phu,
    },

]

export default function Team() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    ArtHub was founded by 5 members from FPT University. With the mission of providing a platform to provide courses to 
                    all students around the world.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}