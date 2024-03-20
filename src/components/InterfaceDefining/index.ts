export interface ApiStatus {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

export interface CrediteAndDebitList {
  debit?: number;
  credit?: number;
  type?: string;
  date?: string;
  sum?: number;
}
export interface TransctionProps {
  id?: number;
  transactionName?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  userId?: number;
  transaction_name?: string;
  user_id?: number;
  name?: string;
}
export interface ProfileDetails {
  name?: string;
  email?: string;
  date_of_birth?: string;
  present_address?: string;
  permanent_address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  password?: string;
  userId?: number;
}
