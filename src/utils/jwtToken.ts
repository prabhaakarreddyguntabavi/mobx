import Cookies from "js-cookie";

export const setJwtToken = () => Cookies.get("jwt_token");
