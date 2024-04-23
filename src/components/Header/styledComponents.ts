import tw from "twin.macro";
import styled from "styled-components";

export const HeaderMainContainer = styled.div``;

export const AddTransactionButton = styled.button`
  ${(props) => (props.disabled ? tw`bg-[#dddddd]` : tw`bg-[#2d60ff]`)}

  &:focus {
    outline: none; /* Remove the default focus outline */
    border-color: transparent; /* Set border color to transparent */
  }
`;

export const ButtonImage = styled.img``;

export const HeaderPrargraphText = styled.p``;

export const AddTransctionMainContainer = styled.div``;

export const AddTransctionContainer = styled.form``;

export const AddTransctionButton = styled.button``;

export const AddTransctionTextContainer = styled.div``;

export const HeadingTextContainer = styled.div``;

export const AddTransctionHeading = styled.h1``;

export const AddTransctionParagraph = styled.p``;

export const AddTransctionCloseImage = styled.img``;

export const AddTransctionInputContainer = styled.div``;

export const AddTransctionLabel = styled.label``;

export const AddTransctionNameInput = styled.input``;

export const SelectTransctionType = styled.select``;

export const SelectTransctionOptions = styled.option``;

export const MobileLogoImage = styled.img``;

export const MobileHeaderProfile = styled.div``;

export const MobilePopupContainer = styled.div``;

export const MobileParagraph = styled.p``;

export const MobileAddTransactions = styled.button``;

export const ErrorMessageParagraph = styled.div``;

export const ErrorMessage = styled.p``;

export const NotificationMessage = styled.p``;

export const PopupContainer = styled.div``;

export const LanguageContainer = styled.div``;

export const LanguageSelectorContainer = styled.select``;

export const DropdownOptions = styled.option``;
