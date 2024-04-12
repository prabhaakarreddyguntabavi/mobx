import { useState, useEffect, useContext } from "react";
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
    const getTransactionData = async () => {
      try {
        await totalTransactionDetails.fetchData(userId);
        if (isUserAdmin) {
          // await userDict.getUserId();
          await userDict.fetchData();
          setProfileDetailsApiResponse(userDict.users);
        }

        setApiResponse({
          status: totalTransactionDetails.transactionLoading,
          data: totalTransactionDetails.transactionData.slice(0, 3),
        });
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: [],
        });
      }
    };
    getTransactionData();
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
      <NoTransactionsFountHeading>
        No Transactions Found
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer
      className="products-loader-container"
      data-testid="loader"
    >
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

  return <TransactionsContainer>{renderLeaderboard()}</TransactionsContainer>;
};

export default observer(TransactionPage);
