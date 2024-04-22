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

// import "./styles/tailwind.css";
import "../../tailwind.css";

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
    <DashboardMainContainer className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <BodyMainContainer className="bg-[#f5f7fa] flex flex-col w-5/6 ">
        <Header />
        <BodyContainer>
          <TotalDebitCredite />
          <LastTransaction className="text-[#333b69] Inter text-2xl not-italic font-semibold leading-normal ml-10 mt-6 mb-3 ">
            {t("dashboard.lastTransaction")}
          </LastTransaction>
          <LastThreeTransactionsFunction />
          <LastTransaction className="text-[#333b69] Inter text-2xl not-italic font-semibold leading-normal ml-10 mt-6 mb-3 ">
            {t(`dashboard.debitCreditOverview`)}
          </LastTransaction>
          <BarChartContainer>
            <GenderChart />
          </BarChartContainer>
        </BodyContainer>
      </BodyMainContainer>
    </DashboardMainContainer>
  );
};

export default observer(Dashboard);
