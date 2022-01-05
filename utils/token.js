import jwtDecode from "jwt-decode";

export function decodeToken(token) {
  return jwtDecode(token);
}
