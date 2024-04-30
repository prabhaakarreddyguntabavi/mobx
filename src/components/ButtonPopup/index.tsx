import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { CiUser, CiSettings } from "react-icons/ci";
import {
  IoIosNotificationsOutline,
  IoIosHelpCircleOutline,
  IoIosArrowForward,
} from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

import {
  Button,
  MainContainer,
  Container,
  PopupMainContainer,
  Paragraph,
} from "./styledComponents";

const ButtonPopup = () => {
  const [isPopupOpen, updateIsPopupOpen] = useState<boolean>(false);

  return (
    <>
      <MainContainer className="p-10">
        <Button
          onClick={() => updateIsPopupOpen(!isPopupOpen)}
          className="cursor-pointer p-2 mr-10 justify-center items-center gap-1 rounded-lg text-white text-center font-inter font-medium text-base bg-blue-600"
        >
          Open Popup
        </Button>
      </MainContainer>
      {isPopupOpen && (
        <PopupMainContainer className="flex w-[100%] h-[100%] flex-shrink-0 bg-opacity-80 fixed top-0 left-0 bg-[#475569] backdrop-blur-lg  m-0 justify-end items-end">
          <div
            onClick={() => updateIsPopupOpen(!isPopupOpen)}
            className="absolute inset-x-0 top-0 h-2/4 flex items-center pt-2 "
          ></div>
          <Container className="h-2/4 w-full bg-white  p-5 rounded-t-[20px]">
            <Container className="flex items-start">
              <Paragraph>Prabhakar Testing</Paragraph>
              <Button
                onClick={() => updateIsPopupOpen(!isPopupOpen)}
                className="ml-auto"
              >
                <MdOutlineClose className="w-[20px] h-[20px]" />
              </Button>
            </Container>

            <Container className="m-auto">
              <Container className="inline-flex p-2 flex-col items-start gap-2 rounded-[16px] border border-[#CBD5E1] bg-white mt-10">
                <Container className=" border-b-2 flex items-center gap-2 py-[6px] pl-[12px] pr-[8px]">
                  <CiUser className="h-[20px] w-[20px]" />
                  <Button className="flex w-[260px] flex-col items-start gap-1 bg-white">
                    Account
                  </Button>

                  <IoIosArrowForward />
                </Container>
                <Container className=" border-b-2 flex py-[6px] pl-[12px] pr-[8px] gap-2  items-center ">
                  <IoIosNotificationsOutline className="w-[20px] h-[20px]" />
                  <Button className="flex w-[260px] flex-col items-start gap-1 bg-white">
                    Notifications
                  </Button>
                  <IoIosArrowForward />
                </Container>
                <Container className=" border-b-2 flex py-[6px] pl-[12px] pr-[8px] gap-2  items-center ">
                  <CiSettings className="w-[20px] h-[20px]" />
                  <Button className="flex w-[260px] flex-col items-start gap-1 bg-white">
                    Settings
                  </Button>
                  <IoIosArrowForward />
                </Container>
                <Container className=" border-b-2 flex py-[6px] pl-[12px] pr-[8px] gap-2  items-center ">
                  <IoIosHelpCircleOutline className="w-[20px] h-[20px]" />
                  <Button className="flex w-[260px] flex-col items-start gap-1 bg-white">
                    Help
                  </Button>
                  <IoIosArrowForward />
                </Container>
                <Container className=" border-b-1 flex py-[6px] pl-[12px] pr-[8px] gap-2  items-center ">
                  <MdOutlineLogout className="w-[20px] h-[20px]" />
                  <Button className="flex w-[260px] flex-col items-start gap-1 bg-white">
                    Logout
                  </Button>
                  <IoIosArrowForward />
                </Container>
              </Container>
            </Container>
          </Container>
        </PopupMainContainer>
      )}
    </>
  );
};

export default ButtonPopup;
