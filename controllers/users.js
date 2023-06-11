import data from "../fakeData.js";

const getUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = data.find((user) => user.id == userId);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    user.accessedCount += 1;
    return res.send(user);
  } catch (e) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const getUsers = (req, res, next) => {
  return res.send(data);
};

const createUser = (req, res) => {
  try {
    const { name, job } = req.body;

    if (!name || !job)
      return res
        .status(400)
        .send(`Parâmetros "name" e "job são obrigatórios."`);

    const highestId = data.at(-1).id;
    const newUser = {
      id: highestId + 1,
      name: name,
      job: job,
      accessedCount: 0,
    };
    data.push(newUser);

    return res
      .status(201)
      .send({ message: "Usuário criado com sucesso.", newUser });
  } catch (e) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = data.findIndex((user) => user.id == id);

    if (userIndex <= 0) {
      return res.send("Usuário não encontrado.");
    }

    data.splice(userIndex, 1);

    return res.send("Usuário deletado com sucesso.");
  } catch (e) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const updateUser = (req, res) => {
  try {
    const { id, name, job } = req.body;
    const user = data.find((fakeUser) => fakeUser.id == id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.name = name;
    user.job = job;

    return res.send({ message: "Usuário atualizado com sucesso.", user });
  } catch (e) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const getUserAccessedCount = (req, res) => {
  const { id } = req.params;

  const user = data.find((fakeUser) => fakeUser.id == id);

  return res.send(`Usuário ${user.name} foi lido ${user.accessedCount} vezes`);
};

const updateUserPermission = (req, res) => {
  const { id, erase, update } = req.body;

  const user = data.find((fakeUser) => fakeUser.id == id);

  user.permissions = { erase: !!erase, update: !!update };

  return res.send({ message: "Permissões atualizadas com sucesso.", user });
};

export default {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  getUserAccessedCount,
  updateUser,
  updateUserPermission,
};
