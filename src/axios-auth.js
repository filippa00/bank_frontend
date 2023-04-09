import axios from "axios";


const instance = axios.create({

    baseURL: 'https://cgbank-production.up.railway.app:443/',

});

export default instance;