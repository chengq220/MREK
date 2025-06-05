import queryDatabase from './query';

export const register = async (username, password, confPassword) =>{
    if(password != confPassword){
        return "Password not the same";
    }
    const payload = {
        'username':username,
        'password':password};

    const endpoint = "http://localhost:8000/register";
    const response = await queryDatabase(payload, endpoint);
    if(response == null){
        return "Error occured";
    }else{
        return '';
    }
};