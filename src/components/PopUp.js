import { useState } from 'react';

const PopUp = ({ openPopUp, closePopUp }) => {

    const [pl, setPL] = useState('')

    const handleChange = (event) => {
        console.log(pl)
        setPL(event.target.value)
    }

    const handlelosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    }

    if (openPopUp !== true) return null

    return (
    <div
        id='ModelContainer'
        onClick={handlelosePopUp}
        className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
        <div className='p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5'>
            <div className='w-full p-3 justify-center items-center flex flex-row'>
                <h2 className='font-semibold py-3 text-center text-xl'>Playlist Name:</h2>
                <input 
                    type="text" 
                    name="preference" 
                    id="pref" 
                    onChange={handleChange} 
                    required 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "  />
                <button onClick={}>Submit</button>
            </div>
        </div>
    </div>
    )
}

export default PopUp