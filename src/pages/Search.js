import { useState, useEffect } from 'react';
import List from '../components/List';

function Search(){
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("Song");
    const [query, setQuery] = useState("");
    const [snapShot, setSnapShot] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleCategory = (input) => {
        setCategory(input);
        setIsOpen(false);
    }

    const handleClick = (event) => {
        if (event.target.id === "container") {
            console.log("clicked on container")
            setIsOpen(false);
        }
    }

    const queryChange = (event) => {
        setQuery(event.target.value);
    }

    const submit = async () =>{
        setIsLoading(true);
        setSnapShot(structuredClone(data));
        if(query != ""){
            console.log(category);
            const payload = {"category": category,
                        "query": query}
            try{
                const res = await fetch("http://localhost:8000/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if(res.ok){
                    const data = await res.json();
                    setData(data["result"]);
                }
            }catch(error){
                console.log("server error caught")
            }
            finally{
                setIsLoading(false);
            };
        }
        
    }

    return (
        <div id="container"
            className = "py-10">
            <div className="max-w-lg mx-auto">
                <div className="relative flex">
                    <div className="flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
                        <button id="dropdown-button" 
                            onClick = {toggleSelect}
                            className="shrink-0 z-10 inline-flex items-center w-20 py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{category}<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"></svg>
                        </button>
                        <div id="dropdown" className={`absolute z-10 bg-white w-20 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 ${isOpen ? "block": "hidden"}`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button 
                                type="button" 
                                onClick={() => handleCategory("Song")}
                                className="inline-flex text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Song</button>
                            </li>
                            <li>
                                <button 
                                type="button"
                                onClick={() => handleCategory("Genre")} 
                                className="inline-flex text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Genre</button>
                            </li>
                            <li>
                                <button 
                                type="button"
                                onClick={() => handleCategory("Artist")} 
                                className="inline-flex text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Artist</button>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <input type="search" 
                        id="search-dropdown" 
                        onChange={queryChange}
                        className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Query" required />
                        <button 
                        onClick = {submit}
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="py-10">
                    {isLoading? <List data = {snapShot}/> : <List data={data}/>}
                </div>
                
            </div>
        </div>
    );
};

export default Search;