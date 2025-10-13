import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import KategoriDinas from './KategoriDinasModel.js';

const { DataTypes } = Sequelize;

const PengurusBem = db.define(
  'pengurus_bem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jabatan: {
      type: DataTypes.ENUM('KoorBid', 'BPH', 'BPI', 'Staff'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kategoriDinasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    divisi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Define relationships
PengurusBem.belongsTo(KategoriDinas, {
  foreignKey: 'kategoriDinasId',
  as: 'kategori_dinas',
});

KategoriDinas.hasMany(PengurusBem, {
  foreignKey: 'kategoriDinasId',
  as: 'pengurus',
});

export default PengurusBem;