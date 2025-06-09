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
                console.log('Close');
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
            <div className='p-2 bg-white w-4/12 md:w-2/5 lg:1/5 md:h-1/2 shadow-inner border-e-emerald-600 rounded-lg py-5'>
                <div className=' p-3 justify-center items-center flex flex-row'>
                    <div className="basis-[60%] w-1/2 h-1/2">
                        <img className="rounded-xl" src={data["thumbnail"]} alt="thumbnail"/>
                    </div>
                    <div className = "basis-[40%] flex flex-col justify-center items-center">
                        <div className = "flex flex-row justify-center items-center">
                            <div className="basis-[50%] flex flex-col justify-center items-center"> 
                                <h2 className="text-lg font-bold">Track:</h2>
                                <p>Album:</p>
                                <p>Artists:</p>
                                <p className="text-sm text-gray-500">Genre:</p>
                                
                            </div>
                            <div className="basis-[50%] flex flex-col justify-center items-center"> 
                                <h2 className="text-lg font-bold">{data['track_name']}</h2>
                                <p>{data['album_name']}</p>
                                <p>{data['artists']}</p>
                                <p className="text-sm text-gray-500">{data['track_genre']}</p>
                                
                            </div>
                        </div>
                        <div>
                            {verify && <AddDelButton song_idx={data['track_id']} />}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

function Entry({item}){
    const [popUp, setPopUp] = useState(false);

    return(
        <div
            onClick = {() => setPopUp(true)}
            className="flex flex-row items-center h-24 rounded-lg overflow-hidden hover:bg-gray-200 cursor-pointer">
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
    return(
        <div>
            {data.length > 0 ? data.map((item, index) => <Entry key={index} item ={item}/>): null}
        </div>
    )
}

export default SearchList;