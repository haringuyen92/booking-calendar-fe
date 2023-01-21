import httpClient from "./httpClient";

export const login = async (email, password) => {
    console.log("start login");
    try{
        const result = await httpClient.post('/auth/login', {email, password});
        return result;
    }catch(err){
        console.log(err);
    }
}
export const register = async(name, email, password) => {
    console.log("start register");
    try{
        return await httpClient.post('/auth/register', {name, email, password})
    }catch(err){
        console.log(err);
    }
}

 

