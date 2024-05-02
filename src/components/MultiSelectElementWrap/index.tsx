import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import { SelectOptions } from "../../types/buttonStyles";
import { TiTick } from "react-icons/ti";

import {
  SelectDropdownMainContainer,
  SelectDropdownSubContainer,
  SelectDropdownOptionMainContainer,
  SelectDropdownOptionSubContainer,
  Paragraph,
  Container,
  InputElement,
  Button,
} from "./styledComponents";

const MultiSelectElementWrap = (props: {
  options: SelectOptions[];
  label: string;
  disable: boolean;
  isError: boolean;
}) => {
  const { options, label, disable, isError } = props;

  const { t } = useTranslation();

  const [selectedOptions, setSelectedOptions] = useState<SelectOptions[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>("");

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
    let allOptions = [...selectedOptions, option];
    if (selectedOptions.includes(option)) {
      allOptions = selectedOptions.filter(
        (eachOption) => eachOption.value !== option.value
      );
    }
    setSelectedOptions(allOptions);
    setSearchResult("");
  };

  const removeSelectOption = (option: SelectOptions) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter(
          (eachOption) => eachOption.value !== option.value
        )
      );
    }
  };

  const searchResultDict = options.filter((value) =>
    value.value!.startsWith(searchResult.toLocaleLowerCase())
  );

  return (
    <Container className="w-[200px] mt-10 flex flex-col justify-center ml-auto mr-auto gap-1">
      <Paragraph className="flex font-italic text-[18px] font-normal mb-2 text-[#334155]">
        {label}
      </Paragraph>
      <Container className="flex flex-wrap gap-2 w-[250px]">
        {selectedOptions.map((eachOption) => (
          <Button
            disabled={disable}
            onClick={() => removeSelectOption(eachOption)}
            className="flex bg-[#DBEAFE] rounded-[6px] py-[2px] px-[6px] items-center gap-1"
          >
            <Paragraph className="text-[#1E40AF] text-[12px]">
              {eachOption.label}
            </Paragraph>
            <IoIosClose color="#1E40AF" />
          </Button>
        ))}
      </Container>

      <SelectDropdownMainContainer className="w-[200px] flex flex-col justify-center ml-auto mr-auto ">
        <SelectDropdownSubContainer
          id="multiSelectElement"
          className={`relative flex w-64 `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <InputElement
            id="multiSelectInputElement"
            type="text"
            value={searchResult}
            placeholder="Select"
            className={`flex w-64 px-[7px] py-[10px] pr-8 justify-between border rounded-[8px] cursor-pointer ${
              isError && "border-[#DC2626] text-[#DC2626]"
            } hover:border-[#94A3B8] text-Light-blue-gray-900 font-normal font-inter text-sm leading-5 w-full border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-[#2563EB] active:border-[#2563EB] disabled:border-[#CBD5E1] disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]`}
            onChange={(event) => setSearchResult(event.target.value)}
            disabled={disable}
          />
          <Container
            id="multiSelectIconElement"
            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            {isOpen && !disable ? (
              <FaChevronUp
                className={`mt-auto mb-auto ${isError && "text-[#DC2626]"}  ${
                  disable && "text-[#94A3B8]"
                }`}
              />
            ) : (
              <FaChevronDown
                className={`mt-auto mb-auto  ${
                  disable ? "text-[#94A3B8]" : `${isError && "text-[#DC2626]"}`
                }`}
              />
            )}
          </Container>
        </SelectDropdownSubContainer>
        {isOpen && !disable && (
          <SelectDropdownOptionMainContainer
            id="dropdownOptions"
            className="flex flex-col z-[1] items-start gap-[4px] w-64 p-[8px] rounded-[8px] border border-solid border-[#CBD5E1] bg-white shadow-[0px 4px 6px -1px]"
          >
            {searchResultDict.map((option) => (
              <SelectDropdownOptionSubContainer
                id={option.value}
                onClick={() => {
                  handleOptionClick(option);
                }}
                key={option.value}
                className={`flex w-[240px] pl-[6px] pr-[8px] pt-[6px] pb-[8px] ${
                  selectedOptions.includes(option) &&
                  "bg-[#EFF6FF] rounded-[8px]"
                } hover:bg-[#EFF6FF] hover:rounded-[8px] cursor-pointer`}
              >
                <Paragraph
                  id={option.value}
                  className="flex font-italic text-[18px] font-normal"
                >
                  {option.label}
                </Paragraph>
                {selectedOptions.includes(option) && (
                  <TiTick
                    color="#2563EB"
                    className="ml-auto mt-auto mb-auto "
                  />
                )}
              </SelectDropdownOptionSubContainer>
            ))}
            {searchResultDict.length === 0 && (
              <Paragraph className="text-[#94A3B8]">
                {t("elementsStyles.noResultFound")}
              </Paragraph>
            )}
          </SelectDropdownOptionMainContainer>
        )}
        {isError && !disable && (
          <Paragraph className="text-[12px] mt-2 font-400 text-[#DC2626]">
            {t("elementsStyles.mandatoryFields")}
          </Paragraph>
        )}
      </SelectDropdownMainContainer>
    </Container>
  );
};

export default MultiSelectElementWrap;
