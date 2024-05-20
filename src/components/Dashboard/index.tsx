import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
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
      <BodyMainContainer className=" bg-[#f5f7fa] flex flex-col lg:w-[83%] ">
        <Header />
        <BodyContainer className="overflow-y-scroll h-[90vh] flex flex-col w-full ">
          <TotalDebitCredite />
          <LastTransaction className="ml-[10px] text-[22px] text-[#333b69] Inter text-2xl not-italic font-semibold leading-normal md:ml-10 mt-6 mb-3 ">
            {t("dashboard.lastTransaction")}
          </LastTransaction>
          <LastThreeTransactionsFunction />
          <LastTransaction className="ml-[10px] text-[22px] text-[#333b69] Inter text-2xl not-italic font-semibold leading-normal md:ml-10 mt-6 mb-3 ">
            {t(`dashboard.debitCreditOverview`)}
          </LastTransaction>
          <BarChartContainer className="min-h-[25%] w-[94%] ml-3 flex-shrink-0 rounded-2xl bg-white lg:ml-[40px] flex flex-col ">
            <GenderChart />
          </BarChartContainer>
        </BodyContainer>
      </BodyMainContainer>
    </DashboardMainContainer>
  );
};

export default observer(Dashboard);
