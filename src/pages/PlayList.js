import React, { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { playListDelete, fetchPlaylist } from '../database/playlistCmd';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { useParams, Navigate } from "react-router-dom";
import Header from '../components/playListHeader';
import { CiBookmarkRemove } from "react-icons/ci";

function Entry({item, deleteItem}){
    const [isLove, setLove] = useState(false);
    const updateLike = () =>{
        setLove(!isLove);
    }

    const elementDelete = () => {
        deleteItem();
    }
    
    return(
        <div className="flex flex-row items-center h-24 rounded-lg">
            <div className = "basis-[30%] flex justify-center">
                <img className="object-scale-down h-20 w-20 rounded-xl border" src={item["thumbnail"]} alt="thumbnail"/>
            </div>
            <div className="basis-[50%] w-[150px]">
                <h1 className="font-semibold truncate">{item["track_name"]}</h1>
                <p className="text-gray-400 truncate">{item["artists"]}</p>
            </div>
            <button 
                onClick={updateLike}
                className="basis-[10%]">
                {isLove ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <button 
                onClick={elementDelete}
                className="basis-[10%]">
                <CiBookmarkRemove />
            </button>
        </div>
    );
}

function List({data, deleteItem}){
    return(
        <div className="py-10">
            <Header playlist = {data}/>
            {data.map((item, index) => <Entry key={index} item ={item} deleteItem = {() => deleteItem(index)}/>)}
        </div>
    )
}

function NoList(){
    return(
        <div className = "w-1/2 h-full mx-auto py-10">
            <div className = "flex flex-col items-center">
                <div className = "bg-gray-100 mb-10 p-10 rounded-full">
                    <img className = "w-48 h-48 " src="/assets/empty.svg" />
                </div>
                <div>Start by adding songs from /search or /feed</div>
            </div>
        </div>
    );
}

function PlayList(){
    const user = useSelector(state => state.user.username);
    const userPlaylists = useSelector(state => state.user.playlist);
    const { playlist_name } = useParams();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ playlist, setPlaylist ] = useState([]);

    const isInvalidName = !playlist_name || 
        playlist_name.endsWith('.css') || 
        playlist_name.includes('.') || 
        !userPlaylists.map(item => item["playlist"]).includes(playlist_name);
        

    const deleteItem = async (idx) => {
        setIsLoading(true);
        let newCopy = structuredClone(playlist);
        const del = newCopy.splice(idx, 1);
        console.log(del[0]);
        setPlaylist(newCopy);
        await deleteFromPlayList(del[0]);
        setIsLoading(false);
    }

    const deleteFromPlayList = async (item) =>{
        const payload = {"username": user,
                        "playlist_name": playlist_name, 
                        "song_idx": item["track_id"]};
        const response = await playListDelete(payload);
        if(response == null){
            console.log("error occured");
        }else{
            console.log('deleted successfully');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if(isInvalidName){
                return;
            }
            setIsLoading(true);
            const payload = {"username": user,
                             "playlist_name": playlist_name};
            const res = await fetchPlaylist(payload);
            if (res != null) {
                setPlaylist(res);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    
    if(isLoading){
        return <Loading />;
    }

    if(isInvalidName){
        return <Navigate to="/not-found" />;
    }

    return(
        <div className = "flex justify-center items-center h-full">
            <div className="w-1/2 ">
                {playlist.length > 0 ? <div className="w-1/2 mx-auto"><List data = {playlist} deleteItem = {deleteItem}/></div>: <NoList />}
            </div>
        </div>
    );

}

export default PlayList;