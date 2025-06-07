import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

function Header(){
    
    const { playlist_name } = useParams();
    const user = useSelector(state => state.user.username);
    
    return (
        <div>
           <div>img</div>
           <h1>{playlist_name}</h1>
           <h2>{user}</h2>
        </div>
    );
}

export default Header;