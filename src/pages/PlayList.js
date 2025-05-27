import '../css/tailwind.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth} from '../context/AuthContext';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PopUp from "../components/PopUp";

function Entry({item}){
    const [isLove, setLove] = useState('')
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
                <h1>{item["track_name"]}</h1>
                <p>{item["artists"]}</p>
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

function List({data}){
    return(
        <>
            {data.map((item, index) => <Entry key={index} item ={item}/>)}
        </>
    )
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
                >Create a playlist</button>
                <PopUp openPopUp={openPopup} closePopUp={handleRemovePopup} />
            </div>
        </div>
    );
}

function PlayList(){
    const { user, playlist, verify} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!verify){
            navigate("/");
        }
    }, [verify]);

    return(
        <>
            {playlist.length > 0 ? <div className="w-1/2 mx-auto"><List data = {playlist}/></div>: <NoList />}
        </>
    );

}

export default PlayList;