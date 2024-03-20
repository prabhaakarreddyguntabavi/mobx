import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";

interface UserDetail {
  id?: number;
  name?: string;
  email?: string;
  country?: string;
  date_of_birth?: string;
  dateOfBirth?: string;
  city?: string;
  permanent_address?: string;
  postal_code?: string;
  present_address?: string;
  permanentAddress?: string;
  postalCode?: string;
  presentAddress?: string;
}

interface FetchOutPut {
  users: UserDetail[];
}

const jwtToken: string = Cookies.get("jwt_token")!;

export class UsersData {
  loading: boolean = false;
  error: string = "";
  users: UserDetail[] = [];
  loginUser: UserDetail = { name: "Admin" };

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  async fetchData() {
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": jwtToken,
    };

    if (jwtToken === "3") {
      headers["x-hasura-role"] = "admin";
    }

    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };
    const totalUserDetails: Response = await fetch(
      "https://bursting-gelding-24.hasura.app/api/rest/profile",
      options
    );
    const usersDict: FetchOutPut = await totalUserDetails.json();

    if (totalUserDetails.ok) {
      const transactionDict: UserDetail[] = usersDict.users.map(
        (eachTransaction: UserDetail) => ({
          id: eachTransaction.id,
          name: eachTransaction.name,
          email: eachTransaction.email,
          country: eachTransaction.country,
          dateOfBirth: eachTransaction.date_of_birth,
          city: eachTransaction.city,
          permanentAddress: eachTransaction.permanent_address,
          postalCode: eachTransaction.postal_code,
          presentAddress: eachTransaction.permanent_address,
        })
      );
      this.users = transactionDict;
      this.loading = true;
    } else {
      this.error = "Something Went wrong please try again later";
      this.loading = false;
    }
  }

  loginUserDetails() {
    this.loginUser = this.users.find(
      (findUser: UserDetail) => findUser.id === parseInt(jwtToken)
    )!;
  }
}
