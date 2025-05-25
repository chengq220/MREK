import '../../css/tailwind.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth} from '../auth/AuthContext';
import { FcLike, FcLikePlaceholder  } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";

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

function PlayList(){ 
    const navigate = useNavigate();
    const {  token, login, logout, verify} = useAuth();

    useEffect(() => {
        if(!verify){
            navigate("/");
        }
    }, [verify]);
    
    return(
        <div className="w-1/2 mx-auto">
            <Entry />
       </div>
    );
}


export default PlayList;