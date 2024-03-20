import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TransactionContext from "./context/TransactionContext";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TransactionPage from "./components/TransactionPage";
import ProfileDetails from "./components/ProfileDetails";
import Cookies from "js-cookie";
import { TransctionStore } from "./stores/TotalTransactionData";
import { UsersData } from "./stores/UsersDetails";

let totalTransactionDetails = new TransctionStore();
let userDict = new UsersData();

const App = (): JSX.Element => {
  const [selectOption, onChangeSelect] = useState<string>("DASHBOARD");

  const [isUserAdmin, onChangeAdmin] = useState<boolean>(false);

  useEffect((): void => {
    const jwtToken: string = Cookies.get("jwt_token")!;

    if (jwtToken === "3") {
      onChangeAdmin(true);
    } else {
      onChangeAdmin(false);
    }
  }, []);

  const createNewInstance = () => {
    totalTransactionDetails.fetchData();
    userDict.fetchData();
  };

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
        selectOption,
        onChangeSelectOption,
        transactionOption,
        onChangeTransactionOption,
        isUserAdmin,
        onChangeAdmin: () => onChangeAdmin,
        totalTransactionDetails,
        userDict,
        createNewInstance,
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

export default App;
