import React from "react";
import Popup from "reactjs-popup";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";
import { PropsValues } from "../../types/transactionsTypes";
import { dateTimeCustomFormate } from "../../utils/dateTimeFormate";

import {
  DashTransactionContainer,
  CreditDebitImage,
  TitleParagraph,
  CategoryParagraph,
  DateOfTransactionParagraph,
  EditImage,
  DeleteImage,
  CreditAmount,
  DebitAmount,
  AddTransactionContainer,
  AddTransactionMainContainer,
  AddTransactionTextContainer,
  HeadingTextContainer,
  AddTransactionHeading,
  AddTransactionParagraph,
  AddTransactionCloseImage,
  LogoutContainer,
  AdminProfileContainer,
  UserProfileDetails,
  TitleUserParagraph,
  AdminContainer,
  UserContainer,
  EditDeleteContainer,
  TransactionParagraphMobile,
  TextContainer,
} from "./styledComponents";

const EachTransaction = (props: PropsValues) => {
  const {
    transactionsData,
    isUserAdmin,
    index,
    eachTransaction,
    user,
    isThisLastThreeTransactions,
  } = props;
  const { t } = useTranslation();

  return (
    <DashTransactionContainer
      className="w-full flex-shrink-0 ml-1 flex justify-between items-center pl-2 pb-[6px] pt-0"
      length={transactionsData.length - 1 === index}
      key={eachTransaction.id}
    >
      {isUserAdmin ? (
        <AdminContainer className="flex items-center w-[30vw] md:w-[20vw]">
          {eachTransaction.type === "credit" ? (
            <CreditDebitImage
              isAdmin={isUserAdmin}
              src={
                isThisLastThreeTransactions
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706166669/Ellipse_21_bdfznp.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
              }
              alt="image"
            />
          ) : (
            <CreditDebitImage
              isAdmin={isUserAdmin}
              src={
                isThisLastThreeTransactions
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/Group_328_hbywun.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
              }
              alt="image"
            />
          )}

          <UserProfileDetails className="inline-flex items-center gap-2 w-[20vw]">
            <AdminProfileContainer
              className="text-[#505887] font-inter text-base font-medium bg-[#cccdcf] text-center h-25 px-[6px] py-[5px] w-[35px] rounded-full bg-cover"
              isAdmin={isUserAdmin}
            >
              {user?.name !== undefined ? user.name[0].toUpperCase() : ""}
            </AdminProfileContainer>
            <TitleUserParagraph className="w-153 text-gray-700 font-inter text-base font-normal">
              {user !== undefined ? user.name : ""}
            </TitleUserParagraph>
          </UserProfileDetails>
        </AdminContainer>
      ) : (
        <></>
      )}

      <UserContainer className="flex items-center w-[30vw] md:w-1/4">
        {!isUserAdmin ? (
          <>
            {" "}
            {eachTransaction.type === "credit" ? (
              <CreditDebitImage
                isAdmin={isUserAdmin}
                src={
                  isThisLastThreeTransactions
                    ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706166669/Ellipse_21_bdfznp.png"
                    : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
                }
                alt="image"
              />
            ) : (
              <CreditDebitImage
                isAdmin={isUserAdmin}
                src={
                  isThisLastThreeTransactions
                    ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/Group_328_hbywun.png"
                    : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
                }
                alt="image"
              />
            )}
          </>
        ) : (
          ""
        )}

        <TextContainer className="sm:w-[30vw]">
          <TitleParagraph className="w-[15vw] text-gray-700 font-inter text-base font-normal">
            {eachTransaction.transactionName}
          </TitleParagraph>
          <TransactionParagraphMobile className="flex text-xs mt-5 text-gray-400 font-bold w-20 md:hidden">
            {dateTimeCustomFormate(eachTransaction.date)}
          </TransactionParagraphMobile>
        </TextContainer>
      </UserContainer>
      <CategoryParagraph
        isAdmin={isUserAdmin}
        className="sm:w-14 text-gray-700 font-inter text-base font-normal overflow-hidden"
      >
        {eachTransaction.category}
      </CategoryParagraph>
      <DateOfTransactionParagraph className="hidden md:block text-gray-700 w-[20vw] font-inter text-base font-normal overflow-hidden">
        {dateTimeCustomFormate(eachTransaction.date)}
      </DateOfTransactionParagraph>

      {eachTransaction.type === "credit" ? (
        <CreditAmount
          className="w-[30vw] md:w-15vw] text-[#16dbaa] font-inter text-base font-medium text-left overflow-hidden"
          isAdmin={isUserAdmin}
        >
          +${eachTransaction.amount}
        </CreditAmount>
      ) : (
        <DebitAmount
          className=" text-[#fe5c73] font-inter text-base font-medium text-left overflow-hidden"
          isAdmin={isUserAdmin}
        >
          -${eachTransaction.amount}
        </DebitAmount>
      )}
      <EditDeleteContainer className="mr-5 md:w-16" isAdmin={isUserAdmin}>
        {isUserAdmin ? (
          ""
        ) : (
          <>
            <Popup
              modal
              trigger={
                <EditImage
                  className="mr-2 md:w-[20px] md:h-[20px] flex-shrink-0 lg:mr-[15px] cursor-pointer"
                  src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/pencil-02_lbbupq.png"
                  alt="edit"
                />
              }
            >
              {/* @ts-ignore */}
              {(close) => (
                <AddTransactionMainContainer className="fixed inset-0 w-screen h-screen flex flex-shrink-0 bg-gray-700 bg-opacity-70 backdrop-blur-md">
                  <AddTransactionContainer className="w-[90vw] md:w-[42%] lg:w-[32%] flex-shrink-0 rounded-xl bg-white m-auto">
                    <AddTransactionTextContainer className="flex">
                      <HeadingTextContainer className="mt-8 ml-6 mb-5">
                        <AddTransactionHeading className="text-[20px] font-bold leading-28 text-[#333b69]">
                          {t("transactionInputs.updateTransaction")}
                        </AddTransactionHeading>
                        <AddTransactionParagraph className="w-[289px] text-[#344054] font-normal text-[14px] leading-20 mt-2">
                          {t(
                            "transactionInputs.youcanupdateyourtransactionhere"
                          )}
                        </AddTransactionParagraph>
                      </HeadingTextContainer>
                      <AddTransactionCloseImage
                        className="w-[24px] h-[24px] flex-shrink-0 ml-auto mt-[24px] mr-[24px] cursor-pointer"
                        onClick={() => close()}
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                        alt="close"
                      />
                    </AddTransactionTextContainer>
                    <UpdateTransaction
                      eachTransaction={eachTransaction}
                      close={close}
                    />
                  </AddTransactionContainer>
                </AddTransactionMainContainer>
              )}
            </Popup>

            <Popup
              modal
              trigger={
                <DeleteImage
                  className="w-[20px] h-[20px] shrink-0 cursor-pointer"
                  src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/trash-01_uaykhq.png"
                  alt="delete"
                />
              }
            >
              {/* @ts-ignore */}
              {(close) => (
                <LogoutContainer className="flex w-screen h-screen flex-shrink-0 bg-opacity-70  bg-[#cfcfcf] backdrop-blur-lg  m-0">
                  <DeleteTransaction id={eachTransaction.id!} close={close} />
                </LogoutContainer>
              )}
            </Popup>
          </>
        )}
      </EditDeleteContainer>
    </DashTransactionContainer>
  );
};

export default observer(EachTransaction);
