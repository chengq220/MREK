import { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Loading from "../components/Loading";
import queryDatabase from '../database/query';
import { playListAdd, playListDelete } from '../database/playlistCmd';
import "../css/card.css";
import { useSelector } from 'react-redux';
import { getPlaylist } from '../redux/user';

const CardDefault = ({ song }) => {
    const [ isAdded, setIsAdded ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const user = useSelector(state => state.user.username);
    
    const addToPlayList = async () =>{
        const payload = {"username":user,
                        "playlist_name": "best_playlist", 
                        "song_idx": song["track_id"]};
        const response = await playListAdd(payload);
        if(response == null){
            console.log("an error occured");
        }else{
            console.log("added successfully");
        }
    };

    const deleteFromPlayList = async () =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "playlist_name": "best_playlist", 
                        "song_idx": song["track_id"]};
        const response = await playListDelete(payload);
        if(response == null){
            console.log("an error occured");
        }else{
            console.log("deleted successfully");
        }
    };

    const clickAddDel = async () => {
        setIsLoading(true);
        if(isAdded){
            await deleteFromPlayList();
            setIsAdded(false);
        }else{
            await addToPlayList();
            setIsAdded(true)
        };
        getPlaylist();
        setIsLoading(false);
    };

    return (
         <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between rounded-xl">
            <div>
                <img className="rounded-xl" src={song["thumbnail"]} alt="thumbnail"/>
            </div>
            <h2 className="text-lg font-bold">{song['track_name']}</h2>
            <p>{song['artists']}</p>
            <p className="text-sm text-gray-500">{song['track_genre']}</p>
            <div className="flex justify-end">
                <button 
                onClick = {clickAddDel}
                className={`${isAdded ? "bg-red-500" : "bg-blue-500"} ${isLoading? "pointer-events-none": "pointer-events-auto"} text-white px-4 py-2 rounded`}>
                    {isAdded? <FiMinus />: <IoMdAdd />}
                </button>
            </div>
        </div>
    );
};
 
function Feed(){
    const [ data, setData ] = useState(null);
    const playlist = useSelector(state => state.user.playlist);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        const payload = {
            'username':sessionStorage.getItem("username"),
            'hasPref': playlist.length > 0 ? true : false};
        
        const endpoint = "http://localhost:8000/getMusic";
        const response = await queryDatabase(payload, endpoint);
        if(response == null){
            console.log("error occured when reading from database");
        }else{
            const data = await response.json();
            setData(data.result);
        }
    }; 

    if(!data){
        return(
             <Loading />
        )
    }
    return(
        <div className="w-1/2 mx-auto">
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-4 gap-6 px-4 py-10 auto-cols-fr">
                {data.map((item, index) => <CardDefault className="w-1/4 h-1/3"
                    key={index}
                    song={item}
                    />
                )}
            </div>
        </div>
    );
};

export default Feed;