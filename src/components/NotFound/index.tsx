import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundParagraph,
  BackToHomePage,
} from "./styledComponents";

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const onBackToHomePage = (): void => {
    navigate("/");
  };

  return (
    <NotFoundContainer className="flex flex-col justify-center items-center bg-white text-black mt-auto mb-auto h-screen">
      <NotFoundImage
        className="w-10"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <NotFoundHeading>{t("errorMessage.pageNotFound")}</NotFoundHeading>
      <NotFoundParagraph className="item-center ml-[10px] mr-[10px]">
        {t("errorMessage.pageNotFoundText")}
      </NotFoundParagraph>
      <BackToHomePage
        className="flex items-center justify-center gap-4 rounded-lg px-3 py-2 text-white text-center font-inter font-medium text-base cursor-pointer"
        type="button"
        onClick={onBackToHomePage}
      >
        {t("errorMessage.backToHomePage")}
      </BackToHomePage>
    </NotFoundContainer>
  );
};

export default observer(NotFound);
