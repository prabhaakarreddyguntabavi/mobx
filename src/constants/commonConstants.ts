import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

export interface ApiStatus {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

export const jwtToken: string = Cookies.get("jwt_token")!;

// export const navigate = useNavigate();

export const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
