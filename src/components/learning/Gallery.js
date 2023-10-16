import Video from "./Video.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/solid";
import apiLearner from '../api/axiosLearnerConfig.js'
import apiCourse from '../api/axiosCourseConfig.js'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
export default function Gallery(props) {
    // const [courses, setCourses] = useState()
    // const getCourses = async () => {
    //     try {
    //         const response = await apiCourse.get("/getCourses");
    //         setCourses(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getCourses();
    // }, []
    // )
    const [learner,setLearner] = useState()
    const getLearner = async () => {
      try {
        const response = await apiLearner.get("/getLearners");
        setLearner(response.data);
      } catch (err) {
        alert(err);
      }
    }
  
    useEffect(() => {
      getLearner();
    }, []
    )
    const { id } = useParams()
    const navigate = useNavigate()
    const thisAccount = JSON.parse(localStorage.getItem("logined"))
    const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount.id);
    const isEnroll = thisStudent?.find((thisStudent) => String(thisStudent.courseId) === id)
    if(isEnroll == null) {
        navigate('/')
    }
    const formCourseData = new FormData();
    formCourseData.append('id', id);

    const [thisCourse, setThisCourse] = useState()
    const getThisCourse = async () => {
        try {
            const response = await apiCourse.post("/showSectionAndVideo", formCourseData);
            setThisCourse(response.data)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getThisCourse();
    }, [])
    //const thisCourse = courses?.find((course) => String(course.id) === id)
    const [activeVid, setActiveVid] = useState("https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH")
    const [actTitle, setActTitle] = useState("SZA - Snooze");
    const [description, setActiveDescription] = useState("My favorite song from my celebrity crush")
    return (
        <>
         <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ml-12">
              <li className="text-sm">
                <a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {thisCourse?.name}
                </a>
              </li>
            </ol>
          </nav>
            <div className="flex flex-row w-full h-full pt-4 ">
                <Video
                    link={activeVid}
                    title={actTitle}
                    description={description}
                />
                <div
                  className="w-3/6 bg-white
                  overflow-y-scroll flex flex-col 
                  mt-4 mr-20 border-slate-200 
                  border-2 rounded-lg"
                  style={{ height: "min(38vw, 650px)" }}
                >
                   <h3 className="ml-2 text-xl p-2 font-semibold">Course Content</h3>
                 {thisCourse?.sections?.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6"> 
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.section_name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                              {section.videos.map((video) => (
                                  <div key={video.id} className="flex items-center"
                                  onClick={() => {
                                      setActiveVid(video.data);
                                  }}>
                                    {/* <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    /> */}
                                     <PlayIcon class="h-6 w-6 text-gray-500" />
                                    <label
                                      // htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className={video.data === activeVid ? ("bg-gray-200 p-2 rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500") : ("hover:bg-gray-200 p-2 rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500")}
                                    >
                                       {video.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    </div>
                 {/* <div
                  className="w-3/6 bg-white
                  overflow-y-scroll flex flex-col 
                  mt-4 mr-20 border-slate-200 
                  border-2 rounded-lg"
                  style={{ height: "min(38vw, 650px)" }}
                >
                  {thisCourse?.sections?.map((section) => (
                    <>
                      <h3 className="text-xl p-2 font-semibold">{section.section_name}</h3>
                      {section.videos.map((video) => (
                        <div key={video.id}
                          className={activeVid === video.data ? ("bg-gray-200 p-2 rounded-xl h-2/6 ") : ("hover:bg-gray-200 p-2 rounded-xl h-2/6 ")}
                          onClick={() => {
                              setActiveVid(video.data);
                          }}
                        >
                          <PlayIcon class="h-6 w-6 text-gray-500" />

                            <p
                              className="ml-2 font-semibold 
                                          pl-6 text-sm"
                            >
                              {video.name}
                            </p>
                          

                          <p className="px-2 text-sm">{video.script}</p>
                        </div>
                      ))}
                    </>))}

                </div> */}
            </div>
            
        </>
    )
}
