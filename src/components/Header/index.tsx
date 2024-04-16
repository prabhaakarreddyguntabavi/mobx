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
  ButtonText,
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
      updateErrorMessage("Please Fill All Fields");
      updateTransction("");
    }
  };

  const renderSuccessView = (): JSX.Element => {
    return (
      <>
        <LanguageContainer>
          <LanguageSelectorContainer
            required
            id="UpdateTransactionType"
            value={i18n.language}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
          >
            <DropdownOptions value="en">English</DropdownOptions>
            <DropdownOptions value="te">తెలుగు</DropdownOptions>
            <DropdownOptions value="hi">हिंदी</DropdownOptions>
          </LanguageSelectorContainer>

          <Popup
            modal
            trigger={
              <PopupContainer>
                <AddTransactionButton
                  disabled={isUserAdmin}
                  type="button"
                  onClick={() => addDate(getCurrentDateTime())}
                >
                  <ButtonImage
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705727508/plus_ndqvby.png"
                    alt="plus"
                  />{" "}
                  {t("transactionInputs.addTransaction")}
                </AddTransactionButton>

                <MobileAddTransactions type="button" disabled={isUserAdmin}>
                  <IoAddCircleOutline className="add-icon" />
                </MobileAddTransactions>
              </PopupContainer>
            }
          >
            {/* @ts-ignore */}
            {(close) => (
              <AddTransctionMainContainer>
                <AddTransctionContainer id="addTransaction">
                  <AddTransctionTextContainer>
                    <HeadingTextContainer>
                      <AddTransctionHeading>
                        {t("transactionInputs.addTransaction")}
                      </AddTransctionHeading>
                      <AddTransctionParagraph>
                        {t(
                          "transactionInputs.loremipsumdolorsitametconsectetur"
                        )}
                      </AddTransctionParagraph>
                    </HeadingTextContainer>
                    <AddTransctionCloseImage
                      onClick={() => {
                        close();
                        updateValues();
                      }}
                      src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                      alt="close"
                    />
                  </AddTransctionTextContainer>

                  <AddTransctionInputContainer>
                    <AddTransctionLabel htmlFor="addTransctionName">
                      {t("transactionInputs.transactionName")}*
                      <NotificationMessage>
                        ({t("transactionInputs.max30Characters")}*)
                      </NotificationMessage>
                    </AddTransctionLabel>
                    <AddTransctionNameInput
                      required
                      type="text"
                      id="addTransctionName"
                      value={name}
                      onChange={AddNameFunction}
                      placeholder="Enter Name"
                      maxLength={30}
                    />
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer>
                    <AddTransctionLabel htmlFor="addTransctionType">
                      {t("transactionInputs.transactionType")}*
                    </AddTransctionLabel>
                    <SelectTransctionType
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

                  <AddTransctionInputContainer>
                    <AddTransctionLabel htmlFor="addTransctionCategory">
                      {t("transactionInputs.category")}*
                    </AddTransctionLabel>
                    <SelectTransctionType
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

                  <AddTransctionInputContainer>
                    <AddTransctionLabel htmlFor="addTransctionAmount">
                      {t("transactionInputs.amount")}*
                    </AddTransctionLabel>
                    <AddTransctionNameInput
                      required
                      type="number"
                      id="addTransctionAmount"
                      value={amount}
                      onChange={addAmountFunction}
                      placeholder="Enter Your Amount"
                    />
                  </AddTransctionInputContainer>

                  <AddTransctionInputContainer>
                    <AddTransctionLabel htmlFor="addTransctionDate">
                      {t("transactionInputs.date")}*
                    </AddTransctionLabel>
                    <AddTransctionNameInput
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
                  <ErrorMessageParagraph>{errorMessage}</ErrorMessageParagraph>
                </AddTransctionContainer>
              </AddTransctionMainContainer>
            )}
          </Popup>
        </LanguageContainer>
      </>
    );
  };

  return (
    <HeaderMainContainer>
      <Popup
        modal
        trigger={
          <MobileHeaderProfile>
            <MobileParagraph>
              <IoMdMenu />
            </MobileParagraph>
          </MobileHeaderProfile>
        }
      >
        {/* @ts-ignore */}
        {(close) => (
          <MobilePopupContainer>
            <MobileSideBar close={close} />
          </MobilePopupContainer>
        )}
      </Popup>
      <MobileLogoImage
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
        alt="logo"
      />
      <ButtonText>{t(`common.${selectOption.toLowerCase()}`)}</ButtonText>
      {renderSuccessView()}
    </HeaderMainContainer>
  );
};

export default observer(Header);
