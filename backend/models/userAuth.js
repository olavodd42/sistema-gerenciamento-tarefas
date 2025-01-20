
const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123456@127.0.0.1:5432/tasks');

async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticateDatabase();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Voucher, {
        through: 'Gifts'
      });
    }
  }

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
  });

  return User;
};
