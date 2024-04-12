import { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import { observe } from "mobx";
import { observer } from "mobx-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { jwtToken, apiStatusConstants } from "../../constants/commonConstants";
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
  const transactionStore = useContext(TransactionContext);
  const { selectOption, onChangeSelectOption, userDict, userId } =
    transactionStore;

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
        <ProfileImageContainer>
          <ProfileImage>
            {data.name ? data.name[0].toUpperCase() : ""}
          </ProfileImage>
        </ProfileImageContainer>
        <DetailsContainer>
          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userFirstName">
              Your Name
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="userFirstName"
              value={data.name}
              placeholder="Your Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userName">
              User Name
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="userName"
              value={data.name}
              placeholder="User Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userEmail">Email</AddTransactionLabel>
            <AddTransactionNameInput
              type="email"
              id="userEmail"
              value={data.email}
              placeholder="Email"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userPassword">
              Password
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="password"
              id="userPassword"
              value={data.email}
              placeholder="Password"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userDateOfBirth">
              Date of Birth
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="date"
              id="userDateOfBirth"
              value={data.dateOfBirth}
              placeholder="Date of Birth"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userPresentAddress">
              Present Address
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="userPresentAddress"
              value={data.present_address}
              placeholder="Present Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userPermanentAddress">
              Permanent Address
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="userPermanentAddress"
              value={data.permanent_address}
              placeholder="Permanent Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userCity">City</AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="userCity"
              value={data.city}
              placeholder="City"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userPostalCode">
              Postal Code
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="number"
              id="userPostalCode"
              value={data.postal_code}
              placeholder="Postal Code"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="userCountry">
              Country
            </AddTransactionLabel>
            <AddTransactionNameInput
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
    <LoadingContainer
      className="products-loader-container"
      data-testid="loader"
    >
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
    <ProfileHomePage>
      <SideBar />
      <ProfileTotalBodyContainer>
        <Header />
        <ProfileDetailsContainer>
          <ProfileContainer>{renderLeaderboard()}</ProfileContainer>
        </ProfileDetailsContainer>
      </ProfileTotalBodyContainer>
    </ProfileHomePage>
  );
};

export default observer(ProfileDetails);
