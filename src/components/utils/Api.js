import axios from 'axios';
import { REACT_APP_API_URL } from 'react-native-expand-dotenv';

export function Api({ accessToken }) {
    return axios.create({
        baseURL: 'http://192.168.0.104:3333/',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
};
