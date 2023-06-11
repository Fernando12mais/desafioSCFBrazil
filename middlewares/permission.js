import data from "../fakeData.js";

const permissionMiddleware = (req, res, next) => {
  const id = req.headers["user_id"];

  const { method } = req;
  const user = data.find((fakeUser) => fakeUser.id == id);

  if (!user)
    return res.send(
      "Usuário com permissões de deletar ou atualizar outros usuários não encontrado."
    );

  const definePermissionMessage = (permission) =>
    `Usuário não tem permissão para ${permission} outros usuários`;

  if (!user.permissions.erase && method == "DELETE") {
    return res.status(401).send(definePermissionMessage("deletar"));
  }

  if (!user.permissions.update && method == "PUT") {
    return res.status(401).send(definePermissionMessage("atualizar"));
  }
  next();
};

export default permissionMiddleware;
