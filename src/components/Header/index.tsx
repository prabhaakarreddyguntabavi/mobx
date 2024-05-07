import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Popup from "reactjs-popup";
import ReactLoading from "react-loading";
import { IoMdMenu } from "react-icons/io";
import MobileSideBar from "../MobileSideBar";
import { observer } from "mobx-react";

import TransactionContext from "../../context/TransactionContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { TransctionProps } from "../../types/transactionsTypes";
import { getCurrentDateTime } from "../../utils/dateTimeFormate";

import {
  HeaderMainContainer,
  AddTransactionButton,
  ButtonImage,
  HeaderPrargraphText,
  AddTransctionButton,
  AddTransctionContainer,
  AddTransctionMainContainer,
  AddTransctionTextContainer,
  HeadingTextContainer,
  AddTransctionHeading,
  AddTransctionParagraph,
  AddTransctionCloseImage,
  AddTransctionInputContainer,
  AddTransctionLabel,
  AddTransctionNameInput,
  SelectTransctionType,
  SelectTransctionOptions,
  MobileLogoImage,
  MobileHeaderProfile,
  MobilePopupContainer,
  MobileParagraph,
  MobileAddTransactions,
  ErrorMessageParagraph,
  NotificationMessage,
  PopupContainer,
  LanguageContainer,
  LanguageSelectorContainer,
  DropdownOptions,
} from "./styledComponents";
import "./index.css";

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const { selectOption, totalTransactionDetails, isUserAdmin, userId } =
    transactionStore;

  const [addTransctionStatus, updateTransction] = useState<string>("");

  const [name, addName] = useState<string>("");
  const [type, addType] = useState<string>("credit");
  const [category, addCategory] = useState<string>("Shopping");
  const [amount, addAmount] = useState<number>();
  const [date, addDate] = useState<string>(getCurrentDateTime());
  const [errorMessage, updateErrorMessage] = useState<string>("");

  const AddNameFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length >= 30) {
      window.alert("Username shouldn't exceed 30 characters");
    } else {
      addName(event.target.value);
    }
  };

  const addAmountFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    addAmount(parseInt(event.target.value));
  };

  const updateValues = (): void => {
    addName("");
    addType("credit");
    addCategory("Shopping");
    addAmount(undefined);
    addDate("");
  };

  const getLeaderboardData = async (close: () => void): Promise<void> => {
    updateTransction("inprogress");
    updateErrorMessage("");

    let headers: HeadersInit = {};
    let url: string = "";

    if (
      name !== undefined &&
      type !== "" &&
      category !== "" &&
      amount !== undefined &&
      date !== undefined
    ) {
      const body: TransctionProps = {
        name,
        type: type.toLowerCase(),
        category,
        amount,
        date,
        user_id: userId,
      };

      headers = {
        "Content-Type": "application/json",
        "x-hasura-role": "user",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-user-id": userId.toString(),
      };
      url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

      const options: RequestInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      const response: Response = await fetch(url, options);
      const responseData = await response.json();

      if (response.ok) {
        updateTransction("");
        updateValues();
        close();
        totalTransactionDetails.addTransaction({
          ...responseData.insert_transactions_one,
          user_id: userId,
        });
      } else {
        updateTransction("");
      }
    } else {
      updateErrorMessage("*Please Fill All Fields");
      updateTransction("");
    }
  };

  const addTransctionDetails = (): JSX.Element => {
    return (
      <>
        <LanguageContainer className="flex ">
          <LanguageSelectorContainer
            className="mt-2 mr-2.5 h-8 "
            required
            id="UpdateTransactionType"
            value={i18n.language}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
          >
            <DropdownOptions value="en">English</DropdownOptions>
            <DropdownOptions className="mt-2" value="te">
              తెలుగు
            </DropdownOptions>
            <DropdownOptions value="hi">हिंदी</DropdownOptions>
          </LanguageSelectorContainer>

          <Popup
            modal
            trigger={
              <PopupContainer>
                <AddTransactionButton
                  className="hidden md:flex cursor-pointer p-2 mr-10 justify-center items-center gap-1 rounded-lg text-white text-center font-inter font-medium text-base"
                  disabled={isUserAdmin}
                  type="button"
                  onClick={() => addDate(getCurrentDateTime())}
                >
                  <ButtonImage
                    className="h-5 w-5"
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705727508/plus_ndqvby.png"
                    alt="plus"
                  />{" "}
                  {t("transactionInputs.addTransaction")}
                </AddTransactionButton>

                <MobileAddTransactions
                  className="flex p-2 bg-transparent justify-center items-center gap-1 rounded-lg text-black text-center font-inter text-base font-medium border-0 cursor-pointer md:hidden"
                  type="button"
                  disabled={isUserAdmin}
                >
                  <IoAddCircleOutline className="add-icon" />
                </MobileAddTransactions>
              </PopupContainer>
            }
          >
            {/* @ts-ignore */}
            {(close) => (
              <AddTransctionMainContainer className="fixed inset-0 w-screen h-screen flex flex-shrink-0 bg-gray-700 bg-opacity-70 backdrop-blur-md">
                <AddTransctionContainer
                  className="w-[90vw] md:w-[42%] lg:w-[32%] flex-shrink-0 rounded-xl bg-white m-auto"
                  id="addTransaction"
                >
                  <AddTransctionTextContainer className="flex">
                    <HeadingTextContainer className="mt-8 ml-6 mb-5">
                      <AddTransctionHeading className="text-[20px] font-bold leading-28 text-[#333b69]">
                        {t("transactionInputs.addTransaction")}
                      </AddTransctionHeading>
                      <AddTransctionParagraph className="text-[#344054] font-normal text-[14px] leading-20 mt-2">
                        {t(
                          "transactionInputs.loremipsumdolorsitametconsectetur"
                        )}
                      </AddTransctionParagraph>
                    </HeadingTextContainer>
                    <AddTransctionCloseImage
                      className="w-[24px] h-[24px] flex-shrink-0 ml-auto mt-[15px] mr-[15px] cursor-pointer"
                      onClick={() => {
                        close();
                        updateValues();
                      }}
                      src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                      alt="close"
                    />
                  </AddTransctionTextContainer>

                  <AddTransctionInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                    <AddTransctionLabel
                      className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                      htmlFor="addTransctionName"
                    >
                      {t("transactionInputs.transactionName")}*
                      <NotificationMessage className="text-xs m-0">
                        ({t("transactionInputs.max30Characters")}*)
                      </NotificationMessage>
                    </AddTransctionLabel>
                    <AddTransctionNameInput
                      className="w-[80vw] md:w-[28vw] h-11 pl-2 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white"
                      required
                      type="text"
                      id="addTransctionName"
                      value={name}
                      onChange={AddNameFunction}
                      placeholder="Enter Name"
                      maxLength={30}
                    />
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                    <AddTransctionLabel
                      className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                      htmlFor="addTransctionType"
                    >
                      {t("transactionInputs.transactionType")}*
                    </AddTransctionLabel>
                    <SelectTransctionType
                      className="w-[80vw] md:w-[28vw] h-12 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
                      required
                      id="addTransctionType"
                      value={type}
                      onChange={(event) => addType(event.target.value)}
                    >
                      <SelectTransctionOptions value="credit">
                        {t("common.credit")}
                      </SelectTransctionOptions>
                      <SelectTransctionOptions value="debit">
                        {t("common.debit")}
                      </SelectTransctionOptions>
                    </SelectTransctionType>
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                    <AddTransctionLabel
                      className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                      htmlFor="addTransctionCategory"
                    >
                      {t("transactionInputs.category")}*
                    </AddTransctionLabel>
                    <SelectTransctionType
                      className="w-[80vw] md:w-[28vw] h-12 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
                      required
                      id="addTransctionCategory"
                      value={category}
                      onChange={(event) => addCategory(event.target.value)}
                    >
                      <SelectTransctionOptions value="Shopping">
                        {t("transactionInputs.shopping")}
                      </SelectTransctionOptions>
                      <SelectTransctionOptions value="Service">
                        {t("transactionInputs.service")}
                      </SelectTransctionOptions>
                      <SelectTransctionOptions value="Transfer">
                        {t("transactionInputs.transfer")}
                      </SelectTransctionOptions>
                    </SelectTransctionType>
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                    <AddTransctionLabel
                      className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                      htmlFor="addTransctionAmount"
                    >
                      {t("transactionInputs.amount")}*
                    </AddTransctionLabel>
                    <AddTransctionNameInput
                      className="w-[80vw] md:w-[28vw] h-11 pl-2 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white"
                      required
                      type="number"
                      id="addTransctionAmount"
                      value={amount}
                      onChange={addAmountFunction}
                      placeholder="Enter Your Amount"
                    />
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                    <AddTransctionLabel
                      className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                      htmlFor="addTransctionDate"
                    >
                      {t("transactionInputs.date")}*
                    </AddTransctionLabel>
                    <AddTransctionNameInput
                      className="w-[80vw] md:w-[28vw] h-11 pl-2 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white"
                      required
                      type="datetime-local"
                      readOnly
                      id="addTransctionDate"
                      value={date}
                      onChange={() => addDate(getCurrentDateTime())}
                      placeholder="Select Date"
                    />
                  </AddTransctionInputContainer>

                  <AddTransctionButton
                    className="flex w-[90%] p-2 mb-2 mx-auto justify-center items-center gap-4 rounded-lg bg-blue-600 border-0 text-white font-inter text-base md:text-lg cursor-pointer"
                    type="submit"
                    onClick={() => {
                      getLeaderboardData(close);
                    }}
                    disabled={addTransctionStatus === "inprogress"}
                  >
                    {addTransctionStatus === "inprogress" ? (
                      <ReactLoading
                        type={"bars"}
                        color={"#ffffff"}
                        height={20}
                        width={30}
                      />
                    ) : (
                      `${t("transactionInputs.addTransaction")}`
                    )}
                  </AddTransctionButton>
                  <ErrorMessageParagraph className="text-red-500 text-sm ml-8 mt-2">
                    {errorMessage}
                  </ErrorMessageParagraph>
                </AddTransctionContainer>
              </AddTransctionMainContainer>
            )}
          </Popup>
        </LanguageContainer>
      </>
    );
  };

  return (
    <HeaderMainContainer className="h-20 max-w-full flex scroll-px-3 justify-between items-center bg-white lg:w-full md:w-full md:h-[8vh] md:justify-between sm:w-full">
      <Popup
        modal
        trigger={
          <MobileHeaderProfile className="flex w-[35px] h-[45px] ml-[10px] mr-[10px] rounded-full text-center justify-center items-center md:hidden">
            <MobileParagraph className="w-5 text-lg">
              <IoMdMenu />
            </MobileParagraph>
          </MobileHeaderProfile>
        }
      >
        {/* @ts-ignore */}
        {(close) => (
          <MobilePopupContainer className="flex w-screen h-screen flex-shrink-0 bg-[rgba(52,64,84,0.7)] backdrop-blur-md fixed top-0 left-0 md:hidden">
            <MobileSideBar close={close} />
          </MobilePopupContainer>
        )}
      </Popup>
      <MobileLogoImage
        className="block w-[40%] ml-2 md:hidden"
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
        alt="logo"
      />
      <HeaderPrargraphText className="hidden md:block text-[#343c6a] font-inter font-semibold text-3xl ml-10">
        {t(`common.${selectOption.toLowerCase()}`)}
      </HeaderPrargraphText>
      {addTransctionDetails()}
    </HeaderMainContainer>
  );
};

export default observer(Header);
