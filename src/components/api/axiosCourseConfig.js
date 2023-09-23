import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8080/course',
    headers: {"ngrok-skip-brower-warning": "true"}
});