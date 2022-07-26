const Model = require('./Model');

class User extends Model{

    constructor(){
        super('User', 'users');
        this.fields = {
            id: NaN,
            name: '',
            email: '',
            pass: '',
        }
    }

    async createUser(name, email, pass){
        this.name = name;
        this.email = email;
        this.pass = pass;
        return await this._saveUser();
    }

    async _saveUser(){
        return await this._queryValues('INSERT INTO users (name, email, pass) VALUES ($1, $2, $3) RETURNING id', [this.name, this.email, this.pass]);
    }

    async _createTable(){
        const query = this._newQuery(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(32), 
            email VARCHAR (64), 
            pass VARCHAR($1)
        );`, [parseInt(process.env.CRYPT_LENGTH)]);
        return await this._query(query);
    }
}

module.exports = User;