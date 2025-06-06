import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";
import { useState } from 'react';

function Card({item}){
    return(
        <div className="w-1/5 h-1/5 bg-gray-200 m-2 text-center p-8 rounded-2xl">
            {item}
        </div>
    );
}

function AddPlaylistButton(){
    const createPlaylist = async () =>{
        console.log("hi playlist created");
    }
    return(
        <button
            onClick={createPlaylist()} 
            className="bg-green-200 text-green-700 text-4xl p-6 rounded-full basis-[20%] flex items-center justify-center">
            <MdOutlinePlaylistAdd />
        </button>
    );
}

function PlaylistSelection(){
    const data = ["paylist 1", 'playlist 2', 'playlist 3', 'playlist 4'];
    // const [data, setData ] = useState([]);
    const [idx, setIdx] = useState(0);
    const itemsTorender = [(idx + data.length) % data.length, (idx + 1 + data.length) % data.length, (idx + 2 + data.length) % data.length];
    const dataToRender = !data || data.length < 3 ? data : itemsTorender.map(i => data[i]);

    if(data.length == 0){
        return(
            <div className = "w-1/2 mx-auto py-10">
                <div className = "flex flex-col justify-item items-center">
                    <div>
                        You do not currently have a playlist right now. 
                    </div>
                    <div>Start by creating a playlist</div>
                    <AddPlaylistButton/>
                </div>
            </div>
        );                
    }

    return(
        <div className = "w-1/2 mx-auto py-10">
            <div className = "flex flex-col items-center">
                <div className="flex flex-row justify-item items-center w-full">
                    <div className="flex flex-row justify-center items-center basis-[80%]">
                        {data.length > 3 && <button 
                                                    className="text-2xl"
                                                    onClick={() => setIdx(idx-1)}> <FaArrowAltCircleLeft /></button> }
                        <div className="flex flex-row justify-center items-center basis-[80%]">
                            {dataToRender.map((item, index) => <Card
                            key={index}
                            item={item}
                            />
                            )}
                        </div>
                        {data.length > 3 &&<button 
                                                    className="text-2xl"
                                                    onClick={() => setIdx(idx+1)}> <FaArrowAltCircleRight /></button> }
                    </div>
                    <AddPlaylistButton />
                </div>
            </div>
        </div>
    );
}

export default PlaylistSelection