import axios from 'axios';  

const instance = axios.create({
    baseURL: 'https://burger-builder-14a93.firebaseio.com/'
})

export default instance;