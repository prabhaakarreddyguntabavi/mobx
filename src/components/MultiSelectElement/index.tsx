import { useState } from "react";
import { useTranslation } from "react-i18next";
import { options } from "../../constants/commonConstants";

import MultiSelectElementWrap from "../MultiSelectElementWrap";

import {
  CheckBoxInputContainer,
  CheckBoxLabel,
  CheckBoxInput,
} from "./styledComponents";

const MultiSelectElement = () => {
  const { t } = useTranslation();

  const [disable, updateDisable] = useState<boolean>(false);
  const [isError, updateIsError] = useState<boolean>(false);

  return (
    <>
      <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3 mt-10">
        <CheckBoxLabel
          className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
          htmlFor="addTransctionType"
        >
          {t("elementsStyles.disable")}
        </CheckBoxLabel>
        <CheckBoxInput
          type="checkbox"
          className="h-5 w-5 text-blue-600"
          checked={disable}
          onChange={() => updateDisable(!disable)}
        />
      </CheckBoxInputContainer>
      <CheckBoxInputContainer className="inline-flex flex-col items-start mx-6 mb-3 mt-10">
        <CheckBoxLabel
          className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
          htmlFor="addTransctionType"
        >
          {t("elementsStyles.isErrorMessage")}
        </CheckBoxLabel>
        <CheckBoxInput
          type="checkbox"
          className="h-5 w-5 text-blue-600"
          checked={isError}
          onChange={() => updateIsError(!isError)}
        />
      </CheckBoxInputContainer>
      <MultiSelectElementWrap
        options={options}
        label="Dropdown"
        disable={disable}
        isError={isError}
      />
    </>
  );
};

export default MultiSelectElement;
