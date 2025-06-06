import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";
import { useState } from 'react';

function Card({item, index, userIdx}){
    if(userIdx == index){
        return(
            <div className="w-2/5 h-2/5 bg-gray-200 ml-4 mr-4 text-center p-10 rounded-2xl 
                border-4 border-green-400 shadow-xl scale-105 z-10 
                transition-all duration-300 ease-in-out">
                {item}
            </div>
        );
    }
    
    return(
        <div className="w-1/5 h-1/5 bg-gray-200 ml-4 mr-4 text-center p-8 rounded-2xl 
                opacity-60 scale-95 
                transition-all duration-300 ease-in-out">
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
            onClick={createPlaylist} 
            className="bg-green-200 text-green-700 text-4xl p-6 rounded-xl basis-[20%] flex items-center justify-center">
            <MdOutlinePlaylistAdd />
        </button>
    );
}

function PlaylistSelection(){
    const ITEM_TO_DISPLAY = 3;
    const data = ["paylist 1", 'playlist 2', 'playlist 3', 'playlist 4'];
    // const [data, setData ] = useState([]);
    const [idx, setIdx] = useState(0);
    const itemsToRender = () => {
        console.log(idx)
        if(idx > ITEM_TO_DISPLAY-1){
            return data.slice(idx - ITEM_TO_DISPLAY +1 , idx+1);
        }else{
            return data.slice(0, ITEM_TO_DISPLAY);
        }
    }
    const dataToRender = !data || data.length < ITEM_TO_DISPLAY ? data :  itemsToRender();

    if(data.length == 0){
        return(
            <div className = "h-full w-1/2 mx-auto py-10 content-center">
                <div className = "flex flex-col justify-item items-center">
                    <div className = "pb-2 text-center">
                        You don't have any playlists yet<br />
                        Start building your music collection... 
                    </div>
                    <AddPlaylistButton/>
                </div>
            </div>
        );                
    }

    return(
        <div className = "h-full w-1/2 mx-auto py-10 content-center">
            <div className = "flex flex-col items-center">
                <div className="flex flex-row justify-item items-center w-full">
                    <div className="flex flex-row justify-center items-center basis-[80%]">
                        <button 
                            className="text-2xl"
                            onClick={() => setIdx((idx-1+data.length)%data.length)}> <FaArrowAltCircleLeft /></button> 
                        <div className="flex flex-row justify-center items-center basis-[80%]">
                            {dataToRender.map((item, index) => <Card
                            key={index}
                            item={item}
                            index={index}
                            userIdx={Math.min(idx, ITEM_TO_DISPLAY-1)}
                            />
                            )}
                        </div>
                        <button 
                            className="text-2xl"
                            onClick={() => setIdx((idx+1)%data.length)}> <FaArrowAltCircleRight /></button>
                    </div>
                    <AddPlaylistButton />
                </div>
            </div>
        </div>
    );
}

export default PlaylistSelection