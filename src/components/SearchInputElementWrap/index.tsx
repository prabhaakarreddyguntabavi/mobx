//@ts-nocheck
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select, { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";

import { SelectOptions } from "../../types/buttonStyles";
import { TiTick } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";

import { SearchInputElementWrapProps } from "../../types/inputStyles";

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

const SearchInputElementWrap = (props: SearchInputElementWrapProps) => {
  const { options, label, disable, isError } = props;

  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<SelectOptions>({
    label: "",
    value: "",
  });
  const [allOption, setAllOption] = useState<SelectOptions[]>(options);

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
    setSelectedOption(option);
    setSearchResult(option.label!);
    setIsOpen(false);
  };

  const searchResultOptions = allOption.filter(
    (eachOption) =>
      eachOption.label!.toLowerCase() === searchResult.toLowerCase()
  );

  const addOption = () => {
    const newOption: SelectOptions = {
      label: searchResult,
      value: searchResult.replace(" ", "").toLocaleLowerCase(),
    };

    setAllOption([...allOption, newOption]);
    setSelectedOption(newOption);
  };

  const searchResultDict = allOption.filter((value) =>
    value.value!.startsWith(searchResult.toLocaleLowerCase())
  );

  const ReactSelectAddOption = (options: any) => {
    console.log(options);
    if (allOption.includes(options)) {
      return;
    } else {
      setAllOption([...allOption, options]);
    }
    setSelectedOption(options);
  };

  const reactSelectStyles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "blue" : "#CBD5E1",
      marginBottom: "20px",
      padding: "3px 4px",
      width: "260px",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#EFF6FF" : "white",
        padding: "5px",
        margin: "1px",
        borderRadius: "10px",
        color: "black",
        width: "95%",
        marginLeft: "5px",
        ":hover": {
          // ...styles[":active"],
          backgroundColor: "#EFF6FF",
          color: "black",
        },
      };
    },
  };

  return (
    <Container className="w-[200px] mt-10 flex flex-col justify-center ml-auto mr-auto">
      <Paragraph className="flex font-italic text-[18px] font-normal mb-2 text-[#334155]">
        {label}
      </Paragraph>
      <SelectDropdownMainContainer className="w-[200px] flex flex-col justify-center ml-auto mr-auto ">
        <SelectDropdownSubContainer
          id="searchElementContainer"
          className="relative flex w-64"
          onClick={() => setIsOpen(!isOpen)}
        >
          <InputElement
            id="searchInputElement"
            type="text"
            value={searchResult}
            placeholder="Select"
            className={`relative flex w-64 px-[7px] py-[10px] pr-8 justify-between border ${
              isError && "border-[#DC2626] text-[#DC2626]"
            } rounded-[8px] cursor-pointer hover:border-[#94A3B8] focus:border-[#2563EB] focus:border-solid focus:drop-shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] focus:shadow disabled:border-[#CBD5E1] disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]`}
            onChange={(event) => {
              setSearchResult(event.target.value);
              setIsOpen(true);
            }}
            disabled={disable}
          />
          <Container
            id="searchInputIconElement"
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
            className="flex flex-col z-[1] max-h-[20vh] overflow-y-scroll items-start gap-[4px] w-64 p-[8px] rounded-[8px] border border-solid border-[#CBD5E1] bg-white shadow-[0px 4px 6px -1px]"
          >
            {searchResultDict.map((option) => (
              <SelectDropdownOptionSubContainer
                id={option.value}
                onClick={() => {
                  handleOptionClick(option);
                }}
                key={option.value}
                className={`flex w-[220px] pl-[6px] pr-[8px] pt-[6px] pb-[8px] ${
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
            {searchResultDict.length === 0 && (
              <Paragraph className="text-[#94A3B8]">
                {t("elementsStyles.noResultFound")}
              </Paragraph>
            )}

            {searchResultOptions.length === 0 && searchResult !== "" && (
              <>
                <hr className="border self-stretch" />
                <Container id="1">
                  <Button
                    id="2"
                    className="text-[#64748B]  overflow-hidden  max-w-[200px] flex items-center "
                    onClick={() => addOption()}
                  >
                    {t("elementsStyles.createNew")}{" "}
                    <Container
                      id="3"
                      className="flex border border-[#2563EB] text-[#2563EB] items-center gap-1 py-1 px-2 ml-1 rounded-[6px]"
                    >
                      <Paragraph
                        id="4"
                        className=" max-w-[60px] overflow-hidden"
                      >
                        {searchResult}
                      </Paragraph>
                      <FaPlus id="5" />
                    </Container>
                  </Button>
                </Container>
              </>
            )}
          </SelectDropdownOptionMainContainer>
        )}
        {isError && !disable && (
          <Paragraph className="text-[12px] mt-2 font-400 text-[#DC2626]">
            {t("elementsStyles.mandatoryFields")}
          </Paragraph>
        )}
      </SelectDropdownMainContainer>
      <div className="mt-[20px] w-[13.5vw]">
        <CreatableSelect
          options={allOption}
          isDisabled={disable}
          placeholder="Select Option"
          styles={reactSelectStyles}
          onChange={ReactSelectAddOption}
        />
      </div>
    </Container>
  );
};

export default SearchInputElementWrap;
