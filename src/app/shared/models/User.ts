export interface User{
    id: string;
    email: string;
    username: string;
    phone: string;
    name: {
        firstname: string;
        lastname: string;
    }
    address: {
        city: string;
        street: string;
    }
    role: string;
}