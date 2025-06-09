import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { ImCheckboxUnchecked, ImCheckboxChecked  } from "react-icons/im";
import { playListAdd, playListDelete, fetchPlaylist } from '../database/playlistCmd';
import { useEffect, useState } from "react";
import "../css/dropdown.css";

function DropDownItem({playlist_name, user, song_idx}){

    const playlist_exist = useSelector(state => state.user.playlistExist);
    const [exist, setExist] = useState(playlist_exist.some(item => item["playlist_name"] === playlist_name && item["song_id"] === song_idx));
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     console.log(playlist_exist);
    // }, [])

    const addToPlayList = async () =>{
        const payload = {"username": user,
                        "playlist_name": playlist_name, 
                        "song_idx": song_idx};
        console.log(payload);
        const response = await playListAdd(payload);
        if(response == null){
            console.log("an error occured");
        }else{
            console.log("added successfully");
        }
    };

    const deleteFromPlayList = async () =>{
        const payload = {"username": user,
                        "playlist_name": playlist_name, 
                        "song_idx":song_idx};
        const response = await playListDelete(payload);
        if(response == null){
            console.log("an error occured");
        }else{
            console.log("deleted successfully");
        }
    };

    const clickAddDel = async () => {
        const payload = {"username": user,
                        "playlist_name": playlist_name};
        setIsLoading(true);
        if(exist){
            await deleteFromPlayList();
            setExist(false);
        }else{
            await addToPlayList();
            setExist(true)
        };
        await fetchPlaylist(payload);
        setIsLoading(false);
    };

    return(
        <div className="hover:bg-gray-400 mb-2 p-2">
            <button 
                onClick={clickAddDel} 
                className="w-full text-left">
                <div className="flex items-center justify-between w-full">
                    {playlist_name}    
                    {exist ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </div>
            </button>
        </div>
    );
}

function AddDelButton({song_idx}){
    const playlist = useSelector(state => state.user.playlist).map(pl_idx => pl_idx["playlist"]);
    const username = useSelector(state => state.user.username);
    useEffect(()=>{
        console.log(playlist);
    }, [])

    return (
        <div className="dropdown">
            <button className="dropbtn flex flex-row bg-green-500 justify-center items-center p-3 rounded-2xl mt-4">
                <div>Add to Playlist</div>
                <FaCaretRight />
            </button>
            <div className="dropdown-content rounded-xl">
                {playlist.map((item, idx)=> <DropDownItem key={idx} playlist_name={item} user={username} song_idx={song_idx}/>)}
            </div>
        </div> 
    );
}

export default AddDelButton