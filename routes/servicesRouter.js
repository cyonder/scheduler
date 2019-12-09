const express = require('express');
const serviceRouter = express.Router();

const Service = require('../controllers/servicesController');

serviceRouter.get('/', Service.index);
serviceRouter.post('/', Service.create);
// serviceRouter.get('/:id', Service.show);
// serviceRouter.put('/:id', Service.update);
// serviceRouter.delete('/:id', Service.destroy);

module.exports = serviceRouter;
