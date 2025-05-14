import React from "react";

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
        const data = [
        ["Title 1", "Description 1", "https://example.com/icon1.svg"],
        ["Title 2", "Description 2", "https://example.com/icon2.svg"],
        ["Title 3", "Description 3", "https://example.com/icon3.svg"],
        ["Title 4", "Description 4", "https://example.com/icon4.svg"],
        ["Title 5", "Description 4", "https://example.com/icon4.svg"],
        ["Title 6", "Description 4", "https://example.com/icon4.svg"],
        ["Title 7", "Description 4", "https://example.com/icon4.svg"],
        ["Title 8", "Description 4", "https://example.com/icon4.svg"],
        ["Title 9", "Description 4", "https://example.com/icon4.svg"],
    ];
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10">
            {data.map((item, index) => <CardDefault
                key={index}
                title={item[0]}
                description={item[1]}
                iconUrl={item[2]}
                />
            )}
        </div>
    );
}

export default GridDefault;