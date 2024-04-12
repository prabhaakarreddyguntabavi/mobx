import Cookies from "js-cookie";
import { ApiStatus } from "../types/transactionsTypes";

export const jwtToken: string = Cookies.get("jwt_token")!;

export const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
