import * as Yup from "yup";

export const createExerciseForm_InitVals = {
  name: "",
  bodyPart: "",
  equipment: "",
  equipmentNeeded: "No",
  target: "",
  gifUrl: "",
  description: "",
  publish: "false",
};

export const createExerciseForm_ValidationSchema = () =>
  Yup.object({
    publish: Yup.string().test(
      "publish",
      "You must provide a description or a GIF Url in order to publish an exercise",
      (value, ctx) => {
        console.log(ctx.parent.description);
        return (
          (value === "true" &&
            (ctx.parent.description !== undefined ||
              ctx.parent.gifUrl !== undefined)) ||
          value === "false"
        );
      }
    ),
    name: Yup.string().required("Exercise name is required"),
    bodyPart: Yup.string().required("Body part is required"),
    equipment: Yup.string().when("equipmentNeeded", {
      is: (equipmentNeeded: string) => equipmentNeeded === "Yes",
      then: Yup.string().required("Equipment description is required"),
      otherwise: Yup.string(),
    }),
    target: Yup.string().required("Target muscle is required"),
    description: Yup.string(),
    gifUrl: Yup.string(),
  });
