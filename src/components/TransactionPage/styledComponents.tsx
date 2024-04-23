import tw from "twin.macro";
import styled from "styled-components";

interface TextParagraphProps {
  isAdmin: boolean;
}

interface TextParagraphFilterProps {
  transactionOption: boolean;
}

export const TransactionHomePage = styled.div``;

export const TransactionTotalBodyContainer = styled.div``;

export const TransactionBodyContainer = styled.div``;

export const TransactionsContainer = styled.div``;

export const HeadingDashTransactionContainer = styled.div``;

export const SelectFilterConditions = styled.div``;

export const TransactionSelectFilter = styled.button``;

export const SelectAllOption = styled.div<TextParagraphFilterProps>`
  ${(props) =>
    props.transactionOption ? tw`text-[#2d60ff]` : tw`text-[#718ebf]`}
`;

export const SelectedContainer = styled.div<TextParagraphFilterProps>`
  ${(props) => (props.transactionOption ? tw`bg-[#2d60ff]` : tw`bg-[#fff]`)}
`;

export const SelectOption = styled.div<TextParagraphFilterProps>`
  ${(props) =>
    props.transactionOption ? tw`text-[#2d60ff]` : tw`text-[#718ebf]`}
`;

export const SelectedCreditContainer = styled.div<TextParagraphFilterProps>`
  ${(props) => (props.transactionOption ? tw`bg-[#2d60ff]` : tw`bg-[#fff]`)}
`;

export const TransactionName = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[20.5vw]`)}

  @media screen and (max-width: 768px) {
    ${(props) => (props.isAdmin ? tw`w-[30.5vw]` : tw`w-[30vw]`)}
  }
`;

export const TransactionCategory = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[16vw]` : tw`w-[20vw]`)}
  @media screen and (max-width: 768px) {
    width: 25vw;
    margin-left: 12px;
  }
`;

export const TransactionDate = styled.p<TextParagraphProps>`
  ${(props) =>
    props.isAdmin
      ? tw`w-[15vw]`
      : tw`w-[20.5vw]`}// @media screen and (max-width: 1024px) {
  //   width: 22vw;
  // }
`;

export const TransactionAmount = styled.div<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[10vw]` : tw`w-[15vw]`)}
`;

export const LoadingContainer = styled.div``;

export const NoTransactionsFountHeading = styled.h1``;

export const TransactionUserName = styled.p`
  // @media screen and (max-width: 768px) {
  //   width: 35vw;
  //   margin-left: 0px;
  // }
`;
