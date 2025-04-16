import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getUsers:()=>api.get("user"),
    postLogin:(user) => api.post("login/", user), // aqui com , vai no body
    deleteUser: (id) => api.delete("user/" + id) // aqui com + vai no params
}

export default sheets;