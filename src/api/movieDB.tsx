import axios from "axios"



const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "e164b5ae764b35f7e933f7438812328e",
        language: "es-ES"
    }
})

export default movieDB