import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundParagraph,
  BackToHomePage,
} from "./styledComponents";
import { observer } from "mobx-react";

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();
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
      <NotFoundHeading>{t("pageNotFound")}</NotFoundHeading>
      <NotFoundParagraph>{t("pageNotFoundText")}</NotFoundParagraph>
      <BackToHomePage type="button" onClick={onBackToHomePage}>
        {t("backToHomePage")}
      </BackToHomePage>
    </NotFoundContainer>
  );
};

export default observer(NotFound);
