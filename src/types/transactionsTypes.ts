import { UserDetail } from "./usersTypes";
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

export interface FetchedData {
  transactions: TransctionProps[];
}

export interface ApiStatusAndData {
  status: string;
  data: TransctionProps[];
}

export interface PropsValues {
  transactionsData: TransctionProps[];
  isUserAdmin: boolean;
  index: number;
  eachTransaction: TransctionProps;
  user: UserDetail;
  isThisLastThreeTransactions: boolean;
}

export interface DataValues {
  id?: number;
  transactionName?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  userId?: number;
  transaction_name?: string;
  user_id?: number | string;
  name?: string;
}

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface DataOutPut {
  sum: number;
  type: string;
}

export interface ApiOutputStatus {
  status: string;
  data: DataOutPut[];
  errorMsg?: string;
}

export interface ApiStatus {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

export interface FetchedOutput {
  totals_credit_debit_transactions?: DataOutPut[];
  transaction_totals_admin?: DataOutPut[];
}

export interface DeleteTransactionPropsValue {
  id: number;
  close: () => void;
}
