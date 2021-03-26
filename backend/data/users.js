import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 15),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 15),
    }, {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 15),
    },
]

export default users;