import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import ToggleButtonElement from "../ToggleButtonElement";
import CustomSelector from "../SelectElement";
import SearchInputElement from "../SearchInputElement";
import MultiSelectElement from "../MultiSelectElement";
import BadgeElement from "../BadgeElement";
import ButtonPopup from "../ButtonPopup";
import ListViewElement from "../ListViewElement";

import SideBar from "../SideBar";
import Header from "../Header";

import InputElementWrap from "../InputElementWrap";

import {
  InputElementMainContainer,
  InputElementBodyContainer,
  InputElementBodyMainContainer,
  InputElementBodySubContainer,
  InputElementContainer,
  CheckBoxInputContainer,
  CheckBoxLabel,
  CheckBoxInput,
  Container,
} from "./styledComponents";

const InputElement = () => {
  const { t } = useTranslation();

  const [isDisable, updateIsDisable] = useState<boolean>(false);
  const [helpText, updateHelpText] = useState<boolean>(false);

  return (
    <InputElementMainContainer className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <InputElementBodyMainContainer className=" bg-[#f5f7fa] flex flex-col lg:w-[83%] ">
        <Header />
        <InputElementBodyContainer className=" h-[90vh] flex flex-row w-[90%] m-auto">
          <InputElementBodySubContainer className="h-[94%] w-[94%] bg-white m-auto  pt-5 border flex flex-wrap overflow-auto">
            <Container className="border h-[180px] w-[40%] mt-10">
              <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                <CheckBoxLabel
                  className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                  htmlFor="addTransctionType"
                >
                  {t("elementsStyles.disableInput")}
                </CheckBoxLabel>
                <CheckBoxInput
                  type="checkbox"
                  className="h-5 w-5 text-blue-600"
                  checked={isDisable}
                  onChange={() => updateIsDisable(!isDisable)}
                />
              </CheckBoxInputContainer>

              <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
                <CheckBoxLabel
                  className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                  htmlFor="addTransctionType"
                >
                  {t("elementsStyles.showHelpText")}
                </CheckBoxLabel>
                <CheckBoxInput
                  type="checkbox"
                  className="h-5 w-5 text-blue-600"
                  checked={helpText}
                  onChange={() => updateHelpText(!helpText)}
                />
              </CheckBoxInputContainer>
              <InputElementContainer className="ml-10 mt-2">
                <InputElementWrap
                  leftIcon={MdOutlineEmail}
                  rightIcon={AiOutlineQuestionCircle}
                  label=""
                  helpText={helpText}
                  isDisable={isDisable}
                />
              </InputElementContainer>
            </Container>
            <Container className="border h-[180px] w-[50%] mt-10">
              <ToggleButtonElement />
            </Container>
            <Container className="border h-[350px] w-[40%]">
              <CustomSelector />
            </Container>
            <Container className="border h-[350px] w-[50%] ">
              <SearchInputElement />
            </Container>
            <Container className="border h-[450px] w-[40%]">
              <MultiSelectElement />
            </Container>
            <Container className="border h-[450px] w-[50%]">
              <BadgeElement />
            </Container>
            <Container className="border h-[100px] w-[100%]">
              <ButtonPopup />
            </Container>
            <Container className="border h-[450px] w-[100%]">
              <ListViewElement />
            </Container>
          </InputElementBodySubContainer>
        </InputElementBodyContainer>
      </InputElementBodyMainContainer>
    </InputElementMainContainer>
  );
};

export default InputElement;
