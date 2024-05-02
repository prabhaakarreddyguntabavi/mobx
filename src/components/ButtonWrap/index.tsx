import { ButtonStyles } from "./styledComponents";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import { ButtonPropsValueTypes } from "../../types/buttonStyles";
import { observer } from "mobx-react";

const ButtonWrap = (props: ButtonPropsValueTypes) => {
  const {
    type,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    isButtonDisabled,
    isLoading,
  } = props;

  const { t } = useTranslation();

  return (
    <ButtonStyles
      type="button"
      className={type.buttonStyles}
      disabled={isButtonDisabled}
    >
      {isLoading ? (
        <ReactLoading
          type={"spin"}
          color={type.spinnerStyles}
          height={20}
          width={20}
        />
      ) : (
        <>
          {LeftIcon && <LeftIcon />}
          {t("elementsStyles.button")}
          {RightIcon && <RightIcon />}
        </>
      )}
    </ButtonStyles>
  );
};

export default observer(ButtonWrap);
