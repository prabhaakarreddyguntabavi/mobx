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

export interface LabelColors {
  toDo: string;
  inProgress: string;
  inReview: string;
  done: string;
  reject: string;
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
