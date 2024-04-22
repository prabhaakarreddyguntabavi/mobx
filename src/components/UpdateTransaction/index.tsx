import React, { useContext, useState } from "react";
import ReactLoading from "react-loading";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import TransactionContext from "../../context/TransactionContext";
import { TransctionProps } from "../../types/transactionsTypes";
import { setTimeFormate } from "../../utils/dateTimeFormate";

import {
  AddTransactionButton,
  AddTransactionInputContainer,
  AddTransactionLabel,
  AddTransactionNameInput,
  SelectTransactionType,
  SelectTransactionOptions,
  ErrorMessage,
} from "./styledComponents";

const UpdateTransaction = (props: {
  eachTransaction: TransctionProps;
  close: () => void;
}): JSX.Element => {
  const { eachTransaction, close } = props;
  const { t } = useTranslation();
  const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userId } = transactionStore;

  const [apiResponse, setApiResponse] = useState<{
    errorMsg: string | undefined;
  }>({
    errorMsg: undefined,
  });

  const [addTransactionStatus, updateTransaction] = useState<string>("");

  const [name, addName] = useState<string>(eachTransaction.transactionName!);
  const [type, addType] = useState<string>(eachTransaction.type);
  const [category, addCategory] = useState<string>(eachTransaction.category);
  const [amount, AddAmount] = useState<number>(eachTransaction.amount);
  const [date, addDate] = useState<string>(eachTransaction.date);

  const AddNameFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length >= 30) {
      window.alert("Username shouldn't exceed 30 characters");
    } else {
      addName(event.target.value);
    }
  };

  const AddAmountFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    AddAmount(parseInt(event.target.value));
  };

  const getLeaderboardData = async (): Promise<void> => {
    updateTransaction("inprogress");

    let headers: HeadersInit = {};
    let url: string = "";

    const body: TransctionProps = {
      id: eachTransaction.id,
      name,
      type,
      category,
      amount,
      date,
    };

    headers = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": userId.toString(),
    };
    url = "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const response: Response = await fetch(url, options);

    if (response.ok) {
      setApiResponse({
        errorMsg: "",
      });
      close();
      updateTransaction("");
      totalTransactionDetails.updateTransaction(body);
    } else {
      updateTransaction("");
      setApiResponse({
        errorMsg: "Details are in correct",
      });
    }
  };

  return (
    <>
      <AddTransactionInputContainer className="inline-flex flex-col items-start gap-[11px] mx-[24px] mb-[20px]">
        <AddTransactionLabel
          className="text-[#505887] font-inter text-base font-normal"
          htmlFor="updateTransactionName"
        >
          {t("transactionInputs.transactionName")}*
        </AddTransactionLabel>
        <AddTransactionNameInput
          className="w-[400px] h-[20px] flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white p-[16px]"
          required
          type="text"
          id="updateTransactionName"
          value={name}
          onChange={AddNameFunction}
          placeholder="Enter Name"
          maxLength={30}
        />
      </AddTransactionInputContainer>

      <AddTransactionInputContainer className="inline-flex flex-col items-start gap-[11px] mx-[24px] mb-[20px]">
        <AddTransactionLabel
          className="text-[#505887] font-inter text-base font-normal"
          htmlFor="updateTransactionType"
        >
          {t("transactionInputs.transactionType")}*
        </AddTransactionLabel>
        <SelectTransactionType
          className="w-[400px] h-[40px] flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white pr-[22px] text-[#718ebf] font-inter text-base"
          required
          id="UpdateTransactionType"
          value={type}
          onChange={(event) => addType(event.target.value)}
        >
          <SelectTransactionOptions value="credit">
            {t("common.credit")}
          </SelectTransactionOptions>
          <SelectTransactionOptions value="debit">
            {t("common.debit")}
          </SelectTransactionOptions>
        </SelectTransactionType>
      </AddTransactionInputContainer>

      <AddTransactionInputContainer className="inline-flex flex-col items-start gap-[11px] mx-[24px] mb-[20px]">
        <AddTransactionLabel
          className="text-[#505887] font-inter text-base font-normal"
          htmlFor="updateTransactionCategory"
        >
          {t("transactionInputs.category")}*
        </AddTransactionLabel>
        <SelectTransactionType
          className="w-[400px] h-[40px] flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white pr-[22px] text-[#718ebf] font-inter text-base"
          required
          id="updateTransactionCategory"
          value={category}
          onChange={(event) => addCategory(event.target.value)}
        >
          <SelectTransactionOptions value="Shopping">
            {t("transactionInputs.shopping")}
          </SelectTransactionOptions>
          <SelectTransactionOptions value="Service">
            {t("transactionInputs.service")}
          </SelectTransactionOptions>
          <SelectTransactionOptions value="Transfer">
            {t("transactionInputs.transfer")}
          </SelectTransactionOptions>
        </SelectTransactionType>
      </AddTransactionInputContainer>

      <AddTransactionInputContainer className="inline-flex flex-col items-start gap-[11px] mx-[24px] mb-[20px]">
        <AddTransactionLabel
          className="text-[#505887] font-inter text-base font-normal"
          htmlFor="updateTransactionAmount"
        >
          {t("transactionInputs.amount")}*
        </AddTransactionLabel>
        <AddTransactionNameInput
          className="w-[400px] h-[20px] flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white p-[16px]"
          required
          type="number"
          id="updateTransactionAmount"
          value={amount}
          onChange={AddAmountFunction}
          placeholder="Enter Your Amount"
        />
      </AddTransactionInputContainer>

      <AddTransactionInputContainer className="inline-flex flex-col items-start gap-[11px] mx-[24px] mb-[20px]">
        <AddTransactionLabel
          className="text-[#505887] font-inter text-base font-normal"
          htmlFor="updateTransctionDate"
        >
          {t("transactionInputs.date")}*
        </AddTransactionLabel>
        <AddTransactionNameInput
          className="w-[400px] h-[30px] flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white p-[16px]"
          readOnly
          required
          type="datetime-local"
          id="updateTransctionDate"
          value={setTimeFormate(date)}
          onChange={(event) => addDate(event.target.value)}
          placeholder="Select Date"
        />
      </AddTransactionInputContainer>

      <AddTransactionButton
        className="flex w-[90%] p-2 mx-auto justify-center items-center gap-4 rounded-lg bg-blue-600 border-0 text-white font-inter text-base md:text-lg cursor-pointer"
        type="button"
        onClick={() => {
          getLeaderboardData();
        }}
        disabled={addTransactionStatus === "inprogress"}
      >
        {addTransactionStatus === "inprogress" ? (
          <ReactLoading
            type={"bars"}
            color={"#ffffff"}
            height={20}
            width={30}
          />
        ) : (
          `${t("transactionInputs.updateTransaction")}`
        )}
      </AddTransactionButton>
      {apiResponse.errorMsg !== undefined && (
        <ErrorMessage className="self-start text-xs mt-1 mb-0 font-roboto text-[#ff0b37] ml-[24px]">
          {t("transactionInputs.invalidFieldResponses")}*
        </ErrorMessage>
      )}
    </>
  );
};

export default observer(UpdateTransaction);
