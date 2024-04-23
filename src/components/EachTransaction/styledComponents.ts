import tw from "twin.macro";
import styled from "styled-components";

interface TextParagraphProps {
  isAdmin: boolean;
}

interface TextParagraphLengthProps {
  length: boolean;
}

export const DashTransactionContainer = styled.div<TextParagraphLengthProps>`
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

export const CategoryParagraph = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[22vw]` : tw`w-[20vw]`)}

  @media screen and (max-width: 768px) {
    ${(props) => (props.isAdmin ? tw`w-[28vw]` : tw`w-[20vw]`)}
  }
`;

export const DateOfTransactionParagraph = styled.p``;

export const EditImage = styled.img``;

export const DeleteImage = styled.img``;

export const CreditAmount = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[10vw]`)}

  @media screen and (max-width: 768px) {
    width: 20vw;
  }
`;

export const DebitAmount = styled.p<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`w-[15vw]` : tw`w-[10vw]`)}

  @media screen and (max-width: 768px) {
    width: 20vw;
  }
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

export const UserProfileDetails = styled.div``;

export const TitleUserParagraph = styled.p``;

export const AdminContainer = styled.div`
  // @media screen and (max-width: 768px) {
  //   width: 30vw;
  // }
`;

export const UserContainer = styled.div`
  // @media screen and (max-width: 768px) {
  //   width: 30vw;
  // }
`;

export const EditDeleteContainer = styled.div<TextParagraphProps>`
  ${(props) => (props.isAdmin ? tw`hidden` : tw`flex`)}

  @media screen and (max-width: 768px) {
    ${(props) => (props.isAdmin ? tw`hidden` : tw`flex`)}
  }
`;

export const TransactionParagraphMobile = styled.p``;

export const TextContainer = styled.div``;
