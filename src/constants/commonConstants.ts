import { ApiStatus } from "../types/transactionsTypes";
import { SelectOptions } from "../types/buttonStyles";
import { LabelColors, DetailsView } from "../types/inputStyles";
import { FaRegSquareCheck } from "react-icons/fa6";

export const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export const options: SelectOptions[] = [
  { value: "copy", label: "Copy" },
  { value: "import", label: "Import" },
  { value: "export", label: "Export" },
  { value: "share", label: "Share" },
];

export const dropdownOptions: SelectOptions[] = [
  { label: "To Do", value: "toDo" },
  { label: "In Progress", value: "inProgress" },
  { label: "In Review", value: "inReview" },
  { label: "Done", value: "done" },
  { label: "Reject", value: "reject" },
];

export const labelColors: LabelColors = {
  toDo: { color: "bg-[#0284C7]", label: "To Do" },
  inProgress: { color: "bg-[#EA580C]", label: "In Progress" },
  inReview: { color: "bg-[#4F46E5]", label: "In Review" },
  done: { color: "bg-[#16A34A]", label: "Done" },
  reject: { color: "bg-[#D31350]", label: "Reject" },
};

export const detailsList: DetailsView[] = [
  {
    id: 1,
    icon: FaRegSquareCheck,
    name: "Google Ads Responsive Display",
    status: "done",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
  {
    id: 2,
    icon: FaRegSquareCheck,
    name: "Task Title_1",
    status: "toDo",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
  {
    id: 3,
    icon: FaRegSquareCheck,
    name: "Login with Mobile Number",
    status: "inProgress",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
  {
    id: 4,
    icon: FaRegSquareCheck,
    name: "Registration Website",
    status: "reject",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
  {
    id: 5,
    icon: FaRegSquareCheck,
    name: "Responsive Display banners for...",
    status: "inReview",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
  {
    id: 6,
    icon: FaRegSquareCheck,
    name: "Task Title_1",
    status: "done",
    dueDate: "2023-06-28T10:00:15+00:00",
  },
];
