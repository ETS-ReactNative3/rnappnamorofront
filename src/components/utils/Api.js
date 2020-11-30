import axios from 'axios';
import { REACT_APP_API_URL } from 'react-native-expand-dotenv';

const Api = (props) => axios.create({
    baseURL: 'https://appnamoroback.herokuapp.com/',
    headers: { 'Authorization': `Bearer ${props.accessToken}` }
});

export default Api;
