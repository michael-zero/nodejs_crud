const {Router} = require('express');
const authMiddleware = require('./middlewares/auth')
const routes = new Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController')

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);


routes.post('/sessions', SessionController.store);

routes.use(authMiddleware.auth);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);



module.exports = routes;