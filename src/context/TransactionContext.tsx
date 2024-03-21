import React from "react";
import { TransctionStore } from "../stores/TotalTransactionData";
import { UsersData } from "../stores/UsersDetails";

const TransactionContext = React.createContext({
  selectOption: "DASHBOARD",
  onChangeSelectOption: (id: string) => {},
  transactionOption: "ALLTRANSACTION",
  onChangeTransactionOption: (id: string) => {},
  isUserAdmin: false,
  totalTransactionDetails: new TransctionStore(),
  userDict: new UsersData(),
  userId: 0,
});

export default TransactionContext;
