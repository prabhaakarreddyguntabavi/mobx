import styled from "styled-components";

interface TextParagraphProps {
  selectOption: boolean;
}

export const SideBarMainContainer = styled.div``;
export const IconsImage = styled.img``;

export const TransactionIconsImage = styled.img``;

export const TextParagraph = styled.p<TextParagraphProps>`
  color: ${(props: any) =>
    props.selectOption ? "var(--Primary-3, #2d60ff)" : "#505887"};
`;

export const EachTextContainer = styled.div``;

export const TextContainer = styled.div``;

export const LogoImage = styled.img``;

export const SelectedContainer = styled.div<TextParagraphProps>`
  background-color: ${(props: any) =>
    props.selectOption ? "var(--Primary-3, #2d60ff)" : "#ffffff"};
`;

export const ProfileContainer = styled.div``;

export const ProfileImageContainer = styled.div``;

export const ProfileName = styled.h1``;

export const ProfileEmail = styled.p``;

export const ProfileTextContainer = styled.div``;

export const YesLogoutButton = styled.button``;

export const MobileSideBarClosing = styled.img``;

export const PopupClosingContainer = styled.div``;
