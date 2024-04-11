import { NavigateFunction, useNavigate } from "react-router-dom";

import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundParagraph,
  BackToHomePage,
} from "./styledComponents";
import { observer } from "mobx-react";

const NotFound = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const onBackToHomePage = (): void => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <NotFoundImage
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <NotFoundHeading>Page Not Found</NotFoundHeading>
      <NotFoundParagraph>
        we're sorry, the page you requested could not be found
      </NotFoundParagraph>
      <BackToHomePage type="button" onClick={onBackToHomePage}>
        Back To HomePage
      </BackToHomePage>
    </NotFoundContainer>
  );
};

export default observer(NotFound);
