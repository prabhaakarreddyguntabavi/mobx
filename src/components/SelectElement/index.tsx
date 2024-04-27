//@ts-nocheck

import { options } from "../../constants/commonConstants";

import SelectElementWrap from "../SelectElementWrap";

const CustomSelector = () => {
  return <SelectElementWrap options={options} label="Dropdown" />;
};

export default CustomSelector;
