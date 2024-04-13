import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, NavigateFunction } from "react-router-dom";
import TransactionContext from "../../context/TransactionContext";
import { setJwtToken } from "../../utils/jwtToken";

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
  const { t } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const { selectOption, onChangeSelectOption } = transactionStore;
  const jwtToken = setJwtToken();
  const navigate: NavigateFunction = useNavigate();

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
          <LastTransaction>{t("lastTransaction")}</LastTransaction>
          <LastThreeTransactionsFunction />
          <LastTransaction>{t("debitCreditOverview")}</LastTransaction>
          <BarChartContainer>
            <GenderChart />
          </BarChartContainer>
        </BodyContainer>
      </BodyMainContainer>
    </DashboardMainContainer>
  );
};

export default observer(Dashboard);
