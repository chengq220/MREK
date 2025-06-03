import { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Loading from "../components/Loading";
import { useAuth} from '../context/AuthContext';

const CardDefault = ({ song }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addToPlayList = async () =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "playlist_name": "best_playlist", 
                        "song_idx": song["track_id"]}
        
        const res = await fetch("http://localhost:8000/addToPlaylist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
        if(res.ok){
            console.log("added successfully")
        }else{
            console.log("error occured")
        };
    };

    const deleteFromPlayList = async () =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "playlist_name": "best_playlist", 
                        "song_idx": song["track_id"]}
        try{
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
        }catch(error){
            console.log("server side error");
        };
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

    return (
        <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between rounded-xl">
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
 
function GridDefault(){
    const [data, setData] = useState(null);
    const {playlist} = useAuth();

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try{
            const userInfo = {
                'username':sessionStorage.getItem("username"),
                'hasPref': playlist ? true : false
            }
            const res = await fetch("http://localhost:8000/getMusic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo)
            })
            const dat = await res.json()
            setData(dat.result)
        }
        catch (e){
            console.log("Failed to retrieve from db")
        }
    }; 

    if(!data){
        return(
             <Loading />
        )
    }
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10 auto-cols-fr">
            {data.map((item, index) => <CardDefault
                key={index}
                song={item}
                />
            )}
        </div>
    );
}

function Feed(){
    return(
        <div className="w-1/2 mx-auto">
            <GridDefault/>
        </div>
    );
}

export default Feed;