import React from "react";
export interface ButtonSizePadding {
  small: string;
  medium: string;
  large: string;
}

export interface StylesProperties {
  buttonStyles: string;
  spinnerStyles: string;
}
export interface ButtonTypes {
  primary: StylesProperties;
  neutral: StylesProperties;
  secondary: StylesProperties;
  plain: StylesProperties;
  plain2: StylesProperties;
}

export interface PropsValueTypes {
  type: StylesProperties;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  isButtonDisabled: boolean;
  isLoading: boolean;
}

export interface SelectOptions {
  value: string;
  label: string;
}
