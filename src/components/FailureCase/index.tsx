import { observer } from "mobx-react";
import {
  OnFailureConrainer,
  OnFailureImage,
  OnFailureHeading,
  OnFailureParagraph,
  OnFailureRetryButton,
} from "./styledComponents";

const FailureCase = (): JSX.Element => {
  return (
    <OnFailureConrainer>
      <OnFailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
      />
      <OnFailureHeading>Oops! Something Went Wrong</OnFailureHeading>
      <OnFailureParagraph>
        We are having some trouble to complete your request.
        <br /> Please try again
      </OnFailureParagraph>
      <OnFailureRetryButton type="button">Retry</OnFailureRetryButton>
    </OnFailureConrainer>
  );
};

export default observer(FailureCase);
