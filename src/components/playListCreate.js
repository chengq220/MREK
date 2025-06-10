import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createPlaylist } from '../database/playlistCmd';
import { getUserPlaylist } from '../redux/user';
import Loading from './Loading';
import { useDispatch } from 'react-redux';

const CreatePlaylistPopup = ({ closePopUp }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ playlistName, setPlaylistName ] = useState("");
    const [ isError, setIsError ] = useState("");
    const playlist = useSelector(state => state.user.playlist);
    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();

    const createPlaylistWrapper = async () => {
        if(playlistName == ""){
            setIsError("Playlist name can't be empty");
            return;
        }else if(playlistName.length <= 4){
            setIsError("Playlist name is too short")
            return ;
        }
        else if(playlist.map(p => p["playlist"]).includes(playlistName)){
            setIsError("Entered name already exists");
            return ;
        }else{
            setIsLoading(true);
            const payload = {
                "username" : username, 
                "playlist": playlistName
            };
            const res = await createPlaylist(payload);
            await dispatch(getUserPlaylist());
            setIsLoading(false);
            setIsError("");
            return "";
        }
    };

    const handlePlaylistName = (e) => {
        setPlaylistName(e.target.value);
    }

    const handlelosePopUp = (e) => {
        e.stopPropagation();
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    }

    useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.key === 'Escape') {
                closePopUp();
            } else if (event.key === 'Enter'){
                await createPlaylistWrapper();
            };
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if(isLoading){
        return <Loading />;
    }

    return (
        <div
            id='ModelContainer'
            onClick={handlelosePopUp}
            className='fixed inset-0 bg-black rounded-xl flex justify-center items-center bg-opacity-5 backdrop-blur-sm z-100 rounded-3xl'>
            <div className = "w-1/5 h-1/3 bg-white flex flex-col">
                <div className="basis-[20%] flex justify-between pt-3">
                    <button
                        onClick={closePopUp} 
                        className="p-4 text-lg text-gray-600 rounded-3xl m-5">
                        Cancel
                    </button>
                    <button
                        onClick={createPlaylistWrapper} 
                        className="p-4 bg-green-400 rounded-3xl m-5">
                        Create
                    </button>
                </div>
                <div className = "basis-[70%] flex flex-col justify-center items-center">
                    {isError != "" && <div className="text-red-500">{isError}</div>}
                    <input 
                    onChange={handlePlaylistName}
                    className = "w-3/4 border border-black rounded-xl m-2" placeholder='Playlist name here'/>
                </div>

            </div>
        </div>
    )
}

export default CreatePlaylistPopup