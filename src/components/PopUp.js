import { useState, useEffect } from 'react';
import { playListAdd, playListDelete } from '../database/playlistCmd';
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const PopUp = ({ data, closePopUp }) => {

    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const addToPlayList = async () =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "playlist_name": "best_playlist", 
                        "song_idx": data["track_id"]};
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
                        "song_idx": data["track_id"]};
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
        setIsLoading(false);
    };


    const handlelosePopUp = (e) => {
        e.stopPropagation();
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closePopUp();
                console.log('Close');
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div
            id='ModelContainer'
            onClick={handlelosePopUp}
            className='fixed inset-0 bg-black rounded-xl flex justify-center items-center bg-opacity-5 backdrop-blur-sm'>
            <div className='p-2 bg-white w-4/12 md:w-2/5 lg:1/5 md:h-1/2 shadow-inner border-e-emerald-600 rounded-lg py-5'>
                <div className=' p-3 justify-center items-center flex flex-row'>
                    <div className="basis-[60%] w-1/2 h-1/2">
                        <img className="rounded-xl" src={data["thumbnail"]} alt="thumbnail"/>
                    </div>
                    <div className = "basis-[40%] flex flex-col justify-center items-center">
                        <div className = "flex flex-row justify-center items-center">
                            <div className="basis-[50%] flex flex-col justify-center items-center"> 
                                <h2 className="text-lg font-bold">Track:</h2>
                                <p>Album:</p>
                                <p>Artists:</p>
                                <p className="text-sm text-gray-500">Genre:</p>
                                
                            </div>
                            <div className="basis-[50%] flex flex-col justify-center items-center"> 
                                <h2 className="text-lg font-bold">{data['track_name']}</h2>
                                <p>{data['album_name']}</p>
                                <p>{data['artists']}</p>
                                <p className="text-sm text-gray-500">{data['track_genre']}</p>
                                
                            </div>
                        </div>
                        <div>
                            <button 
                                onClick = {clickAddDel}
                                className={`${isAdded ? "bg-red-500" : "bg-blue-500"} ${isLoading? "pointer-events-none": "pointer-events-auto"} text-white px-4 mt-6 py-2 rounded`}>
                                    {isAdded? <FiMinus />: <IoMdAdd />}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp