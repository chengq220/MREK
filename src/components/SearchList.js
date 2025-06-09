import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddDelButton from './AddDelButton';

const SearchCard = ({ data, closePopUp }) => {
    const verify = useSelector(state => state.user.verify);

    const handlelosePopUp = (e) => {
        e.stopPropagation();
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closePopUp();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
    
    return (
        <div
            id='ModelContainer'
            onClick={handlelosePopUp}
            className='fixed inset-0 bg-black rounded-xl flex justify-center items-center bg-opacity-5 backdrop-blur-sm'>
            <div className='p-2 bg-white w-1/2 h-1/2 md:w-2/5 lg:1/5 md:h-1/2 shadow-inner border-e-emerald-600 rounded-lg py-5'>
                <div className='p-3 justify-center items-center flex flex-row w-full h-full'>
                    <div className = "w-[40%] h-full rounded-xl">
                        <img className = "w-full h-full object-contain" src={data["thumbnail"]} alt="thumbnail" />
                    </div>
                    <div className="w-1/2 flex flex-col ml-4">
                        <div className = "w-full flex flex-row">
                            <div className="flex flex-col justify-center"> 
                                <h2 className="text-lg font-bold">Track:</h2> 
                                <p>Album:</p>
                                <p>Artists:</p>
                                <p className="text-sm text-gray-500">Genre:</p>
                            </div>
                            <div className="ml-2 w-[250px]"> 
                                <h2 className="text-lg font-bold truncate">{data['track_name']}</h2>
                                <p className="truncate">{data['album_name']}</p>
                                <p className="truncate">{data['artists']}</p>
                                <p className="text-sm text-gray-500 truncate">{data['track_genre']}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {verify && <AddDelButton song_idx={data['track_id']} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Entry({item}){
    const [popUp, setPopUp] = useState(false);

    return(
        <div
            onClick = {() => setPopUp(true)}
            className="flex flex-row items-center h-24 rounded-lg hover:bg-gray-200 cursor-pointer">
            <div className = "basis-[30%] flex justify-center">
                <img className="object-scale-down h-20 w-20 rounded-xl border" src={item["thumbnail"]} alt="thumbnail"/>
            </div>
            <div className="basis-[50%]">
                <h1 className="font-semibold">{item["track_name"]}</h1>
                <p className="text-gray-400">{item["artists"]}</p>
            </div>
           {popUp && <SearchCard data = {item} closePopUp= {() => setPopUp(false)}/>}
        </div>
    );
}

function SearchList({data}){
    if(data == null){
        return null;
    }
    return(
        <div>
            {data.length > 0 ? data.map((item, index) => <Entry key={index} item ={item}/>): <div>No result found</div>}
        </div>
    )
}

export default SearchList;