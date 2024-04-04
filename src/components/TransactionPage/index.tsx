import React, { useState, useEffect, useContext } from "react";
import { observer, useObserver } from "mobx-react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import FailureCase from "../FailureCase";
import EachTransaction from "../EachTransaction";
import Pagination from "../Pagination";

import {
  TransactionHomePage,
  TransactionTotalBodyContainer,
  TransactionsContainer,
  TransactionBodyContainer,
  SelectFilterConditions,
  TransactionSelectFilter,
  SelectAllOption,
  SelectedContainer,
  SelectOption,
  SelectedCreditContainer,
  TransactionName,
  TransactionCategory,
  TransactionDate,
  TransactionAmount,
  LoadingContainer,
  HeadingDashTransactionContainer,
  NoTransactionsFountHeading,
  TransactionUserName,
} from "./styledComponents";

const TransactionPage = observer(() => {
  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    totalTransactionDetails,
    userDict,
    isUserAdmin,
    userId,
  } = transactionStore;

  const jwtToken = Cookies.get("jwt_token") || "";
  const navigate = useNavigate();

  const [filterOption, setFilterOption] = useState("alltransactions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          await userDict.getUserId();
          await totalTransactionDetails.fetchData(userId);
          if (isUserAdmin) {
            await userDict.fetchData();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [
    jwtToken,
    isUserAdmin,
    navigate,
    totalTransactionDetails,
    userId,
    userDict,
  ]);

  const renderTransactions = () => {
    const { transactionLoading, transactionData, transactionErrorMes } =
      totalTransactionDetails;

    if (transactionLoading === "IN_PROGRESS") {
      return (
        <LoadingContainer data-testid="loader">
          <ReactLoading type="bars" color="#000000" height={50} width={50} />
        </LoadingContainer>
      );
    }

    if (transactionLoading === "FAILURE") {
      return <FailureCase />;
    }

    let filteredTransactions = [...transactionData];

    if (filterOption !== "alltransactions") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.type.toUpperCase() === filterOption.toUpperCase()
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransactions.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    if (currentItems.length === 0) {
      return (
        <NoTransactionsFountHeading>
          No Transactions Found
        </NoTransactionsFountHeading>
      );
    }

    return (
      <>
        <HeadingDashTransactionContainer>
          {isUserAdmin && <TransactionUserName>User Name</TransactionUserName>}
          <TransactionName isAdmin={isUserAdmin}>
            Transaction Name
          </TransactionName>
          <TransactionCategory isAdmin={isUserAdmin}>
            Category
          </TransactionCategory>
          <TransactionDate isAdmin={isUserAdmin}>Date</TransactionDate>
          <TransactionAmount isAdmin={isUserAdmin}>Amount</TransactionAmount>
        </HeadingDashTransactionContainer>
        {currentItems.map((transaction, index) => {
          let user = isUserAdmin
            ? userDict.users.find((user) => user.id === transaction.userId)
            : { name: "Admin" };

          return (
            <EachTransaction
              transactionsData={currentItems}
              eachTransaction={transaction}
              index={index}
              isUserAdmin={isUserAdmin}
              user={user!}
              isThisLastThreeTransactions={true}
            />
          );
        })}
        {filteredTransactions.length > 10 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredTransactions.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </>
    );
  };

  const handleFilterChange = (option: string) => {
    setFilterOption(option);
    setCurrentPage(1); // Reset current page when filter changes
  };

  useEffect(() => {
    if (selectOption !== "TRANSACTIONS") {
      onChangeSelectOption("TRANSACTIONS");
    }
  }, [onChangeSelectOption, selectOption]);

  return (
    <TransactionHomePage>
      <SideBar />
      <TransactionTotalBodyContainer>
        <Header />
        <SelectFilterConditions>
          <TransactionSelectFilter
            onClick={() => handleFilterChange("alltransactions")}
          >
            <SelectAllOption
              transactionOption={filterOption === "alltransactions"}
            >
              All Transaction
            </SelectAllOption>
            <SelectedContainer
              transactionOption={filterOption === "alltransactions"}
            />
          </TransactionSelectFilter>

          <TransactionSelectFilter onClick={() => handleFilterChange("credit")}>
            <SelectOption transactionOption={filterOption === "credit"}>
              Credit
            </SelectOption>
            <SelectedCreditContainer
              transactionOption={filterOption === "credit"}
            />
          </TransactionSelectFilter>

          <TransactionSelectFilter onClick={() => handleFilterChange("debit")}>
            <SelectOption transactionOption={filterOption === "debit"}>
              Debit
            </SelectOption>
            <SelectedCreditContainer
              transactionOption={filterOption === "debit"}
            />
          </TransactionSelectFilter>
        </SelectFilterConditions>
        <TransactionBodyContainer>
          <TransactionsContainer>{renderTransactions()}</TransactionsContainer>
        </TransactionBodyContainer>
      </TransactionTotalBodyContainer>
    </TransactionHomePage>
  );
});

export default TransactionPage;
