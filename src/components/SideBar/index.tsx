import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useEffect, useContext } from "react";

import { jwtToken } from "../../constants/commonConstants";
import TransactionContext from "../../context/TransactionContext";
import { userDetails } from "../../constants/loginConstants";

import { UserDetail as ProfileDetails } from "../../types/usersTypes";

import {
  SideBarMainContainer,
  LogoImage,
  TextContainer,
  EachTextContainer,
  IconsImage,
  TextParagraph,
  TransactionIconsImage,
  SelectedContainer,
  ProfileContainer,
  ProfileImageContainer,
  ProfileName,
  ProfileEmail,
  ProfileLogoutImage,
  ProfileTextContainer,
  LogoutButton,
  LogoutConformationContainer,
  LogoutContainer,
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
  ProfileImageContainerMedium,
} from "./styledComponents";

import "./index.css";
import { observer } from "mobx-react";

const SideBar = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    onChangeTransactionOption,
    userDict,
    userId,
    isUserAdmin,
  } = transactionStore;

  const navigate: NavigateFunction = useNavigate();
  // const [apiResponse, setApiResponse] = useState<ProfileDetails>({});

  let loginUser: ProfileDetails = {
    ...userDetails.find((eachUser) => eachUser.userId === userId),
    name: "",
  };

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      await userDict.fetchData();
      // setApiResponse(
      //   userDict.users.find((findUser) => findUser.id === userId)!
      // );
    };

    fetchProfileData();
  }, [jwtToken]);

  const onClickLogout = (): void => {
    Cookies.remove("jwt_token");
    navigate("/login");
    localStorage.clear();
  };

  if (!jwtToken) {
    navigate("/login");
  }

  return (
    <SideBarMainContainer>
      <LogoImage
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
        alt="website logo"
      />

      <TextContainer>
        <Link
          className="sidbar-content"
          to="/"
          onClick={() => {
            onChangeSelectOption("DASHBOARD");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer>
            <SelectedContainer selectOption={selectOption === "DASHBOARD"}>
              {}
            </SelectedContainer>
            <IconsImage
              src={
                selectOption === "DASHBOARD"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/home_2_1_xkaadl.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705730106/home_2_m9drn7.png"
              }
              alt="dashboard"
            />
            <TextParagraph selectOption={selectOption === "DASHBOARD"}>
              Dashboard
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/transaction"
          onClick={() => onChangeSelectOption("TRANSACTIONS")}
        >
          <EachTextContainer>
            <SelectedContainer
              selectOption={selectOption === "TRANSACTIONS"}
            ></SelectedContainer>
            <TransactionIconsImage
              src={
                selectOption === "TRANSACTIONS"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/transfer_1_1_hqx4fr.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912310/transfer_1_e0it36.png"
              }
              alt="transactions"
            />

            <TextParagraph selectOption={selectOption === "TRANSACTIONS"}>
              {isUserAdmin ? "All Transactions" : "Transactions"}
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/profile"
          onClick={() => {
            onChangeSelectOption("PROFILE");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer>
            <SelectedContainer
              selectOption={selectOption === "PROFILE"}
            ></SelectedContainer>
            <IconsImage
              src={
                selectOption === "PROFILE"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/user_3_1_1_h8fxdm.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912309/user_3_1_ikruwf.png"
              }
              alt="profile"
            />
            <TextParagraph selectOption={selectOption === "PROFILE"}>
              Profile
            </TextParagraph>
          </EachTextContainer>
        </Link>
      </TextContainer>
      <ProfileContainer>
        {loginUser.email !== undefined ? (
          <>
            <ProfileImageContainer>
              {loginUser.email[0].toUpperCase()}
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileName>{loginUser.email.split("@")[0]}</ProfileName>
              <ProfileEmail>{loginUser.email}</ProfileEmail>
            </ProfileTextContainer>
          </>
        ) : (
          <></>
        )}

        <Popup
          modal
          trigger={
            <LogoutButton type="button">
              {loginUser.email !== undefined ? (
                <ProfileImageContainerMedium>
                  {loginUser.email[0].toUpperCase()}
                </ProfileImageContainerMedium>
              ) : (
                ""
              )}

              <ProfileLogoutImage
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706074414/log-out-01_yllnww.png"
                alt="logout"
              />
            </LogoutButton>
          }
        >
          {/* @ts-ignore */}
          {(close) => (
            <LogoutContainer>
              <LogoutConformationContainer>
                <TestContainer>
                  <WarningImageContainer>
                    <WarningImage
                      src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706080360/log-out-01_1_wtsz63.png"
                      alt="logout"
                    />
                  </WarningImageContainer>
                  <TextImageContainer>
                    <HeaderTextImageContainer>
                      <LogoutHeading>
                        Are you sure you want to Logout?
                      </LogoutHeading>
                      <LogoutParagraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed
                      </LogoutParagraph>
                    </HeaderTextImageContainer>
                  </TextImageContainer>
                  <LogoutClosingImage
                    onClick={close}
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                    alt="close"
                  />
                </TestContainer>
                <LogoutButtonContainer>
                  <YesLogoutButton type="button" onClick={onClickLogout}>
                    Yes, Logout
                  </YesLogoutButton>
                  <CancelLogoutButton
                    type="button"
                    className="trigger-button"
                    data-testid="close"
                    onClick={close}
                  >
                    Cancel
                  </CancelLogoutButton>
                </LogoutButtonContainer>
              </LogoutConformationContainer>
            </LogoutContainer>
          )}
        </Popup>
      </ProfileContainer>
    </SideBarMainContainer>
  );
};

export default observer(SideBar);
