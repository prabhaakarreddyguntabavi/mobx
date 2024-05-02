import ListViewElementWrap from "../ListViewElementWrap";
import { FaRegSquareCheck } from "react-icons/fa6";

import { DetailsView } from "../../types/inputStyles";

const ListViewElement = () => {
  const detailsList: DetailsView[] = [
    {
      id: 1,
      icon: FaRegSquareCheck,
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 2,
      icon: FaRegSquareCheck,
      name: "Task Title_1",
      status: "toDo",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 3,
      icon: FaRegSquareCheck,
      name: "Login with Mobile Number",
      status: "inProgress",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 4,
      icon: FaRegSquareCheck,
      name: "Registration Website",
      status: "reject",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 5,
      icon: FaRegSquareCheck,
      name: "Responsive Display banners for...",
      status: "inReview",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 6,
      icon: FaRegSquareCheck,
      name: "Task Title_1",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
  ];

  return <ListViewElementWrap detailsList={detailsList} />;
};

export default ListViewElement;
