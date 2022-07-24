const Router = require('../../server/Router');
const userController = require('../controllers/user_controller');

const router = new Router();

router.post('/user', userController.create);
router.get('/users', userController.getAll);
router.get('/user/:id', userController.getOne);
router.put('/user', userController.update);
router.delete('/user/:id', userController.delete);

module.exports = router;