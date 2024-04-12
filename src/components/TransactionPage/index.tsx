import { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import ReactLoading from "react-loading";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { observe } from "mobx";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import {
  TransctionProps as DataValues,
  ApiStatusAndData as ApiOutputStatus,
} from "../../types/transactionsTypes";
import { UserDetail } from "../../types/usersTypes";
import { apiStatusConstants, jwtToken } from "../../constants/commonConstants";
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

  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: totalTransactionDetails.transactionLoading,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const [filterOption, onChangeFilter] = useState<string>("alltransactions");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  observe(totalTransactionDetails.transactionData, (): void => {
    setApiResponse({
      status: totalTransactionDetails.transactionLoading,
      data: totalTransactionDetails.transactionData,
    });
  });

  useEffect(() => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
    });

    const getTransactionData = async () => {
      try {
        await totalTransactionDetails.fetchData(userId);
        if (isUserAdmin) {
          await userDict.fetchData();
          setProfileDetailsApiResponse(userDict.users);
        }

        setTimeout(() => {
          setApiResponse({
            status: totalTransactionDetails.transactionLoading,
            data: totalTransactionDetails.transactionData,
          });
        }, 300);
      } catch (error) {
        setApiResponse({
          status: totalTransactionDetails.transactionLoading,
          data: [],
        });
      }
    };
    getTransactionData();
  }, [userId]);

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
  if (!jwtToken) {
    navigate("/login");
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
              setCurrentPage(1);
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
              setCurrentPage(1);
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
              setCurrentPage(1);
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
