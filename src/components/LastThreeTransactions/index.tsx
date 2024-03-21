import { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { observer } from "mobx-react";

import TransactionContext from "../../context/TransactionContext";

import FailureCase from "../FailureCase";
import EachTransaction from "../EachTransaction";
import { ApiStatus, TransctionProps } from "../InterfaceDefining";

import {
  TransactionsContainer,
  LoadingContainer,
  NoTransactionsFountHeading,
  FailureContainer,
} from "./styledComponents";

export interface ApiStatusAndData {
  status: string;
  data: TransctionProps[];
  errorMsg?: string;
}

interface UserDetail {
  id?: number;
  name?: string;
  email?: string;
  country?: string;
  date_of_birth?: string;
  dateOfBirth?: string;
  city?: string;
  permanent_address?: string;
  postal_code?: string;
  present_address?: string;
  permanentAddress?: string;
  postalCode?: string;
  presentAddress?: string;
}

const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const TransactionPage = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userDict, isUserAdmin, userId } =
    transactionStore;

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
    status: apiStatusConstants.inProgress,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  observe(totalTransactionDetails, (): void => {
    setApiResponse({
      status: apiStatusConstants.success,
      data: totalTransactionDetails.transactionData.slice(0, 3),
    });
  });

  useEffect(() => {
    const getTransactionData = async () => {
      try {
        await totalTransactionDetails.fetchData(userId);
        if (isUserAdmin) {
          await userDict.fetchData();
          setProfileDetailsApiResponse(userDict.users);
        }

        setApiResponse({
          status: apiStatusConstants.success,
          data: totalTransactionDetails.transactionData.slice(0, 3),
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
