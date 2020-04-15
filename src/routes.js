const express = require ('express');
const cliente = require('./Controllers/ClienteController');

const routes  = express.Router();

routes.post('/',cliente.CalculoCredito);

module.exports = routes;