import PrefInput from './Pref';
import GridDefault  from './Card';
import '../css/tailwind.css';

function Feed(){
    return(
        <div className="w-1/2 mx-auto">
            <PrefInput/>
            <GridDefault/>
        </div>
    );
}

export default Feed;