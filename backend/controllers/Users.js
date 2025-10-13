import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'role'],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role || 'admin',
    });
    res.status(201).json({ msg: 'Register Berhasil' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User tidak ditemukan' });
  }

  const { name, email, password, confPassword, role } = req.body;
  let hashPassword = user.password;

  if (password !== '' && password !== null) {
    if (password !== confPassword) {
      return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
    }
    hashPassword = await bcrypt.hash(password, 10);
  }

  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: 'User Updated' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User tidak ditemukan' });
  }

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: 'User Deleted' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};