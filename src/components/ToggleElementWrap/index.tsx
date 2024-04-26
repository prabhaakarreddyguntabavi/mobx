//@ts-nocheck

import { observer } from "mobx-react";
import { useState } from "react";

import {
  ToggleMainContainer,
  InputField,
  ToggleButtonContainer,
  Paragraph,
  Label,
  ImageElement,
} from "./styledComponents";

const ToggleElementWrap = (props: {
  disable: boolean;
  withIcon: boolean;
  type: string;
  label: string;
}) => {
  const { disable, withIcon, type, label } = props;

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleStyles = {
    simple: {
      containerStyles: `w-[52px] flex items-center rounded-full ${
        !isChecked
          ? `${
              disable
                ? "bg-[#F1F5F9]"
                : "bg-blue-500  hover:bg-[#1D4ED8] focus:rounded-lg p-[2px] focus:shadow-lg focus:border-2 focus:border-[#0b6ce4] focus:bg-white"
            }`
          : "bg-[#E2E8F0] hover:bg-[#CBD5E1]"
      }`,
      toggleStyles: `bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
        !isChecked && "translate-x-6"
      }`,
    },
    short: {
      containerStyles: `w-[44px] h-[18px] flex items-center rounded-full focus:rounded-lg focus:shadow-lg focus:border-2 focus:border-[#0b6ce4] focus:bg-white  ${
        !isChecked
          ? `${
              disable
                ? "bg-[#F1F5F9]"
                : "bg-blue-500  hover:bg-[#1D4ED8] focus:rounded-lg p-[2px] focus:shadow-lg focus:border-2 focus:border-[#0b6ce4] focus:bg-white"
            }`
          : "bg-[#E2E8F0] hover:bg-[#CBD5E1]"
      }`,
      toggleStyles: `bg-white w-6 h-6 rounded-full shadow-md transform transition-transform focus:border-2 focus:border-[#0b6ce4] focus:border-solid ${
        !isChecked && "translate-x-5"
      }`,
    },
  };

  return (
    <>
      <ToggleMainContainer className="flex items-center mt-10">
        <InputField
          type="checkbox"
          id="toggle"
          className="hidden"
          checked={isChecked}
          onChange={handleChange}
          disabled={disable}
        />
        <Label
          htmlFor="toggle"
          className={`cursor-pointer w-fit h-[34px] flex items-center focus:rounded-[24px] ${
            type === "simple" &&
            `${!disable && "focus:border-2 focus:border-[#0b6ce4]"}`
          }  focus:bg-white disabled:border-0`}
          tabIndex={0}
        >
          <ToggleButtonContainer className={toggleStyles[type].containerStyles}>
            <ToggleButtonContainer className={toggleStyles[type].toggleStyles}>
              {withIcon &&
                (isChecked ? (
                  <ImageElement
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                    alt="close"
                  />
                ) : (
                  <ImageElement
                    src="https://icon-library.com/images/correct-icon/correct-icon-12.jpg"
                    alt="close"
                  />
                ))}
            </ToggleButtonContainer>
          </ToggleButtonContainer>
        </Label>{" "}
        <Paragraph className={`ml-2 ${disable && "text-[#94A3B8]"}`}>
          {label}
        </Paragraph>
      </ToggleMainContainer>
    </>
  );
};

export default observer(ToggleElementWrap);
