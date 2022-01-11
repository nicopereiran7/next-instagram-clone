import jwtDecode from "jwt-decode";

export async function decodeToken(token) {
  return jwtDecode(token);
}
