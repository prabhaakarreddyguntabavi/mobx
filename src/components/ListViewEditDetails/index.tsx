import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DetailsView } from "../../types/inputStyles";
import { setTimeFormate } from "../../utils/dateTimeFormate";
import { MdClose } from "react-icons/md";

import {
  Container,
  Label,
  InputElement,
  SelectElement,
  SelectOption,
  Button,
  Heading,
  FormContainer,
} from "./styledComponents";

interface ListViewEditProps {
  listDetails: DetailsView;
  updateEditDetails: (listDetails: DetailsView) => void;
  updateIsEditDetails: (id: number) => void;
}

const ListViewEditDetails = (props: ListViewEditProps) => {
  const { updateEditDetails, listDetails, updateIsEditDetails } = props;

  const { t } = useTranslation();

  const [name, updateName] = useState<string>(listDetails.name);
  const [status, updateStatus] = useState<string>(listDetails.status);
  const [date, updateDate] = useState<string>(listDetails.dueDate);

  const dropdownOptions = [
    { label: "To Do", value: "toDo" },
    { label: "In Progress", value: "inProgress" },
    { label: "In Review", value: "inReview" },
    { label: "Done", value: "done" },
    { label: "Reject", value: "reject" },
  ];

  const updateListDetails = () => {
    const listDetail = {
      id: listDetails.id,
      icon: listDetails.icon,
      name: name,
      status: status,
      dueDate: date,
    };
    updateEditDetails(listDetail);
  };

  return (
    <Container
      id="editDetailsContainer"
      className="flex w-[100%] h-[100%] flex-shrink-0 bg-opacity-70 fixed z-10 top-0 left-0 bg-[#cfcfcf] backdrop-blur-lg  m-0"
    >
      <FormContainer
        onSubmit={() => {
          updateListDetails();
        }}
        className="w-[90vw] pb-[10px] md:w-[42%] lg:w-[32%] flex-shrink-0 rounded-xl bg-white m-auto px-[20px] pt-[10px]"
      >
        <Container className="flex">
          <Heading className="text-[25px]">
            {t("elementsStyles.updateListDetails")}
          </Heading>
          <Button className="ml-auto" onClick={() => updateIsEditDetails(-1)}>
            <MdClose />
          </Button>
        </Container>
        <Container className="inline-flex flex-col items-start mb-3 mt-5">
          <Label
            className="text-[#505887] font-inter text-base font-normal"
            htmlFor="updateName"
          >
            {t("elementsStyles.name")}
          </Label>
          <p className="text-[12px] text-[#505887] font-inter font-normal">
            (max 30 characters)
          </p>
          <InputElement
            className="w-[80vw] md:w-[28vw]  h-11 flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white p-[16px]"
            required
            type="text"
            id="updateName"
            value={name}
            onChange={(event) => updateName(event.target.value)}
            placeholder="Enter Name"
            maxLength={30}
          />
          {name.length >= 30 && (
            <p className="text-[12px] text-red-400 font-inter font-normal">
              (max 30 characters)
            </p>
          )}
        </Container>
        <Container className="inline-flex flex-col items-start mb-3">
          <Label
            className="text-[#505887] font-inter text-base font-normal"
            htmlFor="updateType"
          >
            {t("elementsStyles.status")}
          </Label>
          <SelectElement
            className="w-[80vw] md:w-[28vw]  h-11 flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white pr-[22px] text-[#718ebf] font-inter text-base"
            required
            id="UpdateType"
            value={status}
            onChange={(event) => updateStatus(event.target.value)}
          >
            {dropdownOptions.map((eachStatus) => (
              <SelectOption value={eachStatus.value}>
                {eachStatus.label}
              </SelectOption>
            ))}
          </SelectElement>
        </Container>
        <Container className="inline-flex flex-col items-start mb-3">
          <Label
            className="text-[#505887] font-inter text-base font-normal"
            htmlFor="updateDueDate"
          >
            {t("elementsStyles.dueDate")}
          </Label>
          <InputElement
            className="w-[80vw] md:w-[28vw]  h-11 flex-shrink-0 rounded-xl border border-solid border-[#dfeaf2] bg-white p-[16px]"
            required
            type="datetime-local"
            id="updateDueDate"
            value={setTimeFormate(date)}
            onChange={(event) => updateDate(event.target.value)}
            placeholder="Enter Name"
            maxLength={30}
          />
        </Container>
        <button
          className="flex w-[95%] p-2 mb-2 justify-center items-center gap-4 rounded-lg bg-blue-600 border-0 text-white font-inter text-base md:text-lg cursor-pointer"
          type="submit"
        >
          {t("elementsStyles.updateDetails")}
        </button>
      </FormContainer>
    </Container>
  );
};

export default ListViewEditDetails;
