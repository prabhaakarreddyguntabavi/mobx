import { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
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
import { observe } from "mobx";

interface apiStatusValues {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

interface ProfileDetailsValues {
  id?: number;
  name?: string;
  email?: string;
  country?: string;
  date_of_birth?: string;
  dateOfBirth?: string;
  city?: string;
  permanent_address?: string;
  postal_code?: string;
  present_address?: string;
  permanentAddress?: string;
  postalCode?: string;
  presentAddress?: string;
}

interface ApiOutputStatus {
  status: string;
  data: ProfileDetailsValues;
  errorMsg?: string;
}

const apiStatusConstants: apiStatusValues = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ProfileDetails = (): JSX.Element => {
  const transactionStore = useContext(TransactionContext);
  const { selectOption, onChangeSelectOption, userDict, userId } =
    transactionStore;

  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

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
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getLeaderboardData = async (): Promise<void> => {
        setApiResponse({
          status: apiStatusConstants.inProgress,
          data: {},
        });

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
            errorMsg: "",
          });
        }
      };

      getLeaderboardData();
    }
  }, [jwtToken, userId]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    if (data !== undefined) {
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
              <AddTransactionLabel htmlFor="userEmail">
                Email
              </AddTransactionLabel>
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
    }
    return <div>Loading...</div>;
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

export default ProfileDetails;
