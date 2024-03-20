import styled from "styled-components";

export const LogoutConformationContainer = styled.div`
  width: auto;
  // height: 26vh;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
  margin: auto;
  aline-self: center;

  /* Shadow / lg */
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: 95vw;
    // height: 36vh;
  }
`;

export const WarningImageContainer = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  background-color: #fef3c7;
  border-radius: 40px;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  aline-items: center;
  margin-top: 32px;
`;

export const WarningImage = styled.img`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  align-self: center;
  // margin-top: 17px;
  // margin-left: 20px;
`;

export const TestContainer = styled.div`
  display: flex;
`;

export const TextImageContainer = styled.div``;

export const HeaderTextImageContainer = styled.div``;

export const LogoutHeading = styled.h1`
  color: #333b69;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-top: 32px;
  line-height: 28px; /* 140% */
`;

export const LogoutClosingImage = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin: 10px 10px 10px auto;
  cursor: pointer;
`;

export const LogoutParagraph = styled.p`
  color: #505887;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

export const LogoutButtonContainer = styled.div`
  display: flex;
`;

export const CancelLogoutButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #fff;
  margin-top: 32px;
  color: #333b69;
  text-align: center;
  margin-bottom: 32px;

  /* text-sm / leading-5 / font-medium */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  cursor: pointer;
`;

export const YesLogoutButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #dc2626;
  border-width: 0px;
  margin-right: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
  margin-left: 112px;
  color: #fff;
  text-align: center;
  /* text-sm / leading-5 / font-medium */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  cursor: pointer;
`;
