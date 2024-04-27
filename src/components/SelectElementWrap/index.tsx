import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { SelectOptions } from "../../types/buttonStyles";

import {
  SelectDropdownMainContainer,
  SelectDropdownSubContainer,
  SelectDropdownOptionMainContainer,
  SelectDropdownOptionSubContainer,
  Paragraph,
} from "./styledComponents";

const SelectElementWrap = (props: {
  options: SelectOptions[];
  label: string;
}) => {
  const { options, label } = props;

  const [selectedOption, setSelectedOption] = useState<SelectOptions>(
    options[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: SelectOptions) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectDropdownMainContainer className="w-[200px] mt-10 flex flex-col justify-center ml-auto mr-auto">
      <Paragraph className="flex font-italic text-[18px] font-normal mb-2 text-[#334155]">
        {label}
      </Paragraph>
      <SelectDropdownSubContainer
        className="flex px-[7px] py-[10px] justify-between border border-[#CBD5E1] rounded-[8px] cursor-pointer hover:border-[#94A3B8] focus:border-[#2563EB] focus:drop-shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] focus:shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Paragraph className="flex font-italic text-[18px] font-normal text-[#64748B]">
          {selectedOption ? `${selectedOption.label}` : "Select an option"}
        </Paragraph>
        {isOpen ? (
          <FaChevronUp className="mt-[3px]" />
        ) : (
          <FaChevronDown className="mt-[3px]" />
        )}
      </SelectDropdownSubContainer>
      {isOpen && (
        <SelectDropdownOptionMainContainer className="flex flex-col items-start gap-[4px] w-[200px] p-[8px] rounded-[8px] border border-solid border-[#CBD5E1] bg-white shadow-[0px 4px 6px -1px]">
          {options.map((option) => (
            <SelectDropdownOptionSubContainer
              key={option.value}
              className={`flex w-[180px] pl-[6px] pr-[8px] pt-[6px] pb-[8px] ${
                selectedOption.value === option.value &&
                "bg-blue-200 rounded-[8px]"
              } hover:bg-blue-500 hover:text-white hover:rounded-[8px] cursor-pointer`}
              onClick={() => handleOptionClick(option)}
            >
              <Paragraph className="flex font-italic text-[18px] font-normal">
                {option.label}
              </Paragraph>
            </SelectDropdownOptionSubContainer>
          ))}
        </SelectDropdownOptionMainContainer>
      )}
    </SelectDropdownMainContainer>
  );
};

export default SelectElementWrap;
