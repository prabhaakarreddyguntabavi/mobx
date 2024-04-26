import { PropsValues } from "../../types/inputStyles";
import { observer } from "mobx-react";
import { useState } from "react";
import ToggleButtonElement from "../ToggleButtonElement";

import {
  InputElementSubContainer,
  InputField,
  InputElementIconContainer,
  Paragraph,
  Label,
} from "./styledComponents";

const InputElementWrap = (props: PropsValues) => {
  const {
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    hideLabel,
    helpText,
    isDisable,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  if (isDisable && error) {
    setError(false);
  }

  const updateErrorMessage = () => {
    console.log(inputValue);
    if (inputValue === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <>
        <Label
          className={`${
            hideLabel ? "hidden" : "block"
          } text-[#334155] font-medium font-inter text-sm leading-5`}
          htmlFor="emailId"
        >
          Email Address
        </Label>

        <InputElementSubContainer className="relative flex w-64">
          {LeftIcon && (
            <InputElementIconContainer className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <LeftIcon className="h-6 w-6 text-gray-400" />
            </InputElementIconContainer>
          )}
          <InputField
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={updateErrorMessage}
            onFocus={() => setError(false)}
            className={`${error && "border-[#F87171] "} ${
              LeftIcon && "pl-10"
            }  ${
              RightIcon && "pr-10"
            }  text-Light-blue-gray-900 font-normal font-inter text-sm leading-5 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-[#2563EB] hover:border-[#94A3B8] disabled:text-[#94A3B8] disabled:bg-[#F1F5F9] disabled:border-[#CBD5E1]`}
            placeholder="Enter text"
            disabled={isDisable}
          />
          {RightIcon && (
            <InputElementIconContainer className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <RightIcon className="h-6 w-6 text-gray-400" />
            </InputElementIconContainer>
          )}
        </InputElementSubContainer>
        <Paragraph
          className={`${error ? "block" : "hidden"} ${
            isDisable && "hidden"
          } text-[#F87171] font-normal font-inter text-xs leading-4 mt-2`}
        >
          Please Enter
        </Paragraph>
        <Paragraph
          className={`${
            helpText ? "block" : "hidden"
          } text-[#334155] font-normal font-inter text-xs leading-4 mt-2`}
        >
          Help Test
        </Paragraph>
      </>
      <ToggleButtonElement />
    </>
  );
};

export default observer(InputElementWrap);
