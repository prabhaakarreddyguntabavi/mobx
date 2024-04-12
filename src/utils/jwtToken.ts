import Cookies from "js-cookie";

export const jwtToken: string = Cookies.get("jwt_token")!;
