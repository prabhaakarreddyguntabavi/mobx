import { action, makeAutoObservable, observable } from "mobx";

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

interface UserEmailAndPassword {
  email?: string;
  password?: string;
}
interface GetUserId {
  get_user_id: ID[];
}

interface ID {
  id: number;
}

export class UsersData {
  userId: number = 0;
  loading: boolean = false;
  error: string = "";
  users: UserDetail[] = [];
  loginUser: UserDetail = { name: "" };

  constructor() {
    makeAutoObservable(this, {
      userId: observable,
      users: observable,
      loginUser: observable,
      getUserId: action.bound,
      fetchData: action.bound,
      loginUserDetails: action.bound,
    });
  }

  async fetchData() {
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": this.userId.toString(),
    };

    if (this.userId === 3) {
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
      (findUser: UserDetail) => findUser.id === this.userId
    )!;
  }

  async getUserId(user?: UserEmailAndPassword) {
    const emailAndPassword: UserEmailAndPassword = JSON.parse(
      localStorage.getItem("userDetails")!
    );

    let url: string =
      "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    };

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user === undefined ? emailAndPassword : user),
    };

    const response: Response = await fetch(url, options);
    const responseData: GetUserId = await response.json();

    if (response.ok) {
      this.userId = responseData.get_user_id[0].id;
    }
  }
}
