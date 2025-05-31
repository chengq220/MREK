import { useEffect, useState } from 'react';
import { useAuth} from '../context/AuthContext';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Entry({item, deleteItem}){
    const [isLove, setLove] = useState('')
    const updateLike = () =>{
        console.log("hi")
    }

    const elementDelete = () => {
        deleteItem();
    }
    
    return(
        <div className="bg-red-50 flex flex-row items-center">
            <div className="basis-[30%]">Thumbnail</div> 
            <div className="basis-[50%]">
                <h1>{item["track_name"]}</h1>
                <p>{item["artists"]}</p>
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
        <>
            {data.map((item, index) => <Entry key={index} item ={item} deleteItem = {() => deleteItem(index)}/>)}
        </>
    )
}

function NoList(){
    return(
        <div className = "w-1/2 mx-auto">
            <div className = "flex flex-col items-center">
                <div>
                    You do not currently have a playlist right now
                </div>
                <div>Create a playlist by adding songs from Search</div>
            </div>
        </div>
    );
}

function PlayList(){
    const{ playlist, setPlaylist, updatePlaylist} = useAuth();
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
                        "song_idx": item["track_id"]}
        
        const res = await fetch("http://localhost:8000/deleteFromPlaylist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
        if(res.ok){
            console.log("deleted successfully")
        }else{
            console.log("error occured")
        };
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