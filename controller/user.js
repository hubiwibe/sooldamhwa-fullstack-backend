import * as userRepository from '../data/user.js';

export async function getUsers(req, res) {
  const users = await userRepository.getAll();
  res.status(200).json(users);
}

export async function createUsers(req, res) {
  const { name } = req.body;
  const user = await userRepository.getByName(name);
  
  if (user) {
    res.status(409).json({ message: `${name} is an existing user` });
  } else {
    const createdUser = await userRepository.create(name);
    res.status(201).json(createdUser);
  }
}

export async function deleteUser(req, res) {
  const { name } = req.params;
  const user = await userRepository.getByName(name);

  if (user) {
    await userRepository.remove(name);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `User not found: ${name}` });
  }
}
