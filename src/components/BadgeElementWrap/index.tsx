import { BadgePropsValues } from "../../types/inputStyles";

import {
  SelectDropdownMainContainer,
  SelectDropdownSubContainer,
  Paragraph,
  Container,
} from "./styledComponents";

const BadgeElementWrap = (props: BadgePropsValues) => {
  const {
    typeClassName,
    label,
    isDot,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    dotColors,
  } = props;

  return (
    <SelectDropdownMainContainer className="ml-auto mr-auto ">
      <SelectDropdownSubContainer className={typeClassName}>
        {LeftIcon && <LeftIcon />}
        {isDot && !LeftIcon && (
          <Container
            className={`w-[8px] h-[8px] ${dotColors} rounded-full`}
          ></Container>
        )}
        <Paragraph className="flex font-italic text-[18px] font-normal">
          {label}
        </Paragraph>
        {RightIcon && <RightIcon />}
      </SelectDropdownSubContainer>
    </SelectDropdownMainContainer>
  );
};

export default BadgeElementWrap;
