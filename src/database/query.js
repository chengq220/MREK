export default async function queryDatabase(payload, endpoint){
    try{
        const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
        if(res.ok){
            return res;
        }else{
            return null;
        };
    }catch(error){
        return null;
    };
};