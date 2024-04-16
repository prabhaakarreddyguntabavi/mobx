import styled from "styled-components";

interface TextParagraphProps {
  isAdmin: boolean;
}

interface TextParagraphFilterProps {
  transactionOption: boolean;
}

export const TransactionHomePage = styled.div`
  width: 99vw;
  height: 98vh;
  background: #f5f7fa;
  display: flex;
`;

export const TransactionTotalBodyContainer = styled.div``;

export const TransactionBodyContainer = styled.div`
  width: 84vw;
  background: #f5f7fa;
  overflow: auto;
  height: 84vh;

  @media screen and (max-width: 1024px) {
    width: 92vw;
  }

  @media screen and (max-width: 768px) {
    width: 98vw;
    height: 80vh;
  }
`;

export const TransactionsContainer = styled.div`
  display: flex;
  width: 90%;
  min-height: 80vh;
  //   height: 210px;
  padding: 12px 25px 8px 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #fff;
  margin-left: 40px;
  margin-top: 32px;
  margin-bottom: 20px;
  min-height: fit-content;

  @media screen and (max-width: 1024px) {
    margin-left: 20px;
    padding: 0px 0px 0px 12px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    margin-left: 5px;
    padding: 0px;
    width: 98%;
  }
`;

export const HeadingDashTransactionContainer = styled.div`
  width: 100%;
  // height: 58px;
  flex-shrink: 0;
  border-bottom: 1px solid #e2e2e2;
  margin-left: 24px;
  margin-right: 25px;
  display: flex;
  // justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    margin-left: 0px;
    margin-right: 0px;
  }

  @media screen and (max-width: 768px) {
    width: 93vw;
    margin-left: 10px;
  }
`;

export const SelectFilterConditions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding-left: 40px;
  // margin-bottom: 32px;
  background: #fff;

  @media screen and (max-width: 1024px) {
    // width: 97%;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 32px;
    width: 97%;
    padding-left: 10px;
  }
`;

export const TransactionSelectFilter = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
`;

export const SelectAllOption = styled.div<TextParagraphFilterProps>`
  color: ${(props: any) => (props.transactionOption ? "#2d60ff" : "#718ebf")};
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SelectedContainer = styled.div<TextParagraphFilterProps>`
  width: 139px;
  height: 3px;
  border-radius: 10px 10px 0px 0px;
  background: ${(props: any) => (props.transactionOption ? "#2d60ff" : "#fff")};
`;

export const SelectOption = styled.div<TextParagraphFilterProps>`
  // width: 57px;
  color: ${(props: any) => (props.transactionOption ? "#2d60ff" : "#718ebf")};
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SelectedCreditContainer = styled.div<TextParagraphFilterProps>`
  width: 63px;
  height: 3px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: ${(props: any) => (props.transactionOption ? "#2d60ff" : "#fff")};
`;

export const TransactionName = styled.p<TextParagraphProps>`
  color: #343c6a;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: ${(props: any) => (props.isAdmin ? "15vw" : "20.5vw")};
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 23vw;
  }

  @media screen and (max-width: 768px) {
    width: ${(props: any) => (props.isAdmin ? "30.5vw" : "30vw")};
  }
`;

export const TransactionCategory = styled.p<TextParagraphProps>`
  color: #343c6a;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  // margin-left: 114px;
  width: ${(props: any) => (props.isAdmin ? "16vw" : "21vw")};

  @media screen and (max-width: 1024px) {
    width: 21vw;
  }

  @media screen and (max-width: 768px) {
    width: 25vw;
    margin-left: 12px;
  }
`;

export const TransactionDate = styled.p<TextParagraphProps>`
  color: #343c6a;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  // margin-left: 120px;
  width: ${(props: any) => (props.isAdmin ? "15vw" : "20.5vw")};

  @media screen and (max-width: 1024px) {
    width: 22vw;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TransactionAmount = styled.div<TextParagraphProps>`
  color: #343c6a;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  // margin-left: 195px;
  width: ${(props: any) => (props.isAdmin ? "10vw" : "15vw")};

  @media screen and (max-width: 768px) {
    width: 20vw;
  }
`;

export const LoadingContainer = styled.div`
  margin: auto;
  min-height: 35vh;
  margin-top: 20%;
`;

export const NoTransactionsFountHeading = styled.h1`
  margin: auto;
  min-height: 35vh;
  margin-top: 20%;
`;

export const TransactionUserName = styled.p`
  width: 20vw;
  color: #343c6a;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  // margin-right: 170px;

  @media screen and (max-width: 1024px) {
    width: 20vw;
    margin-left: 15px;
  }

  @media screen and (max-width: 768px) {
    width: 35vw;
    margin-left: 0px;
  }
`;
