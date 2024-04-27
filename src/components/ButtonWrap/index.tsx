import { ButtonStyles } from "./styledComponents";
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
          Button
          {RightIcon && <RightIcon />}
        </>
      )}
    </ButtonStyles>
  );
};

export default observer(ButtonWrap);
