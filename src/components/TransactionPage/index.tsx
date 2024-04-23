import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import ReactLoading from "react-loading";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { observe } from "mobx";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import {
  TransctionProps,
  ApiStatusAndData,
} from "../../types/transactionsTypes";
import { UserDetail } from "../../types/usersTypes";
import { apiStatusConstants } from "../../constants/commonConstants";
import { setJwtToken } from "../../utils/jwtToken";
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
  const { t } = useTranslation();

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

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
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

    const fetchData = async () => {
      await totalTransactionDetails.getTransactionData(transactionStore);
      if (isUserAdmin) {
        setProfileDetailsApiResponse(userDict.users);
      }
      setTimeout(() => {
        setApiResponse({
          status: totalTransactionDetails.transactionLoading,
          data: totalTransactionDetails.transactionData,
        });
      }, 3);
    };
    fetchData();
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
          <HeadingDashTransactionContainer className="ml-[5px] w-full sm:h-18 md:h-10 flex-shrink-0 border-b border-gray-300  flex items-center">
            {isUserAdmin ? (
              <TransactionUserName className="w-[20vw] text-blue-900 font-inter text-lg font-medium">
                {t("common.userName")}
              </TransactionUserName>
            ) : (
              ""
            )}
            <TransactionName
              className="text-[#343c6a] font-inter text-base font-medium overflow-hidden"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.transactionName")}
            </TransactionName>
            <TransactionCategory
              className="ml-[12px] w-[25px] text-[#343c6a] font-inter text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.category")}
            </TransactionCategory>
            <TransactionDate
              className="hidden md:block text-[#343c6a] font-inter text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.date")}
            </TransactionDate>
            <TransactionAmount
              className="text-[#343c6a] font-inter text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.amount")}
            </TransactionAmount>
          </HeadingDashTransactionContainer>
          {currentItems.map(
            (eachTransaction: TransctionProps, index: number) => {
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
                  isUserAdmin={isUserAdmin}
                  user={user}
                  isThisLastThreeTransactions={false}
                />
              );
            }
          )}
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
      <NoTransactionsFountHeading className="m-auto min-h-[35vh] mt-[20%]">
        {t("common.noTransactionsFound")}
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer
      className="m-auto min-h-[35vh] mt-[20%]"
      data-testid="loader"
    >
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
  const jwtToken = setJwtToken();
  if (!jwtToken) {
    navigate("/login");
  }
  return (
    <TransactionHomePage className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <TransactionTotalBodyContainer className="bg-[#f5f7fa] flex flex-col lg:w-5/6 ">
        <Header />
        <SelectFilterConditions className="mb-10 sm:w-full flex items-start gap-[24px] pl-[40px] bg-white">
          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("alltransactions");
              setCurrentPage(1);
            }}
          >
            <SelectAllOption
              className="font-inter text-base font-medium"
              transactionOption={filterOption === "alltransactions"}
            >
              {t("common.allTransactions")}
            </SelectAllOption>
            <SelectedContainer
              className="w-[139px] h-[3px] rounded-t-10"
              transactionOption={filterOption === "alltransactions"}
            ></SelectedContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("credit");
              setCurrentPage(1);
            }}
          >
            <SelectOption
              className="text-center font-inter font-medium text-base"
              transactionOption={filterOption === "credit"}
            >
              {t("common.credit")}
            </SelectOption>
            <SelectedCreditContainer
              className="w-[63px] h-[3px] flex-shrink-0 rounded-t-lg"
              transactionOption={filterOption === "credit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("debit");
              setCurrentPage(1);
            }}
          >
            <SelectOption
              className="text-center font-inter font-medium text-base"
              transactionOption={filterOption === "debit"}
            >
              {t("common.debit")}
            </SelectOption>
            <SelectedCreditContainer
              className="w-[63px] h-[3px] flex-shrink-0 rounded-t-lg"
              transactionOption={filterOption === "debit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>
        </SelectFilterConditions>
        <TransactionBodyContainer className="w-full bg-[#f5f7fa] h-[75vh] overflow-auto">
          <TransactionsContainer className="flex flex-col mt-0 md:w-[94%] h-fit p-[12px] gap-[20px] items-start bg-white rounded-[25px] md:ml-[40px] md:mt-[32px] md:mr-[20px] sm:ml-0 sm:mr-0">
            {renderLeaderboard()}
          </TransactionsContainer>
        </TransactionBodyContainer>
      </TransactionTotalBodyContainer>
    </TransactionHomePage>
  );
};

export default observer(TransactionPage);
