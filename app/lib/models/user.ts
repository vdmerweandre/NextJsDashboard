export type User = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    name: string;
    age: number;
    type: 'patient' | 'doctor';
};