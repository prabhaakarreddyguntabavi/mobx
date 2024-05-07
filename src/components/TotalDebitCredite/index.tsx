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
        <CreditContainer className="w-[93vw] ml-3 mr-3 md:ml-5 lg:ml-10 md:w-[43%] flex lg:w-[45%] p-2 flex-row items-start gap-2 flex-shrink-0 rounded-2xl bg-white mt-6">
          <CreditTextContainer className="inline-flex flex-col items-start gap-[2px] mt-2 ml-3">
            <HeadingAmount className="text-[#16dbaa] font-inter text-3xl font-semibold m-0">
              $ {data[0].sum}
            </HeadingAmount>
            <Paragraph className="text-[#718ebf] font-inter text-base font-normal m-0">
              {t("common.credit")}
            </Paragraph>
          </CreditTextContainer>
          <ImageContainer className="w-[182.431px] self-end ml-auto flex justify-end">
            <CreditImage
              className="w-fit ml-auto"
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705735242/Group_itp5q8.png"
              alt="group"
            />
          </ImageContainer>
        </CreditContainer>

        <DebitContainer className="w-[93vw] ml-3 mr-3 md:ml-5 lg:ml-10 md:w-[43%] flex lg:w-[45%] p-2 flex-row items-start gap-2 flex-shrink-0 rounded-2xl bg-white mt-6">
          <DebitTextContainer className="inline-flex flex-col items-start gap-[2px] mt-2 ml-3">
            <DebitHeadingAmount className="text-[#fe5c73] font-inter text-2xl font-semibold">
              $ {data[1].sum}
            </DebitHeadingAmount>
            <Paragraph className="text-[#718ebf] font-inter text-base font-normal m-0">
              {t("common.debit")}
            </Paragraph>
          </DebitTextContainer>
          <DebitImageContainer className="w-[187.807px] self-end ml-auto flex justify-end">
            <DebitImage
              className="w-fit ml-auto"
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
      className="ml-[150px] md:ml-[350px] lg:ml-[610px] h-16"
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

  return (
    <AmountDetailsContainer className="sm:p-[10px] sm:flex-col md:flex-row lg:flex-row w-full lg:flex md:flex gap-2 shrink-0 rounded-e-3xl">
      {renderLeaderboard()}
    </AmountDetailsContainer>
  );
};

export default observer(TotalDebitCredit);
