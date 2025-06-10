import queryDatabase from './query';

export const register = async (username, password, confPassword) =>{
    if(password != confPassword){
        return "Password not the same";
    }
    const payload = {
        'username':username,
        'password':password};

    const endpoint = `http://${process.env.REACT_APP_BAP}/register`;
    const response = await queryDatabase(payload, endpoint);
    if(response == null){
        return "Error occured";
    }else{
        return '';
    }
};