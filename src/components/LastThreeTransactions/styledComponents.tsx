import styled from "styled-components";

export const TransactionsContainer = styled.div`
  display: flex;
  width: 90%;
  //   height: 210px;
  padding: 12px 25px 8px 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #fff;
  margin-left: 40px;
  // margin-top: 32px;

  @media screen and (max-width: 1024px) {
    width: 84vw;
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0px;
    width: 96vw;
    padding: 0px;
  }
`;

export const LoadingContainer = styled.div`
  margin: auto;
`;

export const NoTransactionsFountHeading = styled.h1`
  margin: auto;
`;

export const FailureContainer = styled.div``;
