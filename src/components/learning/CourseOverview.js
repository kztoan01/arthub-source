import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import CourseDetails from "./CourseDetails";
import CourseRating from "./CourseRating";
import CourseAnnouncements from "./CourseAnnouncements";
import { useState } from "react";
export default function CourseOverview() {
    const data = [
        {
            label: "Overview",
            value: "overview",
            desc: <CourseDetails />,
        },
        {
            label: "Search",
            value: "search",
            desc:
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div class="sm:col-span-3"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Search course content</label>
                        <div class="mt-2"> <input id="search" name="search" type="text" autocomplete="search" placeholder="e.g Caricature"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Start a new search
                    </h2>
                    <label class="text-center block text-sm font-medium leading-6 text-gray-900">To find captions, lectures or resources</label>
                </div>
            ,
        },
        {
            label: "Announcements",
            value: "announcements",
            desc: <CourseAnnouncements />,
        },
        {
            label: "Reviews",
            value: "reviews",
            desc: <CourseRating />,
        },
        {
            label: "Learning tools",
            value: "learningtools",
            desc: <CourseDetails />,
        },
    ];
    const [activeTab, setActiveTab] = useState("overview");
    return (
        <div className="container isolate bg-white px-6 py-24 sm:py-0 lg:px-24">
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-gray-900" : ""}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}