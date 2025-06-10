import { useEffect, useState } from 'react';
import Loading from "../components/Loading";
import queryDatabase from '../database/query';
import AddDelButton from '../components/AddDelButton';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlaylistExist } from '../redux/user';
import "../css/card.css";

const CardDefault = ({ song }) => {
    return (
         <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between rounded-xl">
            <div>
                <img className="rounded-xl" src={song["thumbnail"]} alt="thumbnail"/>
            </div>
            <div className = "w-[150px]">
                 <h2 className="text-lg font-bold truncate">{song['track_name']}</h2>
            </div>
            <p className='truncate w-[150px]'>{song['artists']}</p>
            <p className="text-sm text-gray-500 truncate w-[150px]">{song['track_genre']}</p>
            <div className="flex justify-end">
                <AddDelButton song_idx={song["track_id"]}/>
            </div>
        </div>
    );
};
 
function Feed(){
    const [ data, setData ] = useState(null);
    const user = useSelector(state => state.user.username);
    const playlist = useSelector(state => state.user.playlist).map(song_idx => song_idx["playlist"]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        const payload = {
                    'username': user,
                    'playlists': playlist};
        const endpoint = `http://${process.env.REACT_APP_BAP}/getMusic`;
        const response = await queryDatabase(payload, endpoint);
        if(response == null){
            console.log("error occured when reading from database");
        }else{
            const data = await response.json();
            setData(data.result);
            dispatch(updatePlaylistExist(data["exist"]));
        }
    }; 

    if(!data){
        return(
             <Loading />
        )
    }
    return(
        <div className="w-1/2 mx-auto">
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-4 gap-6 px-4 py-10 auto-cols-fr">
                {data.map((item, index) => <CardDefault className="w-1/4 h-1/3"
                    key={index}
                    song={item}
                    />
                )}
            </div>
        </div>
    );
};

export default Feed;