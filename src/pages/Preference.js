import '../css/tailwind.css';
import { useState, useEffect } from 'react';
import { useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// function Preference() {
//     const navigate = useNavigate();
//     const { login, logout, verify} = useAuth();
//     const [artist, setArtist] = useState('')
//     const [genre, setGenre] = useState('')
//     const [load, setLoaded] = useState(false)
//     const username = sessionStorage.getItem("username")

//     useEffect(() => {
//         const fetchData = async () => {
//             await getPreference(); 
//             setLoaded(false);          
//         };
//         fetchData()
//     }, []);

//     useEffect(() => {
//         if(!verify){
//             navigate("/");
//         }
//     }, [verify]);

//     useEffect(()=>{
//     }, [load]);

//     const handleArtistChange = (event) => {
//         setArtist(event.target.value)
//     }

//     const handleGenreChange = (event) => {
//         setGenre(event.target.value)
//     }

//     const getPreference = async() =>{
//         const userinfo = {'user': username}
//         const response = await fetch("http://localhost:8000/getPref", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userinfo)
//         })
//         if(response.ok){
//             let data = await response.json()
//             if( data["res"].length > 0){
//                 const dd = data["res"][0]
//                 setGenre(dd["fav_genre"])
//                 setArtist(dd["fav_artist"])
//                 setLoaded(true)
//             }
//         }
//     }

//     const submitPreference = async () =>{
//         const preference = {'user': username, 'artist': artist, 'genre': genre}
//         const response = await fetch("http://localhost:8000/updatePref", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(preference)
//         })
//         console.log(response)
//         if(response.ok){
//             navigate("/feed")
//         }
//     }

//     return (
//         <div className="flex h-screen">
//             <div className="m-auto">
//                 <h1>Preferences</h1>
//                 <div className="w-full max-w-xs">
//                     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                         <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Genre
//                         </label>
//                         <input 
//                             value={genre || ""}
//                             onChange={handleGenreChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                             type="text" 
//                             placeholder="Genre"/>
//                         </div>
//                         <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Artist
//                         </label>
//                         <input 
//                             value={artist || ""}
//                             onChange={handleArtistChange} 
//                             className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
//                             type="text" 
//                             placeholder="Artist"/>
//                         </div>
//                         <div className="flex items-center justify-between">
//                         <button
//                             onClick={submitPreference} 
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//                             Setup Preference
//                         </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Preference;

function Preference() {
    const navigate = useNavigate();
    const { login, logout, verify} = useAuth();
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [load, setLoaded] = useState(false)
    const username = sessionStorage.getItem("username")

    useEffect(() => {
        const fetchData = async () => {
            await getPreference(); 
            setLoaded(false);          
        };
        fetchData()
    }, []);

    useEffect(() => {
        if(!verify){
            navigate("/");
        }
    }, [verify]);

    useEffect(()=>{
    }, [load]);

    const handleArtistChange = (event) => {
        setArtist(event.target.value)
    }

    const handleGenreChange = (event) => {
        setGenre(event.target.value)
    }

    const getPreference = async() =>{
        const userinfo = {'user': username}
        const response = await fetch("http://localhost:8000/getPref", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userinfo)
        })
        if(response.ok){
            let data = await response.json()
            if( data["res"].length > 0){
                const dd = data["res"][0]
                setGenre(dd["fav_genre"])
                setArtist(dd["fav_artist"])
                setLoaded(true)
            }
        }
    }

    const submitPreference = async () =>{
        const preference = {'user': username, 'artist': artist, 'genre': genre}
        const response = await fetch("http://localhost:8000/updatePref", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(preference)
        })
        console.log(response)
        if(response.ok){
            navigate("/feed")
        }
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1>Preferences</h1>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Genre
                        </label>
                        <input 
                            value={genre || ""}
                            onChange={handleGenreChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="Genre"/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Artist
                        </label>
                        <input 
                            value={artist || ""}
                            onChange={handleArtistChange} 
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="Artist"/>
                        </div>
                        <div className="flex items-center justify-between">
                        <button
                            onClick={submitPreference} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Setup Preference
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Preference;