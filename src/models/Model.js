const pool = require('../db/db');
const Query = require('pg').Query;

class Model {
    constructor(modelName, tableName = null){
        this.modelName = modelName;
        this.tableName = tableName || modelName;
        // this._isTable()
        //     .then(result => {
        //         console.dir(result._results);
        //         if( !result._results.rowCount ){
        //             this._createTable().then(result => {
        //                 console.dir(`Table ${this.tableName} has created \n`);
        //                 console.dir(result);
        //             }).catch(error => console.error(error));
        //         }
        //     })
        //     .catch(error => console.dir(error));
    }

    async getAll(orderBy = ''){
        const orderByText = orderBy ? `ORDER BY ${orderBy}` : '';
        // const query = new Query(`SELECT * FROM ${this.tableName} ${orderByText};`);
        return this._query(`SELECT * FROM ${this.tableName} ${orderByText};`);
    }

    async getOne(id){
        // const query = this._queryValues(`SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`, [id]);
        // // console.dir(query);
        return await this._queryValues(`SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`, [id]);
    }

    async _query(query){
        const client = await pool.connect();
        try{
            return await client.query(query);
        } catch (e) {
            console.error('Error query: ' + query + ' : ' + e.stack);
        }
        finally {
            client.release();
        }
    }

    async _queryValues(query, values){
        return await this._query({text: query, values});
    }

    async _rowModeQueryValues(query = '', values = []){
        return await this._query({text: query, values, rowMode: 'array'});
    }

    async _isTable(){
        const query = this._queryValues(`SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_name = '$1');`, [this.tableName]);
        return await this._query(query);
    }

    async _createTable(){
        // Create this method in your extended model, for example:
        // const query = this._newQuery(`SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_name = '$1');`, [this.tableName]);
        // return await this._query(query);
        return false;
    }

    async _now(){
        const res = await this._query('SELECT NOW() as now');
        console.log(res.rows[0]);
    }
}

module.exports = Model;