function Entry({item}){
    return(
        <div
            className="flex flex-row items-center h-24 rounded-lg overflow-hidden hover:bg-gray-200 cursor-pointer">
            <div className = "basis-[30%] flex justify-center">
                <img className="object-scale-down h-20 w-20 rounded-xl border" src={item["thumbnail"]} alt="thumbnail"/>
            </div>
            <div className="basis-[50%]">
                <h1 className="font-semibold">{item["track_name"]}</h1>
                <p className="text-gray-400">{item["artists"]}</p>
            </div>
        </div>
    );
}

function List({data}){
    return(
        <div>
            {data.length > 0 ? data.map((item, index) => <Entry key={index} item ={item} />): null}
        </div>
    )
}

export default List;