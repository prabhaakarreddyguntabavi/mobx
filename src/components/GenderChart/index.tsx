import { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import TransactionContext from "../../context/TransactionContext";
import { apiStatusConstants } from "../../constants/commonConstants";

import {
  FetchedData,
  OutPutObject,
  DailySum,
  DailySums,
  GraphProps,
  TodaySunOfTheValue,
  ApiStatusAndData,
  CrediteAndDebitList,
} from "../../types/graphTypes";

import {
  LoadingContainer,
  NoTransactionsFountHeading,
  GraphPrargraph,
  GraphPrargraphSpan,
  GraphValuesSetting,
  GraphCredite,
  GraphDebit,
  GraphTextParagraph,
  GraphHeaderContainer,
} from "./styledComponents";

const GenderChart = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const { isUserAdmin, userId, totalTransactionDetails } = transactionStore;

  const [reRender, updateValue] = useState<string>();

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
    status: apiStatusConstants.initial,
    data: [],
  });

  observe(totalTransactionDetails.transactionData, (): void => {
    updateValue(uuidv4());
  });

  useEffect((): void => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
    });

    const getLeaderboardData = async (): Promise<void> => {
      let headers: HeadersInit = {};
      let url: string = "";

      if (isUserAdmin) {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "admin",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        };

        url =
          "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin";
      } else {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "user",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": userId.toString(),
        };
        url =
          "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
      }

      const options: RequestInit = {
        method: "GET",
        headers: headers,
      };
      const response: Response = await fetch(url, options);
      const responseData: OutPutObject = await response.json();

      if (response.ok) {
        setApiResponse({
          status: apiStatusConstants.success,
          data: (isUserAdmin
            ? responseData.last_7_days_transactions_totals_admin
            : responseData.last_7_days_transactions_credit_debit_totals)!,
        });
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: "",
        });
      }
    };

    getLeaderboardData();
  }, [isUserAdmin, userId, reRender]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    if (data.length !== 0) {
      function calculateDailySums(transactions: CrediteAndDebitList[]) {
        const dailySums: DailySums = {};
        let totalDailySums: DailySum[] = [];

        transactions.forEach((transaction: CrediteAndDebitList): void => {
          if (transaction.date) {
            const date: string = transaction.date.split("T")[0];

            if (!dailySums[date]) {
              dailySums[date] = {
                debit: 0,
                credit: 0,
                type: transaction.type,
                date: date,
                sum: 0,
              };
            }

            if (transaction.type === "debit") {
              dailySums[date].debit! += transaction.sum!;
            } else if (transaction.type === "credit") {
              dailySums[date].credit! += transaction.sum!;
            }

            dailySums[date].sum! += transaction.sum!;
          }
        });

        totalDailySums = Object.values(dailySums);

        return { totalDailySums };
      }

      const { totalDailySums }: TodaySunOfTheValue = calculateDailySums(data);

      const last7Transactions: DailySum[] = totalDailySums
        .sort(
          (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
        )
        .slice(0, 7);

      function separateTransactions() {
        const creditTransactions: number[] = [];
        const debitTransactions: number[] = [];

        data.forEach((transaction: FetchedData) => {
          if (transaction.type === "credit") {
            creditTransactions.push(transaction.sum);
          } else if (transaction.type === "debit") {
            debitTransactions.push(transaction.sum);
          }
        });

        return { creditTransactions, debitTransactions };
      }

      const { creditTransactions, debitTransactions } = separateTransactions();

      const creditTransactionsSum: number = creditTransactions.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );

      const debitTransactionsSum: number = debitTransactions.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );

      return (
        <>
          <GraphHeaderContainer>
            <GraphPrargraph>
              <GraphPrargraphSpan> ${debitTransactionsSum}</GraphPrargraphSpan>{" "}
              Debited &
              <GraphPrargraphSpan>
                {" "}
                ${creditTransactionsSum}{" "}
              </GraphPrargraphSpan>{" "}
              Credited in this Week
            </GraphPrargraph>
            <GraphValuesSetting>
              <GraphTextParagraph>
                <GraphCredite></GraphCredite> Credit
              </GraphTextParagraph>
              <GraphTextParagraph>
                <GraphDebit></GraphDebit> Debit
              </GraphTextParagraph>
            </GraphValuesSetting>
          </GraphHeaderContainer>
          <BarChart
            width={window.innerWidth * 0.8}
            height={window.innerWidth * 0.3}
            data={last7Transactions}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="credit" fill={"#4D78FF"} shape={<CustomBar />} />
            <Bar dataKey="debit" fill={"#FCAA0B"} shape={<CustomBar />} />
          </BarChart>
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

  const CustomBar = (props: any): JSX.Element => {
    const { x, y, width, height, fill }: GraphProps = props;

    return (
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={10} />
    );
  };

  const renderFailureView = (): JSX.Element => <h1>Failure View</h1>;

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

  return <>{renderLeaderboard()}</>;
};

export default observer(GenderChart);
