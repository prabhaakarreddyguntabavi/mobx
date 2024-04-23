import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  LogoutConformationContainer,
  WarningImageContainer,
  WarningImage,
  TextImageContainer,
  HeaderTextImageContainer,
  LogoutHeading,
  LogoutClosingImage,
  LogoutParagraph,
  TestContainer,
  LogoutButtonContainer,
  CancelLogoutButton,
  YesLogoutButton,
} from "./styledComponents";
import TransactionContext from "../../context/TransactionContext";
import { observer } from "mobx-react";
import { DeleteTransactionPropsValue } from "../../types/transactionsTypes";

const UpdateTransaction = (props: DeleteTransactionPropsValue): JSX.Element => {
  const { id, close }: DeleteTransactionPropsValue = props;
  const { t } = useTranslation();
  const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userId } = transactionStore;

  const [errorMessage, updateErrorMessage] = useState<boolean>(false);

  const getLeaderboardData = async (): Promise<void> => {
    let headers: HeadersInit = {};
    let url: string = "";

    const body = JSON.stringify({
      id: id,
    });

    headers = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": userId.toString(),
    };
    url = "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";

    const options: RequestInit = {
      method: "DELETE",
      headers: headers,
      body: body,
    };
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      totalTransactionDetails.deleteTransaction(id);
      close();
    } else {
      updateErrorMessage(responseData.error!);
    }
  };

  return (
    <LogoutConformationContainer className="w-[95vw] md:w-[45vw] m-auto flex-shrink-0 rounded-xl bg-white shadow-lg">
      {errorMessage && (
        <p>{t("errorMessage.somethingwentwrongpleasetrygainlater")}</p>
      )}
      <TestContainer className="flex">
        <WarningImageContainer className="w-16 h-16 flex-shrink-0 bg-[#fef3c7] rounded-full mt-8 ml-5 mr-4 flex justify-center items-center">
          <WarningImage
            className="w-[32px] h-[32px] shrink-0 self-center"
            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078759/danger_wb66ql.png"
            alt="delete"
          />
        </WarningImageContainer>
        <TextImageContainer>
          <HeaderTextImageContainer>
            <LogoutHeading className="text-[#333b69] font-bold text-2xl mt-8 leading-7">
              {t("deleteTransactions.deletePopupText")}
            </LogoutHeading>
            <LogoutParagraph className="text-[#505887] font-normal text-base leading-5 mt-2">
              {t("deleteTransactions.deletePopupTextMessage")}
            </LogoutParagraph>
          </HeaderTextImageContainer>
        </TextImageContainer>
        <LogoutClosingImage
          className="w-6 h-6 mr-3 mt-2 my-2 cursor-pointer"
          onClick={close}
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
          alt="close"
        />
      </TestContainer>
      <LogoutButtonContainer className="flex">
        <YesLogoutButton
          className="flex w-28 h-10 justify-center items-center gap-4 rounded-md bg-red-600 mr-4 mt-8 mb-8 ml-32 text-white text-center font-medium text-sm leading-5"
          type="button"
          onClick={getLeaderboardData}
        >
          {t("deleteTransactions.yesDelete")}
        </YesLogoutButton>
        <CancelLogoutButton
          className="flex h-10 w-28 justify-center items-center gap-10 rounded-lg border border-gray-300 bg-white mt-8 text-blue-900 text-center font-medium text-sm leading-5 cursor-pointer"
          type="button"
          data-testid="close"
          onClick={close}
        >
          {t("common.cancel")}
        </CancelLogoutButton>
      </LogoutButtonContainer>
    </LogoutConformationContainer>
  );
};

export default observer(UpdateTransaction);
