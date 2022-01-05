import jwt from "jsonwebtoken";

export function createToken(user, SECRET_KEY, expiresIn) {
  const { _id, name, email, username } = user;
  const payload = { id: _id, name, email, username };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
