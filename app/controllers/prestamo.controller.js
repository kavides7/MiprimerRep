const db = require('../config/db.config.js');
const Prestamo = db.prestamo;

exports.create = async (req, res) => {
    try {
        const nuevoPrestamo = {
            numero_pedido: req.body.numero_pedido,
            codigo_libro: req.body.codigo_libro,
            codigo_usuario: req.body.codigo_usuario,
            fecha_salida: req.body.fecha_salida,
            fecha_max_para_devolver: req.body.fecha_max_para_devolver,
            fecha_devolucion: req.body.fecha_devolucion
        };
        const result = await Prestamo.create(nuevoPrestamo);
        res.status(200).json({
            message: "Upload Successfully a prestamo with id = " + result.id,
            prestamo: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

exports.getPrestamoById = (req, res) => {
    const prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            if (prestamo) {
                res.status(200).json({
                    message: "Successfully Get a prestamo with id = " + prestamoId,
                    prestamo: prestamo
                });
            } else {
                res.status(404).json({
                    message: "Prestamo not found with id = " + prestamoId,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
};

exports.getPrestamoByNumber = (req, res) => {
    const numero_pedido = req.params.numero_pedido;
    Prestamo.findAll({ where: { numero_pedido: numero_pedido } })
        .then(prestamos => {
            res.status(200).json({
                message: "Prestamos obtenidos exitosamente con el numero de pedido = " + numero_pedido,
                prestamos: prestamos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los prestamos!",
                error: error.message
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "Not Found for updating a prestamo with id = " + prestamoId,
                error: "404"
            });
        } else {
            const updatedObject = {
                numero_pedido: req.body.numero_pedido,
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_max_para_devolver: req.body.fecha_max_para_devolver,
                fecha_devolucion: req.body.fecha_devolucion
            };
            const [updatedCount, [updatedPrestamo]] = await Prestamo.update(updatedObject, {
                returning: true,
                where: { id: prestamoId }
            });

            if (updatedCount === 0) {
                res.status(500).json({
                    message: "Error -> Can not update a prestamo with id = " + prestamoId,
                    error: "Can NOT Updated"
                });
            } else {
                res.status(200).json({
                    message: "Update successfully a prestamo with id = " + prestamoId,
                    prestamo: updatedPrestamo
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT update a prestamo with id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        const prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "Does Not exist a prestamo with id = " + prestamoId,
                error: "404"
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Delete Successfully a prestamo with id = " + prestamoId,
                prestamo: prestamo
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a prestamo with id = " + req.params.id,
            error: error.message
        });
    }
};
