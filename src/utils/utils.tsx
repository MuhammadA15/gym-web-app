export const sortAlphabetical = ({ a, b }: { a: string; b: string }) => {
  return a.localeCompare(b);
};

export const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : date}`;
};

export const getCurrentTime = (separator = ":") => {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return `${hour}${separator}${minute}${separator}${second}`;
};

export const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const bodyPartColorMapper = {
  legs: "blue-600",
  upperlegs: "blue-600",
  lowerlegs: "blue-800",
  waist: "amber-500",
  back: "red-600",
  chest: "teal-500",
  upperarms: "orange-500",
  lowerarms: "orange-600",
  shoulders: "indigo-600",
  cardio: "rose-400",
  neck: "purple-400",
};

export const bodyPartChartColorMapper = {
  legs: "rgb(26, 58, 175)",
  upperlegs: "rgb(26, 58, 175)",
  lowerlegs: "rgb(104, 103, 199)",
  waist: "#069706",
  back: "rgb(231, 61, 10)",
  chest: "rgb(16, 122, 253)",
  upperarms: "#ffaa0d",
  lowerarms: "rgb(251, 151, 0)",
  shoulders: "rgb(26, 175, 134)",
  cardio: "rgb(121, 44, 131)",
  neck: "purple",
};

export interface IbodyPartColorMapperTypes {
  legs: string;
  upperlegs: string;
  lowerlegs: string;
  waist: string;
  back: string;
  chest: string;
  upperarms: string;
  lowerarms: string;
  shoulders: string;
  cardio: string;
  neck: string;
}
