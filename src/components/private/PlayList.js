import '../../css/tailwind.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth} from '../auth/AuthContext';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Loading from "../Loading";
import PopUp from "../PopUp";

function Entry(){
    const [isLove, setLove] = useState('')
    
    useEffect(() => {
    }, [isLove]);

    const updateLike = () =>{
        setLove(!isLove)
    }

    const showOption = () =>{
        console.log("show option button clicked")
    }
    
    return(
        <div className="bg-red-50 flex flex-row items-center">
            <div className="basis-[30%]">Thumbnail</div> 
            <div className="basis-[50%]">
                <h1>Song name</h1>
                <p>Artist name</p>
            </div>
            <button 
                onClick={updateLike}
                className="basis-[10%]">
                {isLove ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <button 
                onClick={showOption}
                className="basis-[10%]">
                <HiOutlineDotsVertical />
            </button>
        </div>
    );
}

function NoList(){
    const [openPopup, setPopup] = useState(false)
    const handleRemovePopup = () => {
        setPopup(false)
    }

    useEffect(() => {
    }, [openPopup]);

    return(
        <div className = "w-1/2 mx-auto">
            <div className = "flex flex-col items-center">
                <div>
                    You do not currently have a playlist right now
                </div>
                <button
                    onClick={()=> setPopup(true)}
                >Create a list</button>
                <PopUp openPopUp={openPopup} closePopUp={handleRemovePopup} />
            </div>
        </div>
    );
}

function Lists({data}){
    const [haveList, setHaveList] = useState(false)
    const getPlaylistItems = async() =>{
        const payload = {
            "username" : sessionStorage.getItem("username"),
            "playlist_name" : "best_playlist"
        }
        const res = await fetch("http://localhost:8000/getPlaylistItems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        if(res.ok){
            const data = await res.json()
        }
        
    }


    useEffect(() => {
        if(data.length > 0){
            setHaveList(true)
        }else{
            getPlaylistItems()
        }
    }, [])

    return(
        <>
        {haveList ? <div className="w-1/2 mx-auto"><Entry /></div>: <NoList />}
        </>
    );

}

function PlayList(){ 
    const navigate = useNavigate();
    const { token, login, logout, verify} = useAuth();
    const [isLoading, setLoad] = useState(true)
    const [dt, setData] = useState('')

    const getPlaylistData = async ()=>{
        const payload = {
            "username" : sessionStorage.getItem("username")
        }
        try{
            const res = await fetch("http://localhost:8000/getPlaylist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
            })
            if(res.ok){
                const data = await res.json()
                setData(data["result"])
                setLoad(false)
            }
        }
        catch (e){
            console.log(e)
        }
    }

    
    useEffect(() => {
        if(!verify){
            navigate("/");
        }
    }, [verify]);

    useEffect(() => {
        getPlaylistData()
    }, [])

    useEffect(() =>{}, [isLoading])
    
    return(
        <>
            {isLoading ? <Loading /> : <Lists data = {dt}/>}
        </>
       
    );
}


export default PlayList;