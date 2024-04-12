export interface UserDetail {
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

export interface ApiOutputStatus {
  status: string;
  data: UserDetail;
}

export interface FetchOutPut {
  users: UserDetail[];
}

export interface UserEmailAndPassword {
  email?: string;
  password?: string;
}

export interface ID {
  id: number;
}

export interface GetUserId {
  get_user_id: ID[];
}
