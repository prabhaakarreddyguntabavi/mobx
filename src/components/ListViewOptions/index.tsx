// @ts-nocheck

import { ListViewOptionsProps } from "../../types/inputStyles";

import { Button, Container } from "./styledComponents";

const ListViewOptions = (props: ListViewOptionsProps) => {
  const { dropdownOptions, updateStatus, eachDetails, labelColors } = props;

  return (
    <Container className="absolute z-[1] flex-shrink-0 bg-opacity-80 bg-white backdrop-blur-lg mt-3">
      <Container className="inline-flex w-[150px] p-2 flex-col items-start gap-2 rounded-[6px] border border-[#CBD5E1] bg-white ">
        {dropdownOptions.map((eachOption) => (
          <Container
            onClick={() => updateStatus(eachDetails.id, eachOption.value)}
            id={eachOption.value}
            className={`${
              eachOption.value === eachDetails.status && "bg-[#EFF6FF]"
            } w-[130px] rounded-lg flex items-center gap-2 py-[6px] pl-[6px] pr-[8px] hover:bg-[#EFF6FF]`}
          >
            <Container
              id={eachOption.value}
              className={`rounded-full ${
                labelColors[eachOption.value].color
              }  w-5 h-2 mr-2`}
            ></Container>
            <Button
              id={eachOption.value}
              className="flex w-[260px] flex-col items-start gap-1"
            >
              {eachOption.label}
            </Button>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default ListViewOptions;
