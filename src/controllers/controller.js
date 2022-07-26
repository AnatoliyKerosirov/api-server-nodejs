const pg = require('pg');
let users = [];

const getUsers = async (req, res) => {
    res.end(JSON.stringify(users));
}

const createUsers = async (req, res) => {
    console.log(req.body);
    users.push(req.body);
    res.end(JSON.stringify(users));
}

const getHome = (req, res) => {
    console.log('Home page');
    // console.log(res);
    res.end('<h1>Hello, this Home Page</h1>');
}

module.exports = {getUsers, createUsers, getHome}