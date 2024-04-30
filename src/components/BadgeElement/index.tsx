//@ts-nocheck

import { useState } from "react";
import BadgeElementWrap from "../BadgeElementWrap";
import { MdOutlineClose } from "react-icons/md";
import { FaCertificate } from "react-icons/fa6";

import {
  CheckBoxInputContainer,
  CheckBoxLabel,
  CheckBoxInput,
  SelectType,
  SelectOptions,
} from "./styledComponents";

interface SelectOptions {
  neutral: string;
  success: string;
  warning: string;
  information: string;
  critical: string;
}

const BadgeElement = () => {
  const [isDot, updateIsDot] = useState<boolean>(false);
  const [typeClassName, updateTypeClassName] = useState<string>("neutral");
  const [badgeStyle, updateBadgeStyle] = useState<string>("basicRound");

  const styleOfTheBadge = {
    basicRound: "py-[2px] px-[8px] rounded-[6px]",
    largeRound: "py-[4px] px-[12px] rounded-[6px]",
    basicCircle: "py-[2px] px-[8px] rounded-[16px]",
    largeCircle: "py-[4px] px-[12px] rounded-[16px]",
  };

  const badgeType: SelectOptions = {
    neutral: `inline-flex text-[#1E293B] bg-[#F1F5F9] gap-[4px] items-center  ${styleOfTheBadge[badgeStyle]}`,
    success: `inline-flex text-[#065F46] bg-[#D1FAE5] gap-[4px] items-center  ${styleOfTheBadge[badgeStyle]}`,
    warning: `inline-flex text-[#854D0E] bg-[#FEF9C3] gap-[4px] items-center  ${styleOfTheBadge[badgeStyle]}`,
    information: `inline-flex text-[#1E40AF] bg-[#DBEAFE] gap-[4px] items-center  ${styleOfTheBadge[badgeStyle]}`,
    critical: `inline-flex text-[#991B1B] bg-[#FEE2E2] gap-[4px] items-center  ${styleOfTheBadge[badgeStyle]}`,
  };

  const dotColors: SelectOptions = {
    neutral: `bg-[#1E293B]`,
    success: `bg-[#065F46]`,
    warning: `bg-[#854D0E]`,
    information: `bg-[#1E40AF]`,
    critical: `bg-[#991B1B]`,
  };

  return (
    <>
      <div>
        <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3 mt-10">
          <CheckBoxLabel
            className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
            htmlFor="addTransctionType"
          >
            Is Dot
          </CheckBoxLabel>
          <CheckBoxInput
            type="checkbox"
            className="h-5 w-5 text-blue-600"
            checked={isDot}
            onChange={() => updateIsDot(!isDot)}
          />
        </CheckBoxInputContainer>
        <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3 mt-10">
          <CheckBoxLabel
            className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
            htmlFor="addTransctionType"
          >
            Badge Type
          </CheckBoxLabel>
          <SelectType
            className="w-[80vw] md:w-[8vw] h-10 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
            required
            id="badgeType"
            value={typeClassName}
            onChange={(event: any) => updateTypeClassName(event.target.value)}
          >
            <SelectOptions value="neutral">Neutral</SelectOptions>
            <SelectOptions value="success">Success</SelectOptions>
            <SelectOptions value="warning">Warning</SelectOptions>
            <SelectOptions value="information">Information</SelectOptions>
            <SelectOptions value="critical">Critical</SelectOptions>
          </SelectType>
        </CheckBoxInputContainer>
        <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3 mt-3">
          <CheckBoxLabel
            className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
            htmlFor="addTransctionType"
          >
            Badge Border Styles
          </CheckBoxLabel>
          <SelectType
            className="w-[90vw] md:w-[10vw] h-10 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
            required
            id="badgeType"
            value={badgeStyle}
            onChange={(event: any) => updateBadgeStyle(event.target.value)}
          >
            <SelectOptions value="basicRound">Basic Round</SelectOptions>
            <SelectOptions value="largeRound">Large Round</SelectOptions>
            <SelectOptions value="basicCircle">Basic Circle</SelectOptions>
            <SelectOptions value="largeCircle">Large Circle</SelectOptions>
          </SelectType>
        </CheckBoxInputContainer>
      </div>

      <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 ml-10 mt-3">
        <BadgeElementWrap
          typeClassName={badgeType[typeClassName]}
          label="Badge"
          isDot={isDot}
          // leftIcon={FaCertificate}
          rightIcon={MdOutlineClose}
          dotColors={dotColors[typeClassName]}
        />
      </CheckBoxInputContainer>
    </>
  );
};

export default BadgeElement;
