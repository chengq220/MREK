import { useEffect, useState } from 'react';
import { useAuth} from '../context/AuthContext';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { playListDelete } from '../database/playlistCmd';

function Entry({item, deleteItem}){
    const [isLove, setLove] = useState('')
    const updateLike = () =>{
        console.log("hi")
    }

    const elementDelete = () => {
        deleteItem();
    }
    
    return(
        <div className="flex flex-row items-center h-24 rounded-lg overflow-hidden">
            <div className = "basis-[30%] flex justify-center">
                <img className="object-scale-down h-20 w-20 rounded-xl border" src={item["thumbnail"]} alt="thumbnail"/>
            </div>
            <div className="basis-[50%]">
                <h1 className="font-semibold">{item["track_name"]}</h1>
                <p className="text-gray-400">{item["artists"]}</p>
            </div>
            <button 
                onClick={updateLike}
                className="basis-[10%]">
                {isLove ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <button 
                onClick={elementDelete}
                className="basis-[10%]">
                <HiOutlineDotsVertical />
            </button>
        </div>
    );
}

function List({data, deleteItem}){
    return(
        <div className="py-10">
            {data.map((item, index) => <Entry key={index} item ={item} deleteItem = {() => deleteItem(index)}/>)}
        </div>
    )
}

function NoList(){
    return(
        <div className = "w-1/2 mx-auto py-10">
            <div className = "flex flex-col items-center">
                <div>
                    You do not currently have a playlist right now
                </div>
                <div>Create a playlist by adding songs from Search or Feed</div>
            </div>
        </div>
    );
}

function PlayList(){
    const{ playlist, setPlaylist} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [prevPlayList, setPrevPlayList] = useState([]);

    const deleteItem = async (idx) => {
        const snapshot = structuredClone(playlist);
        setPrevPlayList(snapshot);
        setIsLoading(true);
        let newCopy = structuredClone(playlist);
        const del = newCopy.splice(idx, 1);
        console.log(del[0]);
        setPlaylist(newCopy);
        await deleteFromPlayList(del[0]);
        setIsLoading(false);
    }

    const deleteFromPlayList = async (item) =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "playlist_name": "best_playlist", 
                        "song_idx": item["track_id"]};
        const response = await playListDelete(payload);
        if(response == null){
            console.log("error occured");
        }else{
            console.log('deleted successfully');
        }
    };

    if(isLoading){
        return (
            <>
                {prevPlayList.length > 0 ? <div className="w-1/2 mx-auto"><List data = {prevPlayList} deleteItem = {deleteItem}/></div>: <NoList />}
            </>
        )
    }


    return(
        <>
            {playlist.length > 0 ? <div className="w-1/2 mx-auto"><List data = {playlist} deleteItem = {deleteItem}/></div>: <NoList />}
        </>
    );

}

export default PlayList;