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

export const TransactionsContainer = styled.table``;

export const HeadingDashTransactionContainer = styled.tr``;

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

export const TransactionName = styled.th<TextParagraphProps>`
  // ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[20.5vw]`)}

  // @media screen and (max-width: 768px) {
  //   ${(props) => (props.isAdmin ? tw`w-[30.5vw]` : tw`w-[35vw]`)}
  // }
`;

export const TransactionCategory = styled.th<TextParagraphProps>`
  // ${(props) => (props.isAdmin ? tw`w-[16vw]` : tw`w-[20vw]`)}
  // @media screen and (max-width: 768px) {
  //   width: 25vw;
  //   margin-left: 12px;
  // }
`;

export const TransactionDate = styled.th<TextParagraphProps>`

`;

export const TransactionAmount = styled.th<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-auto` : tw`w-[19vw]`)}
`;

export const LoadingContainer = styled.div``;

export const NoTransactionsFountHeading = styled.h1``;

export const TransactionUserName = styled.th`
  // @media screen and (max-width: 768px) {
  //   width: 35vw;
  //   margin-left: 0px;
  // }
`;

interface TextParagraphProps {
  isAdmin: boolean;
}

interface TextParagraphLengthProps {
  length: boolean;
}

export const DashTransactionContainer = styled.tr<TextParagraphLengthProps>`
  ${(props) => !props.length && tw`border-b border-gray-300`}
`;

export const CreditDebitImage = styled.img<TextParagraphProps>`
  ${(props) =>
    props.isAdmin ? tw`pr-[10px]` : tw`pr-[16px]`}// padding-right: ${(props) =>
    props.isAdmin ? "10px" : "16px"};
`;

export const TitleParagraph = styled.p`
  // @media screen and (max-width: 768px) {
  //   margin-bottom: 8px;
  //   overflow: hidden;
  //   height: 20px;
  // }
`;

export const CategoryParagraph = styled.td<TextParagraphProps>`

// ${(props) => (props.isAdmin ? tw`w-[20vw]` : tw`w-[19vw]`)}
//   @media screen and (max-width: 768px) {
//     width: 25vw;
//     margin-left: 12px;
//   }


  // ${(props) => (props.isAdmin ? tw`w-[22vw]` : tw`w-[20vw]`)}

  // @media screen and (max-width: 768px) {
  //   ${(props) => (props.isAdmin ? tw`w-[28vw]` : tw`w-[20vw]`)}
  // }
`;

export const DateOfTransactionParagraph = styled.td``;

export const EditImage = styled.img``;

export const DeleteImage = styled.img``;

export const CreditAmount = styled.td<TextParagraphProps>`
  // ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[10vw]`)}

  // @media screen and (max-width: 768px) {
  //   width: 20vw;
  // }
`;

export const DebitAmount = styled.td<TextParagraphProps>`
  // ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[10vw]`)}

  // @media screen and (max-width: 768px) {
  //   width: 20vw;
  // }
`;

export const AddTransactionContainer = styled.form``;

export const AddTransactionMainContainer = styled.div``;

export const AddTransactionTextContainer = styled.div``;

export const HeadingTextContainer = styled.div``;

export const AddTransactionHeading = styled.h1``;

export const AddTransactionParagraph = styled.p``;

export const AddTransactionCloseImage = styled.img``;

export const LogoutContainer = styled.div``;

export const AdminProfileContainer = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`block` : tw`hidden`)}
`;

export const UserProfileDetails = styled.td``;

export const TitleUserParagraph = styled.p``;

export const AdminContainer = styled.th`
  // @media screen and (max-width: 768px) {
  //   width: 30vw;
  // }
`;

export const UserContainer = styled.td<TextParagraphProps>`
// ${(props) => (props.isAdmin ? tw`w-[16vw]` : tw`w-[20.5vw]`)}

//   @media screen and (max-width: 768px) {
//     ${(props) => (props.isAdmin ? tw`w-[30.5vw]` : tw`w-[35vw]`)}
//   }
  // @media screen and (max-width: 768px) {
  //   width: 30vw;
  // }
`;

export const EditDeleteContainer = styled.td<TextParagraphProps>`
  // ${(props) => (props.isAdmin ? tw`hidden` : tw`flex`)}

  // @media screen and (max-width: 768px) {
  //   ${(props) => (props.isAdmin ? tw`hidden` : tw`flex`)}
  // }
`;

export const TransactionParagraphMobile = styled.p``;

export const TextContainer = styled.div``;
