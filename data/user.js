import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    primaryKey: true,
  },
});

export async function getAll() {
  return User.findAll({ order: [['createdAt', 'DESC']] });
}
