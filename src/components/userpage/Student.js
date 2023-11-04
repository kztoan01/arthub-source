import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../api/axiosAccountConfig'
import apiCourse from '../api/axiosCourseConfig'
import { Link } from "react-router-dom";
import defaultImg from '../assets/image/default.jpg'
export default function Student() {
    const linkImg = 'https://storage.cloud.google.com/arthub-bucket/'
    const { id } = useParams()
    const [users, setUsers] = useState()
    const getUsers = async () => {
        try {
            const response = await api.get("/accounts");
            // console.log(response.data)
            setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []
    )

    const thisStudent = users?.find((user) => user.id == id)
    const features = [
        { name: 'About me', description: thisStudent?.bio },
    ]
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div className="grid gap-4 sm:gap-6 lg:gap-8 mb-10">
                    <img
                        src={thisStudent?.image ? linkImg + thisStudent?.image : defaultImg}
                        alt="Intructor image"
                        className="rounded-full bg-gray-100 w-48 h-48"
                    />
                </div>
                <div>
                    <p className="mt-4 text-gray-500">
                        Student
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{thisStudent?.firstname} {thisStudent?.lastname}</h2>


                    <dl className="mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="border-t border-gray-200 pt-4 mt-4">
                                <dt className="font-medium text-xl text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-lg text-gray-900 mb-8">{feature.description}</dd>
                                {thisStudent?.facebook ? <a href={thisStudent?.facebook} target="_blank">  <button href={thisStudent?.facebook} target="_blank" className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    Facebook
                                </button></a> : <></>}
                                {thisStudent?.twitter ? <a href={thisStudent?.twitter} target="_blank"> <button className="ml-4 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    Twitter
                                </button></a> : <></>}

                            </div>
                        ))}
                    </dl>
                </div>

            </div>
        </div>
    )
}