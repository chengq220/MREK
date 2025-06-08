import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { GrStatusPlaceholder } from "react-icons/gr";

function Header({playlist}){
    const { playlist_name } = useParams();
    const user = useSelector(state => state.user.username);
    
    return (
        <div className = "flex flex-row mt-5 bg-gray-50 rounded-xl pt-4 pb-4 mb-4">
            <div className = "basis-[60%] flex justify-center items-center">
                {playlist.length <= 0 ? 
                    < GrStatusPlaceholder className="text-6xl" /> : 
                    <img className = "h-36 w-36" src={playlist[0]["thumbnail"]} alt="thumbnail"/>
                }
            </div>
            <div className = "basis-[40%] flex flex-col justify-center">
                <h1 className = "text-2xl font-bold">{playlist_name}</h1>
                <h2 >{user}</h2>
            </div>
           
        </div>
    );
}

export default Header;