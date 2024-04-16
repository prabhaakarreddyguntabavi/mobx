import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  OnFailureConrainer,
  OnFailureImage,
  OnFailureHeading,
  OnFailureParagraph,
  OnFailureRetryButton,
} from "./styledComponents";

const FailureCase = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <OnFailureConrainer>
      <OnFailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
      />
      <OnFailureHeading>{t("errorMessage.failureTitleText")}</OnFailureHeading>
      <OnFailureParagraph>
        {t("errorMessage.failureParagraph")}
        <br /> {t("errorMessage.pleaseTryAgainLater")}
      </OnFailureParagraph>
      <OnFailureRetryButton type="button">
        {t("errorMessage.retry")}
      </OnFailureRetryButton>
    </OnFailureConrainer>
  );
};

export default observer(FailureCase);
