import { client } from "../client";

export const getTeachers = () => {
    return client.get('/teachers');
};

export const getUnassignedTeachers = () => {
    return client.get('/teachers/unassigned');
};

export const addTeacher = (body) => {
    return client.post('/teachers', body);
};