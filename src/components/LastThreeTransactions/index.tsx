import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { observer } from "mobx-react";

import TransactionContext from "../../context/TransactionContext";
import { apiStatusConstants } from "../../constants/commonConstants";
import {
  ApiStatusAndData,
  TransctionProps,
} from "../../types/transactionsTypes";
import { UserDetail } from "../../types/usersTypes";

import FailureCase from "../FailureCase";
import EachTransaction from "../EachTransaction";

import {
  TransactionsContainer,
  LoadingContainer,
  NoTransactionsFountHeading,
  FailureContainer,
} from "./styledComponents";

const TransactionPage = (): JSX.Element => {
  const { t } = useTranslation();
  const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userDict, isUserAdmin, userId } =
    transactionStore;

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
    status: totalTransactionDetails.transactionLoading,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  observe(totalTransactionDetails.transactionData, (): void => {
    setApiResponse({
      status: totalTransactionDetails.transactionLoading,
      data: totalTransactionDetails.transactionData.slice(0, 3),
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
          data: totalTransactionDetails.transactionData.slice(0, 3),
        });
      }, 3);
    };
    fetchData();
  }, [isUserAdmin, userId]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;
    let transactionsData: TransctionProps[] = data;

    if (transactionsData.length !== 0) {
      return (
        <>
          {transactionsData.map(
            (eachTransaction: TransctionProps, index: number) => {
              let user: UserDetail;

              if (allProfileDetails === undefined) {
                user = { name: "" };
              } else {
                user = allProfileDetails.find(
                  (findUser: UserDetail) =>
                    findUser.id === eachTransaction.userId
                )!;
              }

              return (
                <>
                  <EachTransaction
                    transactionsData={transactionsData}
                    eachTransaction={eachTransaction}
                    index={index}
                    isUserAdmin={isUserAdmin}
                    user={user}
                    isThisLastThreeTransactions={true}
                  />
                </>
              );
            }
          )}
        </>
      );
    }
    return (
      <NoTransactionsFountHeading className="m-auto">
        {t("common.noTransactionsFound")}
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer className="m-auto" data-testid="loader">
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const renderFailureView = (): JSX.Element => (
    <FailureContainer>
      <FailureCase />
    </FailureContainer>
  );

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

  return (
    <TransactionsContainer className="sm:flex md:h-[17vh] lg:w-[94%] md:ml-10 md:w-[90%] sm:p-0 sm:ml-2 md:p-0 flex flex-col justify-end items-start gap-3 pt-5 pr-5 pb-3  md:mr-2 rounded-3xl bg-white lg:ml-10">
      {renderLeaderboard()}
    </TransactionsContainer>
  );
};

export default observer(TransactionPage);
