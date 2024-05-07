import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { observer } from "mobx-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { setJwtToken } from "../../utils/jwtToken";
import { apiStatusConstants } from "../../constants/commonConstants";
import TransactionContext from "../../context/TransactionContext";
import { ApiOutputStatus } from "../../types/usersTypes";

import SideBar from "../SideBar";
import Header from "../Header";
import FailureCase from "../FailureCase";

import {
  ProfileHomePage,
  ProfileTotalBodyContainer,
  LoadingContainer,
  ProfileDetailsContainer,
  ProfileContainer,
  ProfileImage,
  ProfileImageContainer,
  AddTransactionNameInput,
  AddTransactionLabel,
  AddTransactionInputContainer,
  DetailsContainer,
  FailureContainer,
} from "./styledComponents";

const ProfileDetails = (): JSX.Element => {
  const { t } = useTranslation();
  const transactionStore = useContext(TransactionContext);
  const { selectOption, onChangeSelectOption, userDict, userId } =
    transactionStore;
  const jwtToken = setJwtToken();
  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.initial,
    data: {},
  });

  observe(userDict.loginUser, (): void => {
    setApiResponse({
      status: apiStatusConstants.success,
      data: userDict.loginUser,
    });
  });

  useEffect((): void => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: {},
    });
    const getLeaderboardData = async (): Promise<void> => {
      try {
        await userDict.getUserId();
        await userDict.fetchData();
        userDict.loginUserDetails();
        setApiResponse({
          status: apiStatusConstants.success,
          data: userDict.loginUser,
        });
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: {},
        });
      }
    };

    getLeaderboardData();
  }, [jwtToken, userId]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;
    return (
      <>
        <ProfileImageContainer className="h-[100px] w-[100px] mt-[15px] md:h-[200px] md:w-[200px] bg-[#b8c1c9] bg-cover bg-center rounded-full flex items-center justify-center md:mt-[45px]">
          <ProfileImage className="text-[65px] rounded-full mx-auto text-center md:text-9xl">
            {data.name ? data.name[0].toUpperCase() : ""}
          </ProfileImage>
        </ProfileImageContainer>
        <DetailsContainer className="flex flex-wrap justify-center overflow-auto mt-12">
          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userFirstName"
            >
              {t("profile.yourName")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userFirstName"
              value={data.name}
              placeholder="Your Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userName"
            >
              {t("common.userName")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userName"
              value={data.name}
              placeholder="User Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userEmail"
            >
              {t("common.email")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="email"
              id="userEmail"
              value={data.email}
              placeholder="Email"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userPassword"
            >
              {t("common.password")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="password"
              id="userPassword"
              value={data.email}
              placeholder="Password"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userDateOfBirth"
            >
              {t("profile.dateOfBirth")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="date"
              id="userDateOfBirth"
              value={data.dateOfBirth}
              placeholder="Date of Birth"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userPresentAddress"
            >
              {t("profile.presentAddress")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userPresentAddress"
              value={data.present_address}
              placeholder="Present Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userPermanentAddress"
            >
              {t("profile.permanentAddress")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userPermanentAddress"
              value={data.permanent_address}
              placeholder="Permanent Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userCity"
            >
              {t("profile.city")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userCity"
              value={data.city}
              placeholder="City"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userPostalCode"
            >
              {t("profile.postalCode")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="number"
              id="userPostalCode"
              value={data.postal_code}
              placeholder="Postal Code"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer className="gap-[5px] inline-flex flex-col items-start md:gap-[11px] mx-[24px] mb-[20px]">
            <AddTransactionLabel
              className="text-[#505887 ] font-inter text-base font-normal"
              htmlFor="userCountry"
            >
              {t("profile.country")}
            </AddTransactionLabel>
            <AddTransactionNameInput
              className="w-[75vw] md:w-[27vw] h-[18px] border border-solid border-[#dfeaf2] rounded px-4 py-4 bg-white text-[#718ebf] font-inter text-base font-normal"
              type="text"
              id="userCountry"
              value={data.country}
              readOnly={true}
              placeholder="Country"
            />
          </AddTransactionInputContainer>
        </DetailsContainer>
      </>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer className="m-auto" data-testid="loader">
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const renderFailureView = (): JSX.Element => (
    <FailureContainer>
      <FailureCase />
    </FailureContainer>
  );

  const renderLeaderboard = (): JSX.Element | null => {
    const { status } = apiResponse;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  if (selectOption !== "PROFILE") {
    onChangeSelectOption("PROFILE");
  }

  if (!jwtToken) {
    navigate("/login");
  }

  return (
    <ProfileHomePage className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <ProfileTotalBodyContainer className="w-full h-[100vh]">
        <Header />
        <ProfileDetailsContainer className="bg-[#f5f7fa] pt-[32px] overflow-auto m-auto max-h-[90vh]">
          <ProfileContainer className="ml-2 md:h-full w-[94%] flex-shrink-0 rounded-lg bg-white md:ml-10 flex flex-col justify-center items-center overflow-auto">
            {renderLeaderboard()}
          </ProfileContainer>
        </ProfileDetailsContainer>
      </ProfileTotalBodyContainer>
    </ProfileHomePage>
  );
};

export default observer(ProfileDetails);
