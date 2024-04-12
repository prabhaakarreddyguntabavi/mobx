export const setTimeFormate = (date: string): string => {
  const inputDateString: string = date;
  const inputDate: Date = new Date(inputDateString);
  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day: string = String(inputDate.getDate()).padStart(2, "0");
  const hours: string = String(inputDate.getHours()).padStart(2, "0");
  const minutes: string = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds: string = String(inputDate.getSeconds()).padStart(2, "0");
  const formattedDateTime: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

export const getCurrentDateTime = (): string => {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, "0");
  const day: string = String(now.getDate()).padStart(2, "0");
  const hours: string = String(now.getHours()).padStart(2, "0");
  const minutes: string = String(now.getMinutes()).padStart(2, "0");
  const seconds: string = String(now.getSeconds()).padStart(2, "0");
  const dateTimeString: string = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return dateTimeString;
};

export const dateTimeCustomFormate = (date: string): string => {
  const inputDateString: string = date;
  const inputDate: Date = new Date(inputDateString);

  const day: number = inputDate.getDate();
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month: string = monthNames[inputDate.getMonth()];
  const hours: number = inputDate.getHours();
  const minutes: number = inputDate.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  const formattedDate: string = `${day} ${month}, ${
    hours % 12
  }:${minutes} ${ampm}`;

  return formattedDate;
};
