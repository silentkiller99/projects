const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	'form',
	'siddhant.mazumdar',
	'Rapid@123', {
		dialect: 'mysql',		
		host: 'localhost'
	}
);
module.exports = sequelize
