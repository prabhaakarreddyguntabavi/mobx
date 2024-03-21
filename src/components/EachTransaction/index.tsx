import Popup from "reactjs-popup";
import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";

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

interface DataValues {
  id?: number;
  transactionName?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  userId?: number;
  transaction_name?: string;
  user_id?: number;
  name?: string;
}

interface UserDetail {
  id?: number;
  name?: string;
  email?: string;
  country?: string | null;
  date_of_birth?: string | null;
  city?: string | null;
  permanent_address?: string | null;
  postal_code?: string | null;
  present_address?: string | null;
}
interface PropsValues {
  transactionsData: DataValues[];
  isUserAdmin: boolean;
  index: number;
  eachTransaction: DataValues;
  user: UserDetail;
  isThisLastThreeTransactions: boolean;
}

const EachTransaction = (props: PropsValues) => {
  const {
    transactionsData,
    isUserAdmin,
    index,
    eachTransaction,
    user,
    isThisLastThreeTransactions,
  } = props;

  const dateFormate = (date: string): string => {
    const inputDateString: string = date;
    const inputDate: Date = new Date(inputDateString);

    const day: number = inputDate.getDate();
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month: string = monthNames[inputDate.getMonth()];
    const hours: number = inputDate.getHours();
    const minutes: number = inputDate.getMinutes();
    const ampm: string = hours >= 12 ? "PM" : "AM";

    const formattedDate: string = `${day} ${month}, ${
      hours % 12
    }:${minutes} ${ampm}`;

    return formattedDate;
  };

  return (
    <DashTransactionContainer
      length={transactionsData.length - 1 === index}
      key={eachTransaction.id}
    >
      {isUserAdmin ? (
        <AdminContainer isAdmin={isUserAdmin}>
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

          <UserProfileDetails>
            <AdminProfileContainer isAdmin={isUserAdmin}>
              {user?.name !== undefined ? user.name[0].toUpperCase() : ""}
            </AdminProfileContainer>
            <TitleUserParagraph>
              {user !== undefined ? user.name : ""}
            </TitleUserParagraph>
          </UserProfileDetails>
        </AdminContainer>
      ) : (
        ""
      )}

      <UserContainer isAdmin={isUserAdmin}>
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

        <TextContainer>
          <TitleParagraph>{eachTransaction.transactionName}</TitleParagraph>
          <TransactionParagraphMobile>
            {dateFormate(eachTransaction.date)}
          </TransactionParagraphMobile>
        </TextContainer>
      </UserContainer>
      <CategoryParagraph isAdmin={isUserAdmin}>
        {eachTransaction.category}
      </CategoryParagraph>
      <DateOfTransactionParagraph>
        {dateFormate(eachTransaction.date)}
      </DateOfTransactionParagraph>

      {eachTransaction.type === "credit" ? (
        <CreditAmount isAdmin={isUserAdmin}>
          +${eachTransaction.amount}
        </CreditAmount>
      ) : (
        <DebitAmount isAdmin={isUserAdmin}>
          -${eachTransaction.amount}
        </DebitAmount>
      )}
      <EditDeleteContainer isAdmin={isUserAdmin}>
        {isUserAdmin ? (
          ""
        ) : (
          <>
            <Popup
              modal
              trigger={
                <EditImage
                  src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/pencil-02_lbbupq.png"
                  alt="edit"
                />
              }
            >
              {/* @ts-ignore */}
              {(close) => (
                <AddTransactionMainContainer>
                  <AddTransactionContainer>
                    <AddTransactionTextContainer>
                      <HeadingTextContainer>
                        <AddTransactionHeading>
                          Update Transaction
                        </AddTransactionHeading>
                        <AddTransactionParagraph>
                          You can update your transaction here
                        </AddTransactionParagraph>
                      </HeadingTextContainer>
                      <AddTransactionCloseImage
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
                  src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/trash-01_uaykhq.png"
                  alt="delete"
                />
              }
            >
              {/* @ts-ignore */}
              {(close) => (
                <LogoutContainer>
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

export default EachTransaction;
