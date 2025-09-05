import axios from 'axios';

const API_URL = 'https://localhost:5001';

const API_MAIL = async (urlObject,payload) => {
   return await axios({
        method:urlObject.method,
        url:`${API_URL}/${urlObject.endpoint}`,
        data:payload
    })
}

export default API_MAIL;