require('dotenv').config();

const JWT_PRIVATE_KEY = process.env.PRIVATE_KEY;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;
const FRONTEND_URL = process.env.FRONTURL;

module.exports = {
    JWT_PRIVATE_KEY,
    USER_EMAIL,
    USER_PASS,
    FRONTEND_URL
}