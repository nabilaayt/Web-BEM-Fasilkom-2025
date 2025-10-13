import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Bidang from './BidangModel.js';

const { DataTypes } = Sequelize;

const KategoriDinas = db.define(
  'kategori_dinas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    nama_dinas: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bidangId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Define relationships
KategoriDinas.belongsTo(Bidang, {
  foreignKey: 'bidangId',
  as: 'bidang',
});

Bidang.hasMany(KategoriDinas, {
  foreignKey: 'bidangId',
  as: 'kategori_dinas',
});

export default KategoriDinas;