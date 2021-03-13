import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    phoneNo: '12345',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    phoneNo: '12345',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phoneNo: '12345',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
