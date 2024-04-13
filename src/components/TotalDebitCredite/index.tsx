import { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import TransactionContext from "../../context/TransactionContext";
import { apiStatusConstants } from "../../constants/commonConstants";
import { DataOutPut, ApiOutputStatus } from "../../types/transactionsTypes";
import FailureCase from "../FailureCase";

import {
  CreditContainer,
  HeadingAmount,
  Paragraph,
  CreditImage,
  CreditTextContainer,
  ImageContainer,
  AmountDetailsContainer,
  DebitContainer,
  DebitTextContainer,
  DebitImageContainer,
  DebitHeadingAmount,
  DebitImage,
  LoadingContainer,
} from "./styledComponents";

const TotalDebitCredit = (): JSX.Element => {
  const { t } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userId } = transactionStore;

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.initial,
    data: [],
  });

  observe(totalTransactionDetails.transactionData, (): void => {
    setApiResponse({
      status: apiStatusConstants.success,
      data: totalTransactionDetails.creditAndDebit,
    });
  });

  useEffect((): void => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
    });
    const getLeaderboardData = async (): Promise<void> => {
      try {
        await totalTransactionDetails.fetchTotalCreditAndDebitData(userId);
        setApiResponse({
          status: apiStatusConstants.success,
          data: totalTransactionDetails.creditAndDebit,
        });
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.success,
          data: [
            {
              sum: 0,
              type: "credit",
            },
            {
              sum: 0,
              type: "debit",
            },
          ],
        });
      }
    };

    getLeaderboardData();
  }, [userId, totalTransactionDetails]);

  const renderSuccessView = (): JSX.Element => {
    let data: DataOutPut[] = apiResponse.data;
    if (apiResponse.data.length === 0) {
      data = [
        { sum: 0, type: "credit" },
        { sum: 0, type: "debit" },
      ];
    }

    return (
      <>
        <CreditContainer>
          <CreditTextContainer>
            <HeadingAmount>$ {data[0].sum}</HeadingAmount>
            <Paragraph>{t("credit")}</Paragraph>
          </CreditTextContainer>
          <ImageContainer>
            <CreditImage
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705735242/Group_itp5q8.png"
              alt="group"
            />
          </ImageContainer>
        </CreditContainer>

        <DebitContainer>
          <DebitTextContainer>
            <DebitHeadingAmount>$ {data[1].sum}</DebitHeadingAmount>
            <Paragraph>{t("debit")}</Paragraph>
          </DebitTextContainer>
          <DebitImageContainer>
            <DebitImage
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705741143/Group_1_x8rnbj.png"
              alt="group"
            />
          </DebitImageContainer>
        </DebitContainer>
      </>
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

  return <AmountDetailsContainer>{renderLeaderboard()}</AmountDetailsContainer>;
};

export default observer(TotalDebitCredit);
