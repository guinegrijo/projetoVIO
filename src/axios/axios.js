import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `${token}`
            console.log(token)
        }
        return config
    }, (error) => Promise.reject(error)
)

const sheets = {
    getUsers:()=>api.get("user"),
    postLogin:(user) => api.post("login/", user), // req.body
    deleteUser:(id) => api.delete("user/"+id ), // req.params
    getEventos:()=>api.get("evento"),
    deleteEvento:(id)=>api.delete("evento/"+id),
    createIngresso: (ingresso) => api.post("/ingresso", ingresso),
}

export default sheets;