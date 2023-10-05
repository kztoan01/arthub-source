import { Link } from "react-router-dom";

function Cover() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Want to become an instructor? <Link to="/login" href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Register <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">ArtHub Connect Towards Passion</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">ArtHub courses are video-based experiences that give students the chance to learn actionable skills.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                       <Link to="/login" href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</Link>
                       <Link to="/aboutus" href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
// {style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}
export default Cover;