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
    <OnFailureConrainer className="flex flex-col justify-center items-center mt-auto mb-auto">
      <OnFailureImage
        className="w-[50%] md:w-[30%]"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
      />
      <OnFailureHeading className="text-[20px]">
        {t("errorMessage.failureTitleText")}
      </OnFailureHeading>
      <OnFailureParagraph className="text-[15px] text-center">
        {t("errorMessage.failureParagraph")}
        <br /> {t("errorMessage.pleaseTryAgainLater")}
      </OnFailureParagraph>
      <OnFailureRetryButton
        className="flex px-3 py-2 justify-center items-center gap-4 rounded-lg bg-blue-600 text-white text-center font-inter font-medium text-lg cursor-pointer"
        type="button"
      >
        {t("errorMessage.retry")}
      </OnFailureRetryButton>
    </OnFailureConrainer>
  );
};

export default observer(FailureCase);
