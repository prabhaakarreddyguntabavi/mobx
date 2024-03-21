import { useContext, useState } from "react";
import Cookies from "js-cookie";

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

interface PropsValue {
  id: number;
  close: () => void;
}

const UpdateTransaction = (props: PropsValue): JSX.Element => {
  const { id, close }: PropsValue = props;

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
      updateErrorMessage(responseData.error);
    }
  };

  return (
    <LogoutConformationContainer>
      {errorMessage && <p>Something went wrong please try again later</p>}
      <TestContainer>
        <WarningImageContainer>
          <WarningImage
            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078759/danger_wb66ql.png"
            alt="delete"
          />
        </WarningImageContainer>
        <TextImageContainer>
          <HeaderTextImageContainer>
            <LogoutHeading>Are you sure you want to Delete?</LogoutHeading>
            <LogoutParagraph>
              This transaction will be deleted immediately. You can’t undo this
              action.
            </LogoutParagraph>
          </HeaderTextImageContainer>
        </TextImageContainer>
        <LogoutClosingImage
          onClick={() => close()}
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
          alt="close"
        />
      </TestContainer>
      <LogoutButtonContainer>
        <YesLogoutButton
          type="button"
          onClick={() => {
            getLeaderboardData();
          }}
        >
          Yes, Delete
        </YesLogoutButton>
        <CancelLogoutButton
          type="button"
          className="trigger-button"
          data-testid="close"
          onClick={() => close()}
        >
          Cancel
        </CancelLogoutButton>
      </LogoutButtonContainer>
    </LogoutConformationContainer>
  );
};

export default UpdateTransaction;
