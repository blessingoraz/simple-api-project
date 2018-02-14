require('dotenv').config();

const USERNAME= process.env.USERNAME;
const PASSWORD= process.env.PASSWORD;
module.exports = {
    url: `mongodb://${USERNAME}:${PASSWORD}@ds235768.mlab.com:35768/note-taking`
};
