//@ts-nocheck

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineTimer } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { dropdownOptions, labelColors } from "../../constants/commonConstants";
import { customDateTimeCustomFormate } from "../../utils/dateTimeFormate";
import ListViewOptions from "../ListViewOptions";
import ListViewEditDetails from "../ListViewEditDetails";
import { Button, Container, Paragraph } from "./styledComponents";
import { DetailsView, ListViewPropsValues } from "../../types/inputStyles";
import ListViewMoreOptions from "../ListViewMoreOptions";

const ListViewElementWrap = (props: ListViewPropsValues) => {
  const { detailsList } = props;

  const { t } = useTranslation();

  const [listDict, updateListDict] = useState<DetailsView[]>(detailsList);
  const [listIndex, setListIndex] = useState<number>(-1);
  const [moreOptionListIndex, setMoreOptionListIndex] = useState<number>(-1);
  const [isEditDetails, updateIsEditDetails] = useState<number>(-1);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        setListIndex(-1);
        setMoreOptionListIndex(-1);
        updateIsEditDetails(-1);
      }
    };

    const handleMouseDown = (event: any) => {
      if (event.target.id === "") {
        setListIndex(-1);
        setMoreOptionListIndex(-1);
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const updateListIndex = (id: number) => {
    if (listIndex >= 0) {
      setListIndex(-1);
    } else {
      setListIndex(id);
    }
  };

  const updateMoreOptionListIndex = (id: number) => {
    if (moreOptionListIndex >= 0) {
      setMoreOptionListIndex(-1);
    } else {
      setMoreOptionListIndex(id);
    }
  };

  const updateStatus = (id: number, statusOption: string) => {
    const updateDetails: DetailsView[] = listDict.map((eachOption) => {
      if (eachOption.id === id) {
        return { ...eachOption, status: statusOption };
      }
      return eachOption;
    });
    updateListDict(updateDetails);
    setListIndex(-1);
  };

  const updateEditDetails = (listDetails: DetailsView) => {
    const updateDetails: DetailsView[] = listDict.map((eachOption) => {
      if (eachOption.id === listDetails.id) {
        return listDetails;
      }
      return eachOption;
    });
    updateListDict(updateDetails);
    updateIsEditDetails(-1);
  };

  const deleteListDetails = (id: number) => {
    const updatedDetails = listDict.filter(
      (eachDetails) => eachDetails.id !== id
    );
    updateListDict(updatedDetails);
    setMoreOptionListIndex(-1);
  };

  const editDetailsView = () => {
    const listDetails = listDict.filter(
      (eachDetails) => eachDetails.id === isEditDetails
    );
    return (
      <ListViewEditDetails
        listDetails={listDetails[0]}
        updateEditDetails={updateEditDetails}
        updateIsEditDetails={updateIsEditDetails}
      />
    );
  };

  return (
    <Container className="w-full min-h-full bg-[#F1F5F9] p-[50px]">
      <Container className="flex mb-2">
        <Paragraph className=" text-[#334155] w-[30.5%] ml-[60px] text-[14px] leading-5 not-italic">
          {t("elementsStyles.name")}
        </Paragraph>
        <Paragraph className=" text-[#334155] w-[26.5%] text-[14px] leading-5 not-italic">
          {t("elementsStyles.status")}
        </Paragraph>
        <Paragraph className=" text-[#334155]  text-[14px] leading-5 not-italic">
          {t("elementsStyles.dueDate")}
        </Paragraph>
      </Container>

      {listDict.length > 0 ? (
        listDict.map((eachDetails) => (
          <Container className="bg-white h-[48px] flex items-center flex-shrink-0 pl-5 pr-5 rounded-[12px] mb-1 hover:shadow-xl">
            <eachDetails.icon />
            <Paragraph className="ml-[20px] min-w-[200px] max-w-[200px] text-[#334155] text-[14px] leading-5 not-italic text-nowrap overflow-hidden">
              {eachDetails.name}
            </Paragraph>

            <Container className="relative ml-[100px]">
              <Container
                id="listIndex"
                onClick={() => updateListIndex(eachDetails.id)}
                className="flex items-center w-[150px] cursor-pointer"
              >
                <Container
                  id="listIndexColor"
                  className={`rounded-full  ${
                    labelColors[eachDetails.status].color
                  } w-2 h-2 mr-2`}
                ></Container>
                <Paragraph
                  id="listIndexTest"
                  className=" text-[#334155] text-[14px] leading-5 not-italic"
                >
                  {labelColors[eachDetails.status].label}
                </Paragraph>
                {listIndex === eachDetails.id ? (
                  <IoIosArrowUp className="ml-auto" />
                ) : (
                  <IoIosArrowDown className="ml-auto" />
                )}
              </Container>
              {listIndex === eachDetails.id && (
                <ListViewOptions
                  dropdownOptions={dropdownOptions}
                  updateStatus={updateStatus}
                  eachDetails={eachDetails}
                  labelColors={labelColors}
                />
              )}
            </Container>

            <Container className="ml-[100px] gap-1 flex items-center text-[#64748B] text-[14px] leading-5 not-italic">
              <MdOutlineTimer className="w-4 h-4" />
              <Paragraph>
                {customDateTimeCustomFormate(eachDetails.dueDate)}
              </Paragraph>
            </Container>
            <Container id="moreOptionsDetails" className="relative ml-auto">
              <Button
                id="moreOptionsDetails"
                onClick={() => updateMoreOptionListIndex(eachDetails.id)}
              >
                <BsThreeDots id="moreOptionIcon" />
              </Button>
              {moreOptionListIndex === eachDetails.id && (
                <ListViewMoreOptions
                  id={eachDetails.id}
                  updateIsEditDetails={updateIsEditDetails}
                  deleteListDetails={deleteListDetails}
                />
              )}
            </Container>
          </Container>
        ))
      ) : (
        <Container className="flex justify-center items-center h-[300px] w-full bg-white">
          <Paragraph>{t("elementsStyles.noDetailsFound")}</Paragraph>
        </Container>
      )}
      {isEditDetails > 0 && editDetailsView()}
    </Container>
  );
};

export default ListViewElementWrap;
