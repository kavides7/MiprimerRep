const express = require('express');
const router = express.Router();

// Importar el controlador
const prestamoController = require('../controllers/prestamo.controller.js');

// Rutas
router.post('/api/prestamo/create', prestamoController.create);
router.get('/api/prestamo/onebyid/:id', prestamoController.getPrestamoById);
router.get('/api/prestamo/bypedido/:numero_pedido', prestamoController.getPrestamoByNumber); // Corrige el nombre del método
router.put('/api/prestamo/update/:id', prestamoController.updateById);
router.delete('/api/prestamo/delete/:id', prestamoController.deleteById);

module.exports = router;

