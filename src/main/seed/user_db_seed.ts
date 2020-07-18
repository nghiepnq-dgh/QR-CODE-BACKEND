import { ROLE_USER } from "src/contants";

export const userDb = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345678",
        address: 'This is my address',
        identity: '134343432',
        role: ROLE_USER.ADMIN
    },
    {
        name: "accepter",
        email: "accepter@gmail.com",
        password: "12345678",
        address: 'This is my address',
        identity: '93749393',
        role: ROLE_USER.ACCEPTER
    }
]