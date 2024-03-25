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
import Pagination from "../Pagination"; // Import Pagination component

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
    isUserAdmin,
    userId,
  } = transactionStore;

  const jwtToken: string = Cookies.get("jwt_token")!;
  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: totalTransactionDetails.transactionLoading,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const [filterOption, onChangeFilter] = useState<string>("alltransactions");
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const [itemsPerPage] = useState<number>(10); // Number of items to display per page

  observe(totalTransactionDetails.transactionData, (): void => {
    setApiResponse({
      status: totalTransactionDetails.transactionLoading,
      data: totalTransactionDetails.transactionData,
      errorMsg: totalTransactionDetails.transactionErrorMes,
    });
  });

  useEffect(() => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
    });
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getTransactionData = async () => {
        try {
          await userDict.getUserId();
          await totalTransactionDetails.fetchData(userId);
          if (isUserAdmin) {
            // await userDict.getUserId();
            await userDict.fetchData();
            setProfileDetailsApiResponse(userDict.users);
          }

          setTimeout(() => {
            setApiResponse({
              status: totalTransactionDetails.transactionLoading,
              data: totalTransactionDetails.transactionData,
            });
          }, 500);
        } catch (error) {
          setApiResponse({
            status: totalTransactionDetails.transactionLoading,
            data: [],
            errorMsg: totalTransactionDetails.transactionErrorMes,
          });
        }
      };
      getTransactionData();
    }
  }, [jwtToken, isUserAdmin, userId]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    let transactionsData = data;
    if (filterOption !== "alltransactions") {
      transactionsData = data.filter(
        (eachTransactionData) =>
          eachTransactionData.type.toUpperCase() === filterOption.toUpperCase()
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactionsData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    if (transactionsData.length !== 0) {
      return (
        <>
          <HeadingDashTransactionContainer>
            {isUserAdmin ? (
              <TransactionUserName>User Name</TransactionUserName>
            ) : (
              ""
            )}
            <TransactionName isAdmin={isUserAdmin}>
              Transaction Name
            </TransactionName>
            <TransactionCategory isAdmin={isUserAdmin}>
              Category
            </TransactionCategory>
            <TransactionDate isAdmin={isUserAdmin}>Date</TransactionDate>
            <TransactionAmount isAdmin={isUserAdmin}>Amount</TransactionAmount>
          </HeadingDashTransactionContainer>
          {currentItems.map((eachTransaction: DataValues, index: number) => {
            let user: UserDetail;

            if (allProfileDetails === undefined) {
              user = { name: "Admin" };
            } else {
              user = allProfileDetails.find(
                (findUser: UserDetail) => findUser.id === eachTransaction.userId
              )!;
            }

            return (
              <EachTransaction
                transactionsData={transactionsData}
                eachTransaction={eachTransaction}
                index={index}
                isUserAdmin={isUserAdmin}
                user={user}
                isThisLastThreeTransactions={false}
              />
            );
          })}
          {transactionsData.length > 10 ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={transactionsData.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ""
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
