import axios from 'axios';
import { ENV } from '../config';

export const client = axios.create({
    baseURL: ENV.SERVICE_URL
});