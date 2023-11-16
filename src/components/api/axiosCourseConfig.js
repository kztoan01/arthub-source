import axios from 'axios';

export default axios.create({
    baseURL:'https://arthubplatform1.azurewebsites.net/course',
    headers: {"ngrok-skip-brower-warning": "true"}
});