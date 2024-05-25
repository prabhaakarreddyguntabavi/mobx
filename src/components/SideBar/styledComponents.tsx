import tw from "twin.macro";

import styled from "styled-components";

interface TextParagraphProps {
  selectOption: boolean;
}

export const SideBarMainContainer = styled.div`
  @media screen and (max-width: 1024px) {
    width: 7vw;
    height: 99vh;
    min-width: 0px;
  }
`;
export const IconsImage = styled.img``;

export const TransactionIconsImage = styled.img`
  width: 25px;
  height: 25px;
`;

export const TextParagraph = styled.p<TextParagraphProps>`
  ${(props) => (props.selectOption ? tw`text-[#2d60ff]` : tw`text-[#17232B]`)}
  @media screen and (max-width: 1024px) {
    display:none;
  }
`;

export const EachTextContainer = styled.div`
@media screen and (max-width: 1024px) {
  width:150%;
}
`;

export const TextContainer = styled.div`
@media screen and (min-width: 1024px) {
  width:230px;
}
width: 7vw;
`;

export const LogoImage = styled.img`
@media screen and (max-width: 1024px) {
  display:none;
}
`;

export const LogoImage1 = styled.img`
@media screen and (max-width: 1024px) {
  display:block;
}
// display:none;
`;

export const SelectedContainer = styled.div<TextParagraphProps>`
  // border-radius: 0px 10px 10px 0px;
  ${(props) => (props.selectOption ? tw`bg-[#2d60ff]` : tw`bg-[#ffffff]`)}
`;

export const ProfileContainer = styled.div``;

export const ProfileImageContainer = styled.div`
@media screen and (max-width: 1024px) {
  display:none;
}
`;

export const ProfileImageContainerMedium = styled.div`
@media screen and (max-width: 1024px) {
  display:flex;
}
display:none;
`;

export const ProfileName = styled.h1``;

export const ProfileEmail = styled.p``;

export const ProfileTextContainer = styled.div`
@media screen and (max-width: 1024px) {
  display:none;
}
`;

export const ProfileLogoutImage = styled.img`
@media screen and (max-width: 1024px) {
  display:none;
}
`;

export const LogoutButton = styled.button``;

export const LogoutContainer = styled.div``;

export const LogoutConformationContainer = styled.div``;

export const WarningImageContainer = styled.div``;

export const WarningImage = styled.img``;

export const TestContainer = styled.div``;

export const TextImageContainer = styled.div``;

export const HeaderTextImageContainer = styled.div``;

export const LogoutHeading = styled.h1``;

export const LogoutClosingImage = styled.img``;

export const LogoutParagraph = styled.p``;

export const LogoutButtonContainer = styled.div``;

export const CancelLogoutButton = styled.button``;

export const YesLogoutButton = styled.button``;
