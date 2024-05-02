import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { SelectOptions } from "../../types/buttonStyles";
import { TiTick } from "react-icons/ti";

import {
  SelectDropdownMainContainer,
  SelectDropdownSubContainer,
  SelectDropdownOptionMainContainer,
  SelectDropdownOptionSubContainer,
  Paragraph,
  Container,
} from "./styledComponents";

const SelectElementWrap = (props: {
  options: SelectOptions[];
  label: string;
  disable: boolean;
  isError: boolean;
}) => {
  const { options, label, disable, isError } = props;

  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<SelectOptions>(
    options[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleMouseDown = (event: any) => {
      if (event.target.id === "") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleOptionClick = (option: SelectOptions) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Container className="w-[200px] mt-10 flex flex-col justify-center ml-auto mr-auto">
      <Paragraph className="flex font-italic text-[18px] font-normal mb-2 text-[#334155]">
        {label}
      </Paragraph>

      <SelectDropdownMainContainer className="w-[200px] flex flex-col justify-center ml-auto mr-auto ">
        <SelectDropdownSubContainer
          id="dropdownButton"
          className={`w-[200px] flex px-[7px] py-[10px] justify-between border font-italic text-[18px] font-normal ${
            disable
              ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8]"
              : "text-[#0F172A]"
          } ${
            isError && "border-[#DC2626] text-[#DC2626]"
          } rounded-[8px] cursor-pointer hover:border-[#94A3B8] focus:border-[#2563EB] focus:border-solid focus:drop-shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] focus:shadow`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? `${selectedOption.label}` : "Select an option"}
          {isOpen && !disable ? (
            <FaChevronUp className="mt-auto mb-auto" />
          ) : (
            <FaChevronDown className="mt-auto mb-auto" />
          )}
        </SelectDropdownSubContainer>
        {isOpen && !disable && (
          <SelectDropdownOptionMainContainer
            id="dropdownOptions"
            className="flex flex-col z-[1] items-start gap-[4px] w-[200px] p-[8px] rounded-[8px] border border-solid border-[#CBD5E1] bg-white shadow-[0px 4px 6px -1px]"
          >
            {options.map((option) => (
              <SelectDropdownOptionSubContainer
                id={option.value}
                onClick={() => {
                  handleOptionClick(option);
                }}
                key={option.value}
                className={`flex w-[180px] pl-[6px] pr-[8px] pt-[6px] pb-[8px] ${
                  selectedOption.value === option.value &&
                  "bg-[#EFF6FF] rounded-[8px]"
                } hover:bg-[#EFF6FF] hover:rounded-[8px] cursor-pointer`}
              >
                <Paragraph
                  id={option.value}
                  className="flex font-italic text-[18px] font-normal"
                >
                  {option.label}
                </Paragraph>
                {selectedOption.value === option.value && (
                  <TiTick
                    color="#2563EB"
                    className="ml-auto mt-auto mb-auto "
                  />
                )}
              </SelectDropdownOptionSubContainer>
            ))}
          </SelectDropdownOptionMainContainer>
        )}
        {isError && (
          <Paragraph className="text-[12px] mt-2 font-400 text-[#DC2626]">
            {t("elementsStyles.mandatoryFields")}
          </Paragraph>
        )}
      </SelectDropdownMainContainer>
    </Container>
  );
};

export default SelectElementWrap;
