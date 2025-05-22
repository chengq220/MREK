import GridDefault  from './Card';
import '../../css/tailwind.css';
import { useEffect } from 'react';
import { useAuth} from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';


function Feed(){
    const navigate = useNavigate();
    const {token, login, logout, verify} = useAuth();

    useEffect(() => {
        console.log(verify)
        if(!verify){
            console.log("redirecting to home")
            navigate("/");
        }
    }, [verify]);

    return(
        <div className="w-1/2 mx-auto">
            <GridDefault/>
        </div>
    );
}

export default Feed;