const Router = require('../../server/Router');
const Controller = require('../controllers/controller');

const myRouter = new Router();

myRouter.get('/users', Controller.getUsers);

myRouter.get('/home', Controller.getHome);

myRouter.post('/users', Controller.createUsers);

console.log(myRouter.endpoints);

module.exports = myRouter;