export const sortAlphabetical = ({ a, b }: { a: string; b: string }) => {
  return a.localeCompare(b);
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
};

export interface IbodyPartColorMapperTypes {
  legs: string,
  upperlegs: string,
  lowerlegs: string,
  waist: string,
  back: string,
  chest: string,
  upperarms: string,
  lowerarms: string,
  shoulders: string,
  cardio: string,
}
