//@ts-nocheck
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiCircleChevDown } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";

import { buttonTypes } from "../../utils/buttonStyles";

import ButtonWrap from "../ButtonWrap";

import SideBar from "../SideBar";
import Header from "../Header";

import {
  ButtonStylesMainContainer,
  ButtonStylesBodyContainer,
  ButtonStylesBodyMainContainer,
  ButtonStylesBodySubContainer,
  ButtonStylesInputContainer,
  ButtonStylesLabel,
  ButtonStylesType,
  ButtonStylesOptions,
} from "./styledComponents";
import { observer } from "mobx-react";

import "../../tailwind.css";

const ButtonStyles = (): JSX.Element => {
  const { t } = useTranslation();

  const [buttonSize, updateButtonStyles] = useState<string>("small");
  const [buttonType, updateButtonType] = useState<string>("primary");
  const [isBisDisableButton, updateIsDisableButton] = useState<boolean>(false);
  const [isLoadingViewButton, updateIsLoadingViewButton] =
    useState<boolean>(false);

  return (
    <ButtonStylesMainContainer className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <ButtonStylesBodyMainContainer className=" bg-[#f5f7fa] flex flex-col lg:w-[83%] ">
        <Header />
        <ButtonStylesBodyContainer className=" h-[90vh] flex flex-row w-[90%] m-auto">
          <ButtonStylesBodySubContainer className="h-[94%] w-[94%] bg-white m-auto">
            <ButtonStylesInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <ButtonStylesLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Button Size
                {/* {t("transactionInputs.transactionType")}* */}
              </ButtonStylesLabel>
              <ButtonStylesType
                className="w-[80vw] md:w-[8vw] h-10 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
                required
                id="addTransctionType"
                value={buttonSize}
                onChange={(event) => updateButtonStyles(event.target.value)}
              >
                <ButtonStylesOptions value="small">Small</ButtonStylesOptions>
                <ButtonStylesOptions value="medium">Medium</ButtonStylesOptions>
                <ButtonStylesOptions value="large">Large</ButtonStylesOptions>
              </ButtonStylesType>
            </ButtonStylesInputContainer>
            <ButtonStylesInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <ButtonStylesLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Disable Button
                {/* {t("transactionInputs.transactionType")}* */}
              </ButtonStylesLabel>
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-600"
                checked={isBisDisableButton}
                onChange={() => updateIsDisableButton(!isBisDisableButton)}
              />
            </ButtonStylesInputContainer>
            <ButtonStylesInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <ButtonStylesLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Button Type
                {/* {t("transactionInputs.transactionType")}* */}
              </ButtonStylesLabel>
              <ButtonStylesType
                className="w-[80vw] md:w-[8vw] h-10 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
                required
                id="addTransctionType"
                value={buttonType}
                onChange={(event) => updateButtonType(event.target.value)}
              >
                <ButtonStylesOptions value="primary">
                  Primary
                </ButtonStylesOptions>
                <ButtonStylesOptions value="neutral">
                  Neutral
                </ButtonStylesOptions>
                <ButtonStylesOptions value="secondary">
                  Secondary
                </ButtonStylesOptions>
                <ButtonStylesOptions value="plain">Plain</ButtonStylesOptions>
                <ButtonStylesOptions value="plain2">
                  Plain 2
                </ButtonStylesOptions>
              </ButtonStylesType>
            </ButtonStylesInputContainer>
            <ButtonStylesInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <ButtonStylesLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Is Loading View
                {/* {t("transactionInputs.transactionType")}* */}
              </ButtonStylesLabel>
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-600"
                checked={isLoadingViewButton}
                onChange={() => updateIsLoadingViewButton(!isLoadingViewButton)}
              />
            </ButtonStylesInputContainer>
            <br />
            <ButtonWrap
              type={buttonTypes({ buttonType, buttonSize })}
              isButtonDisabled={isBisDisableButton}
              isLoading={isLoadingViewButton}
              leftIcon={IoAddCircleOutline}
              rightIcon={CiCircleChevDown}
            />
          </ButtonStylesBodySubContainer>
        </ButtonStylesBodyContainer>
      </ButtonStylesBodyMainContainer>
    </ButtonStylesMainContainer>
  );
};

export default observer(ButtonStyles);
