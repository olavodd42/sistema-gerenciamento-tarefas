
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123456@127.0.0.1:5432/tasks');

async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Set `force: true` to recreate tables, if needed
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize models:', error);
  }
}

authenticateDatabase();
syncDatabase();

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "E-mail deve ser único"
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "E-mail é obrigatório"
      },
      notEmpty: {
        msg: "E-mail é obrigatório"
      },
      isEmail: {
        msg: "Formato de e-mail inválido"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Senha é obrigatória"
      },
      notEmpty: {
        msg: "Senha é obrigatória"
      }
    }
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users', // Specify the exact table name
});

module.exports = User;