import queryDatabase from './query';

export const playListAdd = async ( payload ) =>{
    const endpoint = `${process.env.REACT_APP_BAP}/addToPlaylist`;
    const response = await queryDatabase(payload, endpoint);
    return response;
};

export const playListDelete = async ( payload ) =>{
    const endpoint = `${process.env.REACT_APP_BAP}/deleteFromPlaylist`;
    const response = await queryDatabase(payload, endpoint);
    return response;
};

export const fetchPlaylist = async ( payload ) =>{
  const endpoint = `${process.env.REACT_APP_BAP}/getPlaylistItems`;
  const response = await queryDatabase(payload, endpoint);
  if(response != null){
    const data = await response.json();
    return data["result"];
  }else{
    return console.error("Error occured"); 
  }
}

export const createPlaylist = async ( payload ) =>{
  const endpoint = `${process.env.REACT_APP_BAP}/createPlaylist`;
  const response = await queryDatabase(payload, endpoint);
  if(response != null){
    const data = await response.json();
    return data["result"];
  }else{
    return console.error("Error occured"); 
  }
}