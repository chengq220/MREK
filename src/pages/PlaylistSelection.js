import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePlaylistPopup from '../components/playListCreate';

function Card({item, index, userIdx}){
    const navigate = useNavigate();

    const navigatePlaylist = () => {
        navigate("/playlist/" + item["playlist"]);
    }

    if(userIdx == index){
        return(
            <div 
                onClick={navigatePlaylist}
                className="w-2/5 h-2/5 bg-gray-200 ml-4 mr-4 text-center p-10 rounded-2xl 
                border-4 border-green-400 shadow-xl scale-105 
                transition-all duration-300 ease-in-out hover:cursor-pointer">
                {item["playlist"]}
            </div>
        );
    }
    
    return(
        <div 
            className="w-1/5 h-1/5 bg-gray-200 ml-4 mr-4 text-center p-8 rounded-2xl 
                opacity-60 scale-95 
                transition-all duration-300 ease-in-out ">
            {item["playlist"]}
        </div>
    );
}

function AddPlaylistButton(){
    const [popUp, setPopUp] = useState(false);

    return(
        <>
            <button
                onClick={()=>setPopUp(true)} 
                className="bg-green-200 text-green-700 text-4xl p-6 rounded-xl basis-[20%] flex items-center justify-center">
                <MdOutlinePlaylistAdd />
            </button>
            {popUp && <CreatePlaylistPopup closePopUp= {() => setPopUp(false)} />}
        </>
    );
}

function PlaylistSelection(){
    const ITEM_TO_DISPLAY = 3;
    const playlist = useSelector(state => state.user.playlist);
    const [idx, setIdx] = useState(0);
    const itemsToRender = () => {
        if(idx > ITEM_TO_DISPLAY-1){
            return playlist.slice(idx - ITEM_TO_DISPLAY +1 , idx+1);
        }else{
            return playlist.slice(0, ITEM_TO_DISPLAY);
        }
    }
    const dataToRender = !playlist || playlist.length < ITEM_TO_DISPLAY ? playlist :  itemsToRender();

    if(playlist.length == 0){
        return(
            <div className = "h-full w-1/2 mx-auto py-10 content-center">
                <div className = "flex flex-col justify-center items-center">
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
                            onClick={() => setIdx((idx-1+playlist.length)%playlist.length)}> <FaArrowAltCircleLeft /></button> 
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
                            onClick={() => setIdx((idx+1)%playlist.length)}> <FaArrowAltCircleRight /></button>
                    </div>
                    <AddPlaylistButton />
                </div>
            </div>
        </div>
    );
}

export default PlaylistSelection