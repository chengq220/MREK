import queryDatabase from './query';

const playListAdd = async (payload) =>{
    const endpoint = "http://localhost:8000/addToPlaylist";
    const response = await queryDatabase(payload, endpoint);
    return response;
};

const playListDelete = async (payload) =>{
    const endpoint = "http://localhost:8000/deleteFromPlaylist";
    const response = await queryDatabase(payload, endpoint);
    return response;
};

export {
  playListAdd,
  playListDelete,
}