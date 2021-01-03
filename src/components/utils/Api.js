import axios from 'axios';
import { REACT_APP_API_URL } from 'react-native-expand-dotenv';

export function Api({ accessToken }) {
    return axios.create({
        baseURL: REACT_APP_API_URL,
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
};
