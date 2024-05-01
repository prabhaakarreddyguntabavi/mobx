import ListViewElementWrap from "../ListViewElementWrap";
import { FaRegSquareCheck } from "react-icons/fa6";

interface DetailsView {
  id: number;
  icon: React.ElementType;
  name: string;
  status: string;
  dueDate: string;
}

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
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 3,
      icon: FaRegSquareCheck,
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 4,
      icon: FaRegSquareCheck,
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 5,
      icon: FaRegSquareCheck,
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
    {
      id: 6,
      icon: FaRegSquareCheck,
      name: "Google Ads Responsive Display",
      status: "done",
      dueDate: "2 Feb 2022 - 18:00",
    },
  ];

  return <ListViewElementWrap detailsList={detailsList} />;
};

export default ListViewElement;
