import axios from "axios";


const instance = axios.create({
    baseURL : `https://udmey-burger-builder-project.firebaseio.com/`
})

export default instance 