import axios from 'axios';

export default axios.create({
    baseURL:'https://api.publicapis.org/entries?category=Animals',
    headers: {"Access-Control-Allow-Origin": "*"}
});