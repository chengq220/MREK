import { useState, useEffect } from 'react';

const PopUp = ({ data, closePopUp }) => {

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
                <div className='w-1/2 p-3 justify-center items-center flex flex-col'>
                    <div>
                        <img className="rounded-xl" src={data["thumbnail"]} alt="thumbnail"/>
                    </div>
                    <h2 className="text-lg font-bold">{data['track_name']}</h2>
                    <p>{data['artists']}</p>
                    <p className="text-sm text-gray-500">{data['track_genre']}</p>
                </div>
            </div>
        </div>
    )
}

export default PopUp