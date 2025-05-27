import {useState, useEffect} from "react";

function useFetch(payload, url){
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () =>{
            try{
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                setData(result);
                setError(null);
            }
            catch (error){
                setError(error);
            }
            finally{
                setIsLoading(false);
            }
        };
    },[payload, url])
    
    return {data, error, isLoading}
}

export default useFetch;