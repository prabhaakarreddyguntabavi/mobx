import { ApiStatus } from "../types/transactionsTypes";
import { SelectOptions } from "../types/buttonStyles";

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
