export default function Video(props) {
    const linkVid = 'http://localhost:8080//videos//'
    return (
        <div className="w-screen flex h-screen flex-row mx-12">
            <div className="w-full h-full  px-2 pt-2 
                            rounded-xl">
                <iframe allowFullScreen={true} src={linkVid+props.link} className="w-full h-5/6"></iframe>
            </div>
        </div>
    );
}