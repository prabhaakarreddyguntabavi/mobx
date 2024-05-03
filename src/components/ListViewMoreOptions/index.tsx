import { useTranslation } from "react-i18next";
import { ListViewMoreOptionsProps } from "../../types/inputStyles";

import { Button, Container } from "./styledComponents";

const ListViewMoreOptions = (props: ListViewMoreOptionsProps) => {
  const { updateIsEditDetails, deleteListDetails, id } = props;

  const { t } = useTranslation();

  return (
    <Container className="absolute z-[1] flex-shrink-0 right-1 bg-opacity-80 bg-white backdrop-blur-lg">
      <Container className="inline-flex w-[85px] p-2 flex-col items-start gap-2 rounded-[6px] border border-[#CBD5E1] bg-white ">
        <Container
          id="editListDetails"
          className={` w-[70px] rounded-lg flex items-center gap-2 py-[6px] pl-[6px] pr-[8px] hover:bg-[#EFF6FF]`}
        >
          <Button
            id="editListDetails"
            className="flex w-[260px] flex-col items-start gap-1"
            onClick={() => updateIsEditDetails(id)}
          >
            {t("elementsStyles.edit")}
          </Button>
        </Container>
        <Container
          id="deleteListDetails"
          className={` w-[70px] rounded-lg flex items-center gap-2 py-[6px] pl-[6px] pr-[8px] hover:bg-[#EFF6FF]`}
        >
          <Button
            id="deleteListDetails"
            className="flex w-[260px] flex-col items-start gap-1"
            onClick={() => deleteListDetails(id)}
          >
            {t("elementsStyles.delete")}
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default ListViewMoreOptions;
