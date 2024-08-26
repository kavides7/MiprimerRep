module.exports = (sequelize, Sequelize) => {
	const Prestamo = sequelize.define('prestamo', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		numero_pedido: {
			type: Sequelize.STRING
		},
		codigo_libro: {
			type: Sequelize.STRING
		},
		codigo_usuario: {
			type: Sequelize.STRING
		},
		fecha_salida: {
			type: Sequelize.DATE // Cambiado a DATE si es una fecha
		},
		fecha_max_para_devolver: {
			type: Sequelize.DATE // Cambiado a DATE si es una fecha
		},
		fecha_devolucion: {
			type: Sequelize.DATE, // Cambiado a DATE si es una fecha
			allowNull: true // Puede ser null si no siempre está disponible
		},
		copyrightby: {
			type: Sequelize.STRING,
			defaultValue: 'UMG Antigua'
		}
	});

	return Prestamo;
};
