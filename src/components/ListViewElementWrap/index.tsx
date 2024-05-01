//@ts-nocheck

import { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CiUser } from "react-icons/ci";

import { Button, Container, Paragraph } from "./styledComponents";

interface DetailsView {
  id: number;
  icon: React.ElementType;
  name: string;
  status: string;
  dueDate: string;
}

interface LabelColors {
  toDo: string;
  inProgress: string;
  inReview: string;
  done: string;
  reject: string;
}

interface PropsValues {
  detailsList: DetailsView[];
}

const dropdownOptions = [
  { label: "To Do", value: "toDo" },
  { label: "In Progress", value: "inProgress" },
  { label: "In Review", value: "inReview" },
  { label: "Done", value: "done" },
  { label: "Reject", value: "reject" },
];

const labelColors: LabelColors = {
  toDo: { color: "bg-[#444FD0]", label: "To Do" },
  inProgress: { color: "bg-[#CAD044]", label: "In Progress" },
  inReview: { color: "bg-[#9944D0]", label: "In Review" },
  done: { color: "bg-[#7FFF00]", label: "Done" },
  reject: { color: "bg-[#D31350]", label: "Reject" },
};

const ListViewElementWrap = (props: PropsValues) => {
  const { detailsList } = props;

  const [listDict, updateListDict] = useState<DetailsView[]>(detailsList);
  const [option, updateOption] = useState<number>(0);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        updateOption(0);
      }
    };

    const handleMouseDown = (event: any) => {
      if (event.target.id === "") {
        updateOption(0);
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const updateStatus = (id: number, statusOption: string) => {
    const updateDetails: DetailsView[] = listDict.map((eachOption) => {
      if (eachOption.id === id) {
        return { ...eachOption, status: statusOption };
      }
      return eachOption;
    });
    updateListDict(updateDetails);
    updateOption(0);
  };

  return (
    <div className="w-full min-h-full bg-[#F1F5F9] p-[50px]">
      {listDict.map((eachDetails) => (
        <div className="bg-white h-[48px] flex items-center flex-shrink-0 pl-5 pr-5 rounded-[12px] mb-1">
          <eachDetails.icon />
          <p className="ml-[20px] text-[#334155] text-[14px] leading-5 not-italic">
            {eachDetails.name}
          </p>

          <div className="relative ml-[100px]">
            <div
              onClick={() => updateOption(eachDetails.id)}
              className="flex items-center w-[150px] cursor-pointer"
            >
              <div
                className={`rounded-full  ${
                  labelColors[eachDetails.status].color
                } w-2 h-2 mr-2`}
              ></div>
              <p className=" text-[#334155] text-[14px] leading-5 not-italic">
                {labelColors[eachDetails.status].label}
              </p>
              <IoIosArrowDown className="ml-auto" />
            </div>
            {option === eachDetails.id && (
              <div className="absolute z-10 flex-shrink-0 bg-opacity-80 bg-white backdrop-blur-lg">
                <Container className="inline-flex w-[150px] p-2 flex-col items-start gap-2 rounded-[6px] border border-[#CBD5E1] bg-white ">
                  {dropdownOptions.map((eachOption) => (
                    <Container
                      onClick={() =>
                        updateStatus(eachDetails.id, eachOption.value)
                      }
                      id={eachOption.value}
                      className=" w-[140px] flex items-center gap-2 py-[6px] pl-[6px] pr-[8px] hover:bg-slate-500"
                    >
                      <div
                        id={eachOption.value}
                        className={`rounded-full ${
                          labelColors[eachOption.value].color
                        }  w-5 h-2 mr-2`}
                      ></div>
                      <Button
                        id={eachOption.value}
                        className="flex w-[260px] flex-col items-start gap-1"
                      >
                        {eachOption.label}
                      </Button>
                    </Container>
                  ))}
                </Container>
              </div>
            )}
          </div>

          <div className="ml-[100px] gap-1 flex items-center text-[#64748B] text-[14px] leading-5 not-italic">
            <MdOutlineTimer className="w-4 h-4" />
            <p>{eachDetails.dueDate}</p>
          </div>
          <BsThreeDots className="ml-auto" />
        </div>
      ))}
    </div>
  );
};

export default ListViewElementWrap;
