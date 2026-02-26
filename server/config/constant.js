require('dotenv').config();

const JWT_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    JWT_PRIVATE_KEY,
}