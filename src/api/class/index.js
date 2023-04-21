import { client } from "../client";

export const getClasses = () => {
    return client.get('/classes');
};

export const addClass = (body) => {
    return client.post('/classes', body);
};