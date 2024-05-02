import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleElementWrap from "../ToggleElementWrap";
import {
  CheckBoxInputContainer,
  CheckBoxLabel,
  CheckBoxInput,
  ToggleButtonContainer,
  SelectType,
  SelectOptions,
} from "./styledComponents";

const ToggleButtonElement = () => {
  const { t } = useTranslation();

  const [disable, updateDisable] = useState<boolean>(false);
  const [withIcon, updateWithIcon] = useState<boolean>(false);
  const [type, updateType] = useState<string>("simple");

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
          {t("elementsStyles.withIcon")}
        </CheckBoxLabel>
        <CheckBoxInput
          type="checkbox"
          className="h-5 w-5 text-blue-600"
          checked={withIcon}
          onChange={() => updateWithIcon(!withIcon)}
        />
      </CheckBoxInputContainer>

      <ToggleButtonContainer className="inline-flex flex-col items-start mx-6 mb-3">
        <CheckBoxLabel
          className="text-[#505887] font-serif text-base not-italic font-normal leading-normal"
          htmlFor="addTransctionType"
        >
          {t("elementsStyles.toggleSize")}
        </CheckBoxLabel>
        <SelectType
          className="w-[80vw] md:w-[8vw] h-10 flex-shrink-0 rounded-lg border border-solid border-gray-300 bg-white pr-22 text-gray-700 font-inter text-base font-normal"
          required
          id="addTransctionType"
          value={type}
          onChange={(event: any) => updateType(event.target.value)}
        >
          <SelectOptions value="simple">
            {t("elementsStyles.simple")}
          </SelectOptions>
          <SelectOptions value="short">
            {t("elementsStyles.short")}
          </SelectOptions>
        </SelectType>
      </ToggleButtonContainer>
      <ToggleElementWrap
        disable={disable}
        withIcon={withIcon}
        type={type}
        label="Label"
      />
    </>
  );
};

export default observer(ToggleButtonElement);
