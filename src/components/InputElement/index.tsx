import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";

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
} from "./styledComponents";

const InputElement = () => {
  const [isDisable, updateIsDisable] = useState<boolean>(false);
  const [hideLabel, updateHideLabel] = useState<boolean>(false);
  const [helpText, updateHelpText] = useState<boolean>(false);

  return (
    <InputElementMainContainer className="w-full h-full bg-[#f5f7fa] flex">
      <SideBar />
      <InputElementBodyMainContainer className=" bg-[#f5f7fa] flex flex-col lg:w-[83%] ">
        <Header />
        <InputElementBodyContainer className=" h-[90vh] flex flex-row w-[90%] m-auto">
          <InputElementBodySubContainer className="h-[94%] w-[94%] bg-white m-auto  pt-5">
            <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <CheckBoxLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Disable Input
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
                Hide Label
              </CheckBoxLabel>
              <CheckBoxInput
                type="checkbox"
                className="h-5 w-5 text-blue-600"
                checked={hideLabel}
                onChange={() => updateHideLabel(!hideLabel)}
              />
            </CheckBoxInputContainer>
            <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3">
              <CheckBoxLabel
                className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
                htmlFor="addTransctionType"
              >
                Show Help Text
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
                hideLabel={hideLabel}
                helpText={helpText}
                isDisable={isDisable}
              />
            </InputElementContainer>
          </InputElementBodySubContainer>
        </InputElementBodyContainer>
      </InputElementBodyMainContainer>
    </InputElementMainContainer>
  );
};

export default InputElement;
