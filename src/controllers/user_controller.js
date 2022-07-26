const pg = require('pg');
const crypt = require('../services/crypt');
const User = require('../models/User');

class UserController {

    async create(req, res){
        // console.dir(req.body);
        // const newUser = JSON.parse(req.body);
        const newUser = JSON.parse(JSON.stringify(req.body));
        console.dir(newUser);
        const isValidData = UserController.isValidUserData(newUser);
        if( ! isValidData ){
            console.error(`Error data user object from request! data: ${newUser}`);
            // throw new Error('Error data user object from request');
        }
        const passHash = await crypt.getHash(newUser.name, newUser.pass);
        console.log(passHash, passHash.length);
        const user = await new User();
        // user._now();
        // console.dir(result.rows);
        const userCreate = await user.createUser(newUser.name, newUser.email, passHash);
        console.dir(userCreate._results);
        // res.end(JSON.stringify(user));
    }

    async getAll(req, res){
        const usersRequest = await new User().getAll();
        const users = usersRequest.rows.map(user => ({id: user.id, name: user.name, email: user.email }) );
        // console.dir(users.rows);
        res.end(JSON.stringify(users));
    }

    async getOne(req, res){
        console.log(req.url);
        const userId = parseInt(req.url.split('/')[2]);
        if(userId){
            const userData = await new User().getOne(userId);
            const user = userData.rows[0];
            res.end(JSON.stringify({id: user.id, name: user.name, email: user.email}));
        }
    }

    async update(req, res){

    }

    async delete(req, res){

    }

    static async isValidUserData(userData){
        const user = await new User().fields;
        console.dir(user);
        for(const key in user){
            if(!userData[key])
                return false;
        }
        return true;
    }

}

module.exports = new UserController();