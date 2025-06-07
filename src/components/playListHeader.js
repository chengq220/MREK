import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { GrStatusPlaceholder } from "react-icons/gr";

function Header({playlist}){
    
    const { playlist_name } = useParams();
    const user = useSelector(state => state.user.username);
    
    return (
        <div className = "flex flex-row mt-5 bg-gray-50 rounded-xl pb-4">
            <div className = "basis-[60%] flex justify-center items-center">
                {playlist.length <= 0 ? 
                    < GrStatusPlaceholder className="text-6xl" /> : 
                    <div>img</div>
                }
            </div>
            <div className = "basis-[40%]">
                <h1 className = "text-2xl font-bold p-2">{playlist_name}</h1>
                <h2 className = "p-2">{user}</h2>
            </div>
           
        </div>
    );
}

export default Header;