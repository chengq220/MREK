import { SiFastapi, SiPostgresql  } from "react-icons/si";
import { FaReact, FaSpotify, FaAws } from "react-icons/fa";
import { RiTailwindCssLine, RiVercelLine  } from "react-icons/ri";

function Home() {
    return (
        <div className="w-full flex flex-col items-center px-4 py-10 space-y-10 max-w-screen-lg mx-auto">
            
            <div className="text-center space-y-4">
                <h1 className="font-bold text-3xl md:text-4xl">
                    MREK: A Content-Based Music Recommender System
                </h1>
                <p className="text-lg text-gray-600">
                    Built using sound features of songs to deliver personalized playlist experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                
                 <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold text-xl">Playlist Management</h2>
                        <div className="rounded-xl shadow-md p-2 bg-white flex justify-center">
                            <img
                                className="w-full rounded"
                                src="/screenshot/playlist_management.png"
                                alt="Feed"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl"></h2>
                        <div className="rounded-xl shadow-md p-2 bg-white flex justify-center">
                            <img
                                className="w-full rounded"
                                src="/screenshot/playlist.png"
                                alt="Search"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold text-xl">Feed</h2>
                        <div className="rounded-xl shadow-md p-2 bg-white flex justify-center">
                            <img
                                className="w-full rounded"
                                src="/screenshot/feed.png"
                                alt="Feed"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl">Search</h2>
                        <div className="rounded-xl shadow-md p-2 bg-white flex justify-center">
                            <img
                                className="w-full rounded"
                                src="/screenshot/search.png"
                                alt="Search"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-100 p-6 rounded-xl shadow-inner">
                <h2 className="text-2xl underline font-semibold mb-2 text-center w-full">Tech Stack</h2>
                <div className="flex flex-row justify-between">
                    <FaReact size={50}/>
                    <SiPostgresql size={50}/>
                    <SiFastapi size={50}/>
                    <RiTailwindCssLine size={50} />
                    <FaSpotify size={50}/>
                    <RiVercelLine size={50}/>
                    <FaAws size={50}/>
                </div>
            </div>
        </div>
    );
}

export default Home