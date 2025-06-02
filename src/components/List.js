function Entry({item}){
    return(
        <div className="bg-red-50 flex flex-row items-center">
            <div className="basis-[30%]">Thumbnail</div> 
            <div className="basis-[50%]">
                <h1>{item["track_name"]}</h1>
                <p>{item["artists"]}</p>
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