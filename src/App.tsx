import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TransactionContext from "./context/TransactionContext";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TransactionPage from "./components/TransactionPage";
import ProfileDetails from "./components/ProfileDetails";
import ButtonStyles from "./components/ButtonElement";
import InputElement from "./components/InputElement";
import { TransctionStore } from "./stores/TotalTransactionData";
import { UsersData } from "./stores/UsersDetails";
import { observer } from "mobx-react";
import { observe } from "mobx";
import { UserEmailAndPassword } from "./types/usersTypes";
import EachTransaction from "./components/TransactionTesting"

import "./tailwind.css";

let totalTransactionDetails = new TransctionStore();
let userDict = new UsersData();

const App = (): JSX.Element => {
  const [selectOption, onChangeSelect] = useState<string>("DASHBOARD");
  const [userId, updateUserId] = useState<number>(0);
  const [isUserAdmin, onChangeAdmin] = useState<boolean>(false);

  const emailAndPassword: UserEmailAndPassword = JSON.parse(
    localStorage.getItem("userDetails")!
  );

  const getLeaderboardData = async (): Promise<void> => {
    await userDict.getUserId();
  };

  if (emailAndPassword !== null) {
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
          <Route path="/transaction" element={<EachTransaction />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/button-styles" element={<ButtonStyles />} />
          <Route path="/input-element" element={<InputElement />} />
        </Routes>
      </BrowserRouter>
    </TransactionContext.Provider>
  );
};

export default observer(App);
