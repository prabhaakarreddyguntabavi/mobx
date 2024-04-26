//@ts-nocheck

import { ButtonSizePadding, ButtonTypes } from "../types/buttonStyles";

export const buttonTypes = (props: {
  buttonType: string;
  buttonSize: string;
}) => {
  const { buttonType, buttonSize } = props;

  const buttonSizePadding: ButtonSizePadding = {
    small: "py-2 px-4",
    medium: "py-3 px-6",
    large: "py-4 px-8",
  };

  const buttonStyles: ButtonTypes = {
    primary: {
      buttonStyles: `min-h-[40px] min-w-[150px] inline-flex ml-5 mt-5 justify-center items-center gap-[10px] rounded-md shadow-md text-white text-[18px] bg-blue-600 hover:bg-blue-700 focus:bg-blue-500 focus:outline-none focus:rounded-lg focus:items-start focus:border-[2px] focus:border-[#3B82F6] active:bg-blue-800 disabled:bg-gray-300 disabled:text-[#94A3B8] ${buttonSizePadding[buttonSize]}`,
      spinnerStyles: "#ffffff",
    },
    neutral: {
      buttonStyles: `min-h-[40px] min-w-[150px] inline-flex ml-5 mt-5  justify-center items-center gap-[10px] rounded-md border border-solid border[#CBD5E1] text-[18px] bg-white hover:bg-[#F1F5F9] hover:border-b[#CBD5E1] hover:shadow-sm focus:outline-none focus:ring-2 focus:bg-[#fff] focus:border-transparent active:bg-[#E2E8F0] opacity-50 disabled:bg-[#F8FAFC] disabled:text-[#CBD5E1] ${buttonSizePadding[buttonSize]}`,
      spinnerStyles: "#334155",
    },
    secondary: {
      buttonStyles: `min-h-[40px] min-w-[150px] inline-flex ml-5 mt-5 justify-center items-center gap-[10px] rounded-md bg-[#DBEAFE] text-[#2563EB] text-center text-[18px] font-inter text-base font-medium hover:bg-[#BFDBFE] focus:bg-[#DBEAFE] focus:outline-none focus:rounded-lg focus:items-start focus:border-[2px] focus:rounded-lg focus:border-[#3B82F6] active:bg-[#93C5FD] disabled:bg-[#CBD5E1] disabled:text-[#94A3B8] ${buttonSizePadding[buttonSize]}`,
      spinnerStyles: "#2563EB",
    },
    plain: {
      buttonStyles: `min-h-[40px] min-w-[150px] inline-flex ml-5 mt-5 justify-center items-center gap-[10px] rounded-lg text-[#2563EB] text-center font-inter font-medium text-[18px] leading-5 hover:underline hover:underline-offset-2 hover:text-[#1D4ED8] focus:outline-none focus:rounded-lg focus:underline-offset-2  focus:items-start focus:border-[2px] focus:border-[#3B82F6] focus:underline active:bg-[#EFF6FF]  active:underline-offset-2 active:text-[#1E40AF] active:underline disabled:text-[#94A3B8] ${buttonSizePadding[buttonSize]} `,
      spinnerStyles: "#2563EB",
    },
    plain2: {
      buttonStyles: `min-h-[40px] min-w-[150px] inline-flex ml-5 mt-5 justify-center items-center gap-[10px] rounded-lg text-[#EA580C] text-center font-inter font-medium text-[18px] leading-5 hover:text-[#C2410C] focus:text-[#C2410C] focus:outline-none active:text-[#9A3412] disabled:text-[#94A3B8] ${buttonSizePadding[buttonSize]} `,
      spinnerStyles: "#EA580C",
    },
  };

  return buttonStyles[buttonType];
};
