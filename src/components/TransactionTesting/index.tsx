import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import ReactLoading from "react-loading";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { observe } from "mobx";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import {
  TransctionProps,
  ApiStatusAndData,
} from "../../types/transactionsTypes";
import { UserDetail } from "../../types/usersTypes";
import { apiStatusConstants } from "../../constants/commonConstants";
import { setJwtToken } from "../../utils/jwtToken";
import FailureCase from "../FailureCase";
// import EachTransaction from "../EachTransaction";
import Pagination from "../Pagination";

import {
  TransactionHomePage,
  TransactionTotalBodyContainer,
  TransactionsContainer,
  TransactionBodyContainer,
  SelectFilterConditions,
  TransactionSelectFilter,
  SelectAllOption,
  SelectedContainer,
  SelectOption,
  SelectedCreditContainer,
  TransactionName,
  TransactionCategory,
  TransactionDate,
  TransactionAmount,
  LoadingContainer,
  HeadingDashTransactionContainer,
  NoTransactionsFountHeading,
  TransactionUserName,
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
import Popup from "reactjs-popup";
import DeleteTransaction from "../DeleteTransaction";
import { dateTimeCustomFormate } from "../../utils/dateTimeFormate";
import UpdateTransaction from "../UpdateTransaction";

const EachTransaction = (): JSX.Element => {
  const { t } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    totalTransactionDetails,
    userDict,
    isUserAdmin,
    userId,
  } = transactionStore;

  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
    status: totalTransactionDetails.transactionLoading,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const [filterOption, onChangeFilter] = useState<string>("alltransactions");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  observe(totalTransactionDetails.transactionData, (): void => {
    setApiResponse({
      status: totalTransactionDetails.transactionLoading,
      data: totalTransactionDetails.transactionData,
    });
  });

  useEffect(() => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
    });

    const fetchData = async () => {
      await totalTransactionDetails.getTransactionData(transactionStore);
      if (isUserAdmin) {
        setProfileDetailsApiResponse(userDict.users);
      }
      setTimeout(() => {
        setApiResponse({
          status: totalTransactionDetails.transactionLoading,
          data: totalTransactionDetails.transactionData,
        });
      }, 3);
    };
    fetchData();
  }, [userId]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    let transactionsData = data;
    if (filterOption !== "alltransactions") {
      transactionsData = data.filter(
        (eachTransactionData) =>
          eachTransactionData.type.toUpperCase() === filterOption.toUpperCase()
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactionsData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    if (transactionsData.length !== 0) {
      return (
        <>
        
          <HeadingDashTransactionContainer 
          className="flex w-[100%] ml-[5px] sm:h-18 md:h-10 flex-shrink-0 border-b border-gray-300  flex items-center"
          // className="ml-[5px] w-full sm:h-18 md:h-10 flex-shrink-0 border-b border-gray-300  flex items-center"
          >
            {isUserAdmin && (
              <TransactionUserName 
              className="w-[19vw] text-left text-blue-900 font-inter text-lg font-medium"
              // className="w-[18vw] text-blue-900 font-inter text-lg font-medium"
              >
                {t("common.userName")}
              </TransactionUserName>
            ) }
            <TransactionName
            className="w-[20vw] text-left text-[#343c6a] text-[13px] font-inter md:text-base font-medium overflow-hidden"
              // className="text-[#343c6a] text-[13px] font-inter md:text-base font-medium overflow-hidden"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.transactionName")}
            </TransactionName>
            <TransactionCategory
            className="w-[19vw] text-left hidden md:flex text-[#343c6a] font-inter text-base font-medium"
              // className="hidden md:flex ml-[12px] w-[25px] text-[#343c6a] font-inter text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.category")}
            </TransactionCategory>
            <TransactionDate
            className="w-[19vw] text-left hidden md:block text-[#343c6a] font-inter text-base font-medium"
              // className="hidden md:block text-[#343c6a] font-inter text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.date")}
            </TransactionDate>
            <TransactionAmount
            className="w-[19vw] text-left text-[#343c6a] text-[13px] font-inter md:text-base font-medium"
              // className="text-[#343c6a] text-[13px] ml-[20px] md:ml-0 font-inter md:text-base font-medium"
              isAdmin={isUserAdmin}
            >
              {t("transactionInputs.amount")}
            </TransactionAmount>
            <th ></th>
          </HeadingDashTransactionContainer>
        {/* <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead> */}
        <tbody className="w-[100%]">
        

          {currentItems.map(
            (eachTransaction: TransctionProps, index: number) => {
              let user: UserDetail;

              if (allProfileDetails === undefined) {
                user = { name: "Admin" };
              } else {
                user = allProfileDetails.find(
                  (findUser: UserDetail) =>
                    findUser.id === eachTransaction.userId
                )!;
              }

              return (
                <>
                <DashTransactionContainer
                  // className="w-full flex-shrink-0 ml-1 flex justify-between items-center pl-2 pb-[8px] pt-0"
                  className="flex h-[54px] items-center flex-shrink-0 flex justify-between items-center pl-2 pb-[8px] pt-0"
                  length={transactionsData.length - 1 === index}
                  key={eachTransaction.id}
    >
       {isUserAdmin && (
        <AdminContainer 
        
        className="flex items-center w-[18vw] text-blue-900 font-inter text-lg font-medium"
        >
          {eachTransaction.type === "credit" ? (
            <CreditDebitImage
              isAdmin={isUserAdmin}
              src={
                 "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
              }
              alt="image"
            />
          ) : (
            <CreditDebitImage
              isAdmin={isUserAdmin}
              src={
                 "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
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
      )}

      <UserContainer isAdmin={isUserAdmin} 
      className="w-[20vw] flex items-center"
      // className="flex items-center w-[30vw] md:w-[20.5vw]"
      >
        {!isUserAdmin && (
          <>
            {eachTransaction.type === "credit" ? (
              <CreditDebitImage
                isAdmin={isUserAdmin}
                src={
                 "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
                }
                alt="image"
              />
            ) : (
              <CreditDebitImage
                isAdmin={isUserAdmin}
                src={
                  "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
                }
                alt="image"
              />
            )}
          </>
        )}

        <TextContainer 
        // className="sm:w-[30vw]"
        >
          <TitleParagraph 
          // className="w-[15vw] text-xs text-gray-700 font-inter md:text-base font-normal"
          >
            {eachTransaction.transactionName}
          </TitleParagraph>
          <TransactionParagraphMobile 
          className="hidden"
          // className="flex text-[10px] mt-1 text-gray-400 font-bold w-20 md:hidden"
          >
            {dateTimeCustomFormate(eachTransaction.date)}
          </TransactionParagraphMobile>
        </TextContainer>
      </UserContainer>

      <CategoryParagraph
      className="w-[19vw]"
        isAdmin={isUserAdmin}
        // className="w-14 hidden md:block text-gray-700 font-inter text-base font-normal overflow-hidden"
      >
        {eachTransaction.category}
      </CategoryParagraph>

      <DateOfTransactionParagraph 
      className="w-[19vw]"
      // className="hidden md:block text-gray-700 w-[20vw] font-inter text-base font-normal overflow-hidden"
      >
        {dateTimeCustomFormate(eachTransaction.date)}
      </DateOfTransactionParagraph>

      {eachTransaction.type === "credit" ? (
        <CreditAmount
        // className="w-[20vw]"
          className="text-[#16dbaa] font-inter text-base font-medium text-left overflow-hidden"
          isAdmin={isUserAdmin}
        >
          +${eachTransaction.amount}
        </CreditAmount>
      ) : (
        <DebitAmount
        // className="w-[20vw]"
          className=" text-[#fe5c73] font-inter text-base font-medium text-left overflow-hidden"
          isAdmin={isUserAdmin}
        >
          -${eachTransaction.amount}
        </DebitAmount>
      )}
      <EditDeleteContainer
      className="flex ml-auto"
      //  className="mr-5 md:w-16" 
       isAdmin={isUserAdmin}>
        {!isUserAdmin && (
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
                <AddTransactionMainContainer className="fixed inset-0 w-screen h-screen flex flex-shrink-0 bg-[rgba(52,64,84,0.7)] bg-opacity-40 backdrop-blur-md">
                  <AddTransactionContainer className="w-[90vw] md:w-[42%] lg:w-[32%] flex-shrink-0 rounded-xl bg-white m-auto">
                    <AddTransactionTextContainer className="flex">
                      <HeadingTextContainer className="mt-8 ml-6 mb-5">
                        <AddTransactionHeading className="text-[20px] font-bold leading-28 text-[#333b69]">
                          {t("transactionInputs.updateTransaction")}
                        </AddTransactionHeading>
                        <AddTransactionParagraph className=" md:w-[289px] text-[#344054] font-normal text-[14px] leading-20 mt-2">
                          {t(
                            "transactionInputs.youcanupdateyourtransactionhere"
                          )}
                        </AddTransactionParagraph>
                      </HeadingTextContainer>
                      <AddTransactionCloseImage
                        className="w-[24px] h-[24px] mr-[10px] flex-shrink-0 ml-auto mt-[24px] md:mr-[24px] cursor-pointer"
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
                <LogoutContainer className="flex w-screen h-screen flex-shrink-0 bg-[rgba(52,64,84,0.7)] bg-opacity-40 backdrop-blur-md  pr-[1px]">
                  <DeleteTransaction id={eachTransaction.id!} close={close} />
                </LogoutContainer>
              )}
            </Popup>
          </>
        )}
      </EditDeleteContainer>
    </DashTransactionContainer>
{/*     
            <tr key={eachTransaction.id}>
              <td>{eachTransaction.date}</td>
              <td>{eachTransaction.category}</td>
              <td>{eachTransaction.date}</td>
              <td>{eachTransaction.category}</td>
            </tr> */}
              
          </>
        
                
                // <EachTransaction
                //   transactionsData={transactionsData}
                //   eachTransaction={eachTransaction}
                //   index={index}
                //   isUserAdmin={isUserAdmin}
                //   user={user}
                //   isThisLastThreeTransactions={false}
                // />
              );
            }
          )}
          </tbody>
     

          {transactionsData.length > 10 ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={transactionsData.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ""
          )}
        </>
      );
    }
    return (
      <NoTransactionsFountHeading className="m-auto min-h-[35vh] mt-[20%]">
        {t("common.noTransactionsFound")}
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer
      className="m-auto min-h-[35vh] mt-[20%]"
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

  if (selectOption !== "TRANSACTIONS") {
    onChangeSelectOption("TRANSACTIONS");
  }
  const jwtToken = setJwtToken();
  if (!jwtToken) {
    navigate("/login");
  }
  return (
    <TransactionHomePage className="w-full h-full bg-[#f5f7fa] flex overflow-hidden">
      <SideBar />
      <TransactionTotalBodyContainer className="bg-[#f5f7fa] flex flex-col w-[100%] overflow-hidden">
        <Header />
        <SelectFilterConditions className="mb-10 sm:w-full flex items-start gap-[24px] pl-[40px] bg-white">
          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("alltransactions");
              setCurrentPage(1);
            }}
          >
            <SelectAllOption
              className="font-inter text-base font-medium"
              transactionOption={filterOption === "alltransactions"}
            >
              {t("common.allTransactions")}
            </SelectAllOption>
            <SelectedContainer
              className="w-[139px] h-[3px] rounded-t-10"
              transactionOption={filterOption === "alltransactions"}
            ></SelectedContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("credit");
              setCurrentPage(1);
            }}
          >
            <SelectOption
              className="text-center font-inter font-medium text-base"
              transactionOption={filterOption === "credit"}
            >
              {t("common.credit")}
            </SelectOption>
            <SelectedCreditContainer
              className="w-[63px] h-[3px] flex-shrink-0 rounded-t-lg"
              transactionOption={filterOption === "credit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>

          <TransactionSelectFilter
            className="flex flex-col items-center gap-[8px] border-0 bg-transparent cursor-pointer"
            onClick={() => {
              onChangeFilter("debit");
              setCurrentPage(1);
            }}
          >
            <SelectOption
              className="text-center font-inter font-medium text-base"
              transactionOption={filterOption === "debit"}
            >
              {t("common.debit")}
            </SelectOption>
            <SelectedCreditContainer
              className="w-[63px] h-[3px] flex-shrink-0 rounded-t-lg"
              transactionOption={filterOption === "debit"}
            ></SelectedCreditContainer>
          </TransactionSelectFilter>
        </SelectFilterConditions>
        <TransactionBodyContainer className="w-full bg-[#f5f7fa] h-[80vh] overflow-auto overflow-x-hidden">
          <TransactionsContainer className="flex flex-col  ml-3 mr-3 mt-0 md:w-[94%] h-fit p-[12px] gap-[20px] items-start bg-white rounded-[25px] md:ml-[40px] md:mt-[32px] md:mr-[20px]">
            {renderLeaderboard()}
          </TransactionsContainer>
        </TransactionBodyContainer>
      </TransactionTotalBodyContainer>
    </TransactionHomePage>
  );
};






export default observer(EachTransaction);
