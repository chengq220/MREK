import '../css/tailwind.css';
import { useState } from 'react';

function PrefInput() {
    const [query, setQuery] = useState('');
    const [res, setRes] = useState('')

    const handleChange = (event) => {
        console.log(query)
        setQuery(event.target.value)
    }

    const sendQuery = async (event) =>{
        console.log("have been clicked")
        event.preventDefault()
        fetch("http://localhost:8000/query", {
        method: "GET"})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    return (
    <div className="hero bg-gredient-dark h-400px flex flex-col px-2">
            <div className="search-box mx-auto my-auto w-full sm:w-full md:w-full lg:w-3/4 xl:w-3/4">
                <div className="flex flex-row">
                    <input
                        className="h-16 bg-gray-100 text-grey-darker py-2 font-normal text-grey-darkest border border-gray-100 font-bold w-full py-1 px-2 outline-none text-lg text-gray-600"
                        type="text" placeholder="What are your music interests"
                        onChange={handleChange}    
                    />
                    <span
                        className="flex items-center bg-green-100 rounded rounded-l-none border-0 px-3 font-bold text-grey-100">
                        <button
                            className="bg-gredient-dark hover:bg-gredient-light text-lg font-bold py-3 px-6 rounded"
                            onClick={sendQuery}
                            >
                            Search        
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PrefInput;
