import Video from "./Video.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/solid";
import apiLearner from '../api/axiosLearnerConfig.js'
import apiCourse from '../api/axiosCourseConfig.js'
const datas = [
    {
        img:
            "https://i.ytimg.com/vi/Sv5yCzPCkv8/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH",
        title: "SZA - Snooze",
        description: "My favorite song from my celebrity crush",
    },
    {
        img:
            "https://i.ytimg.com/vi/TzECmqe61_g/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/TzECmqe61_g?si=fLiVfe0jvk0kSV3w",
        title: "Zola - Belles Femmes",
        description: "Belles Femmes - nouveau titre de Zola.",
    },
    {
        img:
            "https://i.ytimg.com/vi/l5M64JuiZAE/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/l5M64JuiZAE?si=bXwI1IYcPmpRTPTm",
        title: "21 Savage - Can't Leave Without It",
        description: "The best rap song. Indeed",
    },
    {
        img:
            "https://i.ytimg.com/vi/arB4LBg_80M/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/xvDPtb6_IoM?si=yBYeibWoRJfrz9zl",
        title: "No Auto Durk",
        description: "My favorite of Lil Durk",
    },
    {
        img:
            "https://i.ytimg.com/vi/51vVIvPl_EA/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/u0LaoQks5mY?si=39iqnpzjauJqiooR",
        title: "Migos - Need It (Official Video) ft. YoungBoy Never Broke Again",
        description: "I said I neededdddd",
    },
    {
        img:
            "https://i.ytimg.com/vi/nCglrp951YI/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/nCglrp951YI?si=ZE7bCg30MCvhyYUO",
        title: "Offset - Legacy ft. Travis Scott, 21 Savage",
        description: "ft. 21 Savage on top",
    },
    {
        img:
            "https://images.genius.com/31496d46a302dd9b55416525688ac9d9.1000x1000x1.png",
        link:
            "https://www.youtube.com/embed/I4DjHHVHWAE?si=kPxOXPWjIdLEJoLb",
        title: "Drake, 21 Savage - Rich Flex",
        description: "Can 21 do something for Drake?",
    },
    {
        img:
            "https://i.ytimg.com/vi/vpubBZdPbtg/maxresdefault.jpg",
        link:
            "https://www.youtube.com/embed/vpubBZdPbtg?si=etXFyjCSBOzCISAw",
        title: "Cảm ơn - Ngài ft Rush",
        description: "Ngài comeback",
    },
];
export default function Gallery(props) {
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
    const thisCourse = courses?.find((course) => String(course.id) === id)
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
                    <h3 className="text-2xl p-2 font-semibold">Section 1: Introduction</h3>
                    {datas.map((data) => (
                            <div key={data.title}
                                className={actTitle === data.title ? ("bg-gray-200 p-2 rounded-xl h-2/6 ") : ("hover:bg-gray-200 p-2 rounded-xl h-2/6 ")}
                                onClick={() => {
                                    setActiveVid(data.link);
                                    setActTitle(data.title);
                                    setActiveDescription(data.description);
                                }}
                            >  
                                <PlayIcon class="h-6 w-6 text-gray-500" />
                                {/* <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={data.img}
                                    // {"." + thisCourse?.image}
                                /> */}
                                
                                <p
                                    className="ml-2 font-semibold 
                                          pl-6 text-sm"
                                >
                                    {data.title}
                                </p>
                                <p className="px-2 text-sm">{data.description}</p>
                            </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}
