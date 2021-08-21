import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

export async function getAll() {
  return User.findAll();
}

export async function getByName(name) {
  return User.findOne({ where: { name } });
}

export async function create(name) {
  return User.create({ name }).then(data =>
    this.getByName(data.dataValues.name)
  );
}

export async function remove(name) {
  return User.findOne({ where: { name } }).then(user => {
    user.destroy();
  });
}
