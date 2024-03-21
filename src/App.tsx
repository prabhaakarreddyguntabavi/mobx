import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TransactionContext from "./context/TransactionContext";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TransactionPage from "./components/TransactionPage";
import ProfileDetails from "./components/ProfileDetails";
import { TransctionStore } from "./stores/TotalTransactionData";
import { UsersData } from "./stores/UsersDetails";
import { observer } from "mobx-react";
import { observe } from "mobx";

let totalTransactionDetails = new TransctionStore();
let userDict = new UsersData();

interface UserDetails {
  email?: string;
  password?: string;
}

const App = (): JSX.Element => {
  const [selectOption, onChangeSelect] = useState<string>("DASHBOARD");

  const [userId, updateUserId] = useState<number>(0);

  const [isUserAdmin, onChangeAdmin] = useState<boolean>(false);

  const emailAndPassword: UserDetails = JSON.parse(
    localStorage.getItem("userDetails")!
  );

  const getLeaderboardData = async (): Promise<void> => {
    await userDict.getUserId();
  };

  if (emailAndPassword !== undefined) {
    getLeaderboardData();
  }

  observe(userDict, (): void => {
    updateUserId(userDict.userId);
  });

  useEffect((): void => {
    if (userId === 3) {
      onChangeAdmin(true);
    } else {
      onChangeAdmin(false);
    }
  }, [userId]);

  const [transactionOption, selectTransactionOption] =
    useState<string>("ALLTRANSACTION");

  const onChangeSelectOption = (id: string): void => {
    onChangeSelect(id);
  };

  const onChangeTransactionOption = (id: string): void => {
    selectTransactionOption(id);
  };

  return (
    <TransactionContext.Provider
      value={{
        userId,
        selectOption,
        onChangeSelectOption,
        transactionOption,
        onChangeTransactionOption,
        isUserAdmin,
        totalTransactionDetails,
        userDict,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/profile" element={<ProfileDetails />} />
        </Routes>
      </BrowserRouter>
    </TransactionContext.Provider>
  );
};

export default observer(App);
