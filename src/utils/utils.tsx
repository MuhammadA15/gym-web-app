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
  waist: "orange-500",
  back: "red-600",
  chest: "teal-700",
  upperarms: "green-600",
  lowerarms: "green-800",
  shoulders: "emerald-800",
  cardio: "rose-600",
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
