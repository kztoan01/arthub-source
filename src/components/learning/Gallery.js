import Video from "./Video.js";
import { useState } from "react";
import courseVideo from '../assets/video/Course.js - ArtHub - Visual Studio Code 2023-09-15 19-55-03.mp4'
import { useParams } from "react-router-dom";
import imgsrc from '../assets/image/course-01.jpg'
const datas = [
    {
        img:
            "https://i.ytimg.com/vi/0PfTU9JI6Lg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBDx0FPXyl9asnEXeJeQRjcNOh6bQ",
        link:
            courseVideo,
        title: "GFG POTD 1",
        description: "We will learn DFS of Graph in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/MxnpwpQA4I4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDtUunWidfJK9vnjZIBTg9AwWI6KA",
        link:
            "https://www.youtube.com/embed/MxnpwpQA4I4?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 2",
        description: "We will learn Shortest Source Path in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/OzWNBHxUYO0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCtPuRpTYFI24y71-DYiPaHcBmFfQ",
        link:
            "https://www.youtube.com/embed/OzWNBHxUYO0?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 3",
        description: "We will learn Shortest Path in this problem 3",
    },
    {
        img:
            "https://i.ytimg.com/vi/X05eictbWIg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC0L4vTEifv_Rd1g4uSmOERQB3BsQ",
        link:
            "https://www.youtube.com/embed/X05eictbWIg?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 4",
        description: "We will learn Reverse Stack in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/T3sWA_ha1-w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAB2JYkK6qTJFba5fUayiUyoyuNXg",
        link:
            "https://www.youtube.com/embed/T3sWA_ha1-w?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 5",
        description: "We will learn Chocolate Distribution in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/9SSIbuQPamk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAdV3kVTVr-htccC52e_j6ydhdJkA",
        link:
            "https://www.youtube.com/embed/9SSIbuQPamk?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 6",
        description: "We will learn String Permutation in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/E5Fz4-ylZ3E/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLALcFccFfnJhyjUqaqTs1ihK6sc9Q",
        link:
            "https://www.youtube.com/embed/E5Fz4-ylZ3E?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 7",
        description: "We will learn Solving Sudoku in this problem",
    },
    {
        img:
            "https://i.ytimg.com/vi/dz_tDiMo_eA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD9tGVL8i8BzyQ4TT4DpcAxRNNTMA",
        link:
            "https://www.youtube.com/embed/dz_tDiMo_eA?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ",
        title: "GFG POTD 8",
        description: "We will learn Fraction Pairs in this problem",
    },
];
export default function Gallery(props) {

    const { id } = useParams()
    const thisCourse = props.courses?.find((course) => String(course.id) === id)
    const [activeVid, setActiveVid] = useState("https://www.youtube.com/embed/0PfTU9JI6Lg?list=PLM68oyaqFM7TCNz4d5J_hxfFg8w41jTYJ")
    const [actTitle, setActTitle] = useState("GFG POTD 1");
    const [description, setActiveDescription] = useState("We will learn DFS of Graph in this problem")
    return (
        <>
            <div className="flex flex-row w-11/12 h-full pt-2">
                <Video
                    link={activeVid}
                    title={actTitle}
                    description={description}
                />
                <div
                    className="w-3/6 shadow-lg shadow-gray-600 
                           overflow-y-scroll flex flex-col 
                           mt-4 mr-20 border-slate-200 
                           border-2 rounded-lg"
                    style={{ height: "min(38vw, 650px)" }}
                >
                    <h3 className="text-2xl p-2 font-semibold">Section 1</h3>
                    <p className="px-2">All video in section 1</p>
                    {datas.map((data) => (
                            <div key={data.title}
                                className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       shadow-xl shadow-gray-300"
                                onClick={() => {
                                    setActiveVid(data.link);
                                    setActTitle(data.title);
                                    setActiveDescription(data.description);
                                }}
                            >
                                <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={"." + thisCourse?.image}
                                />
                                <p
                                    className="ml-2 font-semibold 
                                          pt-6 pl-8 text-sm"
                                >
                                    {data.title}
                                </p>
                                <p className="px-2">{data.description}</p>
                            </div>
                    ))}
                    <h3 className="text-2xl p-2 font-semibold">Section 2</h3>
                    <p className="px-2">All video in section 2</p>
                    {datas.map((data) => (
                            <div key={data.title}
                                className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       shadow-xl shadow-gray-300"
                                onClick={() => {
                                    setActiveVid(data.link);
                                    setActTitle(data.title);
                                    setActiveDescription(data.description);
                                }}
                            >
                                <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={data.img}
                                />
                                <p
                                    className="ml-2 font-semibold 
                                          pt-6 pl-8 text-sm"
                                >
                                    {data.title}
                                </p>
                                <p className="px-2">{data.description}</p>
                            </div>
                    ))}
                    <h3 className="text-2xl p-2 font-semibold">Section 3</h3>
                    <p className="px-2">All video in section 3</p>
                    {datas.map((data) => (
                            <div key={data.title}
                                className="hover:bg-gray-300 p-2
                                       border-2 rounded-xl h-2/6 
                                       shadow-xl shadow-gray-300"
                                onClick={() => {
                                    setActiveVid(data.link);
                                    setActTitle(data.title);
                                    setActiveDescription(data.description);
                                }}
                            >
                                <img
                                    className="w-1/2 h-20 my-4 
                                           mx-2 float-left"
                                    src={data.img}
                                />
                                <p
                                    className="ml-2 font-semibold 
                                          pt-6 pl-8 text-sm"
                                >
                                    {data.title}
                                </p>
                                <p className="px-2">{data.description}</p>
                            </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}
