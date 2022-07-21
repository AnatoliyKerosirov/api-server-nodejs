const http = require('http');
const EventEmitter = require('events');

module.exports = class Server {
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware){
        this.middlewares.push[middleware];
    }

    listen(port, callback){
        this.server.listen(port, callback);
    }

    addRouter(router){
        Object.keys(router.endpoints).forEach( (path) => {
           const endpoint = router.endpoints[path];
           Object.keys(endpoint).forEach( (method) => {

               this.emitter.on( this._getRouteMask(path, method), (req, res) => {
                  const handler = endpoint[method];
                  handler(req, res);
               });
           })
        });
    }

    _createServer(){
        return http.createServer( (req, res) => {
            let body = '';
            req.on('data', (chunk) => {
               body += chunk;
            });

            req.on('end', () => {
               if(body){
                   req.body = JSON.parse(body);
               }
               this.middlewares.forEach(middleware => middleware(req, res));

               const emitted = this.emitter.emit(this._getRouteMask(this._validatePathWithId(req.url), req.method), req, res);
               if(!emitted){
                   res.end();
               }
            });
        })
    }

    _validatePathWithId(url) {
        // for example url /user/:id
        const array_path = url.split('/');
        return (array_path.length < 3) ? url : `/${array_path[1]}/:id`;
    }

    _getRouteMask(path, method){
        console.log(path, method);
        return `[${path}]:[${method}]`;
    }
}