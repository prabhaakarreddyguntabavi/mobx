import { useContext, useEffect } from "react";

import { useNavigate, NavigateFunction } from "react-router-dom";
import Cookies from "js-cookie";
import TransactionContext from "../../context/TransactionContext";

import SideBar from "../SideBar";
import Header from "../Header";
import TotalDebitCredite from "../TotalDebitCredite";
import LastThreeTransactionsFunction from "../LastThreeTransactions";
import GenderChart from "../GenderChart";

import {
  DashboardMainContainer,
  BodyContainer,
  BodyMainContainer,
  LastTransaction,
  BarChartContainer,
} from "./styledComponents";
import { observer } from "mobx-react";

const Dashboard = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const { selectOption, onChangeSelectOption } = transactionStore;

  const navigate: NavigateFunction = useNavigate();

  const jwtToken: string = Cookies.get("jwt_token")!;

  useEffect((): void => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);
  if (selectOption !== "DASHBOARD") {
    onChangeSelectOption("DASHBOARD");
  }

  return (
    <DashboardMainContainer>
      <SideBar />
      <BodyMainContainer>
        <Header />
        <BodyContainer>
          <TotalDebitCredite />
          <LastTransaction>Last Transaction</LastTransaction>
          <LastThreeTransactionsFunction />
          <LastTransaction>Debit & Credit Overview</LastTransaction>
          <BarChartContainer>
            <GenderChart />
          </BarChartContainer>
        </BodyContainer>
      </BodyMainContainer>
    </DashboardMainContainer>
  );
};

export default observer(Dashboard);
