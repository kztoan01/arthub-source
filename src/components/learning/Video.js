export default function Video(props) {
    return (
        <div className="w-screen flex h-screen flex-row mx-12">
            <div className="w-full h-full  px-2 pt-2 
                            rounded-xl">
                <iframe src={props.link} className="w-full h-5/6"></iframe>
                {/* <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Title: {props.title}
                    <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Description: {props.description}
                    </p>
                </div> */}
            </div>
        </div>
    );
}