import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { observe } from "mobx";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import FailureCase from "../FailureCase";
import EachTransaction from "../EachTransaction";

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

interface DataValues {
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
interface ApiOutputStatus {
  status: string;
  data: DataValues[];
  errorMsg?: string;
}

interface ApiStatusValues {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

interface UserDetail {
  id?: number;
  name?: string;
  email?: string;
  country?: string | null;
  date_of_birth?: string | null;
  city?: string | null;
  permanent_address?: string | null;
  postal_code?: string | null;
  present_address?: string | null;
}

const apiStatusConstants: ApiStatusValues = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const TransactionPage = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    totalTransactionDetails,
    userDict,
  } = transactionStore;

  const jwtToken: string = Cookies.get("jwt_token")!;
  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.inProgress,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const [filterOption, onChangeFilter] = useState<string>("alltransactions");

  observe(totalTransactionDetails, (): void => {
    setApiResponse({
      status: apiStatusConstants.success,
      data: totalTransactionDetails.transactionData,
    });
  });

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getTransactionData = async () => {
        try {
          await totalTransactionDetails.fetchData();
          if (jwtToken === "3") {
            await userDict.fetchData();
            setProfileDetailsApiResponse(userDict.users);
          }

          setApiResponse({
            status: apiStatusConstants.success,
            data: totalTransactionDetails.transactionData,
          });
        } catch (error) {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: [],
            errorMsg: totalTransactionDetails.transactionErrorMes,
          });
        }
      };
      getTransactionData();
    }
  }, [jwtToken]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    let transactionsData = data;
    if (filterOption !== "alltransactions") {
      transactionsData = data.filter(
        (eachTransactionData) =>
          eachTransactionData.type.toUpperCase() === filterOption.toUpperCase()
      );
    }

    if (transactionsData.length !== 0) {
      return (
        <>
          <HeadingDashTransactionContainer>
            {jwtToken === "3" ? (
              <TransactionUserName>User Name</TransactionUserName>
            ) : (
              ""
            )}
            <TransactionName isAdmin={jwtToken === "3"}>
              Transaction Name
            </TransactionName>
            <TransactionCategory isAdmin={jwtToken === "3"}>
              Category
            </TransactionCategory>
            <TransactionDate isAdmin={jwtToken === "3"}>Date</TransactionDate>
            <TransactionAmount isAdmin={jwtToken === "3"}>
              Amount
            </TransactionAmount>
          </HeadingDashTransactionContainer>

          {transactionsData.map(
            (eachTransaction: DataValues, index: number) => {
              let user: UserDetail;

              if (allProfileDetails === undefined) {
                user = { name: "Admin" };
              } else {
                user = allProfileDetails.find(
                  (findUser: UserDetail) =>
                    findUser.id === eachTransaction.userId
                )!;
              }

              return (
                <EachTransaction
                  transactionsData={transactionsData}
                  eachTransaction={eachTransaction}
                  index={index}
                  jwtToken={jwtToken}
                  user={user}
                  isThisLastThreeTransactions={false}
                />
              );
            }
          )}
        </>
      );
    }
    return (
      <NoTransactionsFountHeading>
        No Transactions Found
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer data-testid="loader">
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const renderFailureView = (): JSX.Element => <FailureCase />;

  const renderLeaderboard = (): JSX.Element | null => {
    const { status } = apiResponse;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  if (selectOption !== "TRANSACTIONS") {
    onChangeSelectOption("TRANSACTIONS");
  }

  return (
    <TransactionHomePage>
      <SideBar />
      <TransactionTotalBodyContainer>
        <Header />
        <SelectFilterConditions>
          <TransactionSelectFilter
            onClick={() => {
              onChangeFilter("alltransactions");
            }}
          >
            <SelectAllOption
              transactionOption={filterOption === "alltransactions"}
            >
              All Transaction
            </SelectAllOption>
            <SelectedContainer
              transactionOption={filterOption === "alltransactions"}
            ></SelectedContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            onClick={() => {
              onChangeFilter("credit");
            }}
          >
            <SelectOption transactionOption={filterOption === "credit"}>
              Credit
            </SelectOption>
            <SelectedCreditContainer
              transactionOption={filterOption === "credit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            onClick={() => {
              onChangeFilter("debit");
            }}
          >
            <SelectOption transactionOption={filterOption === "debit"}>
              Debit
            </SelectOption>
            <SelectedCreditContainer
              transactionOption={filterOption === "debit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>
        </SelectFilterConditions>
        <TransactionBodyContainer>
          <TransactionsContainer>{renderLeaderboard()}</TransactionsContainer>
        </TransactionBodyContainer>
      </TransactionTotalBodyContainer>
    </TransactionHomePage>
  );
};

export default observer(TransactionPage);
