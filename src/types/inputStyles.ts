import { SelectOptions } from "../types/buttonStyles";

export interface PropsValues {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  label: string;
  helpText: boolean;
  isDisable: boolean;
}

export interface DetailsView {
  id: number;
  icon: React.ElementType;
  name: string;
  status: string;
  dueDate: string;
}

interface OptionDict {
  color: string;
  label: string;
}

export interface LabelColors {
  toDo: OptionDict;
  inProgress: OptionDict;
  inReview: OptionDict;
  done: OptionDict;
  reject: OptionDict;
}

export interface ListViewPropsValues {
  detailsList: DetailsView[];
}
export interface SelectOptionsDetails {
  neutral: string;
  success: string;
  warning: string;
  information: string;
  critical: string;
}

export interface BadgePropsValues {
  typeClassName: string;
  label: string;
  isDot: boolean;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  dotColors: string;
}

export interface ListViewEditProps {
  listDetails: DetailsView;
  updateEditDetails: (listDetails: DetailsView) => void;
  updateIsEditDetails: (id: number) => void;
}

export interface ListViewMoreOptionsProps {
  updateIsEditDetails: (id: number) => void;
  deleteListDetails: (id: number) => void;
  id: number;
}

export interface ListViewOptionsProps {
  dropdownOptions: SelectOptions[];
  updateStatus: () => void;
  eachDetails: DetailsView;
  labelColors: LabelColors;
}

export interface SearchInputElementWrapProps {
  options: SelectOptions[];
  label: string;
  disable: boolean;
  isError: boolean;
}
