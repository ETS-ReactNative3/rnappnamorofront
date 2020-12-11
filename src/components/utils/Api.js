import axios from 'axios';
import { REACT_APP_API_URL } from 'react-native-expand-dotenv';

const Api = (props) => axios.create({
    baseURL: REACT_APP_API_URL,//'http://192.168.0.104:3333',//'https://appnamoroback.herokuapp.com/',
    headers: { 'Authorization': `Bearer ${props.accessToken}` }
});

export default Api;
