import React, { useState, useEffect } from "react";

class CardDefault extends React.Component {   
    render() {
        const { title, description, iconUrl } = this.props;
        return (
            <div className="px-3 py-3">
                <div className="max-w-6xl mx-auto bg-gray-200">
                    <img
                    src={iconUrl}
                    alt=""
                    className="mx-auto h-10 w-10"
                    />
                    <h3 className="my-3 font-display font-medium">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                    {description}
                    </p>
                </div>
            </div>
        );
    }
}

 
function GridDefault(){
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchData();
    //     console.log(data)
    // }, []); 

    // const fetchData = async () => {
    //     console.log("fetching data rn")
    //     try{
    //         const userInfo = {
    //             'username':sessionStorage.getItem("username")
    //         }
    //         const res = await fetch("http://localhost:8000/getMusic", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(userInfo)
    //         })
    //         const dat = await res.json()
    //         console.log(dat)
    //         setData(dat.result)
    //     }
    //     catch (e){
    //         console.log("Failed to retrieve from db")
    //     }
    // }; 

    if(!data){
        return(
             <div className="w-1/2 h-1/2 mx-auto">
                <div>Currently Loading Data</div>
             </div>
        )
    }
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10">
            {data.map((item, index) => <CardDefault
                key={index}
                title={item['track_name']}
                description={item['artists']}
                iconUrl={item['track_genre']}
                />
            )}
        </div>
    );
}

export default GridDefault;