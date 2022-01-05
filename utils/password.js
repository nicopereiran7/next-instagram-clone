import bcrypt from "bcrypt";

export async function encodePassword(password) {
  const saltArounds = 10;
  return await bcrypt.hashSync(password, saltArounds);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compareSync(password, hash);
}
