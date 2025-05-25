import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

const CardDefault = ({ song }) => {
    const addToPlayList = async() =>{
        const payload = {"username":sessionStorage.getItem("username"),
                        "song": song["idx"]}
        
        const res = await fetch("http://localhost:8000/addToPlaylist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
    }

    return (
        <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between">
            <h2 className="text-lg font-bold">{song['track_name']}</h2>
            <p>{song['artists']}</p>
            <p className="text-sm text-gray-500">{song['track_genre']}</p>
            <div className="flex justify-end">
                <button 
                onClick = {addToPlayList}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                    <IoMdAdd />
                </button>
            </div>
        </div>
    );
};
 
function GridDefault(){
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try{
            const userInfo = {
                'username':sessionStorage.getItem("username")
            }
            const res = await fetch("http://localhost:8000/getMusic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo)
            })
            const dat = await res.json()
            // console.log(dat)
            setData(dat.result)
        }
        catch (e){
            console.log("Failed to retrieve from db")
        }
    }; 

    if(!data){
        return(
             <div className="w-1/2 h-1/2 mx-auto">
                <div>Currently Loading Data</div>
             </div>
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

export default GridDefault;