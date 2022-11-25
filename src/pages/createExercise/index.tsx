import React, { useState } from "react";
import { useFormik } from "formik";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import { yesNoOptions } from "../../utils/utils";
import { AiFillLock, AiFillEye } from "react-icons/ai";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../../services/exerciseService";
import {
  createExerciseForm_InitVals,
  createExerciseForm_ValidationSchema,
} from "./utils/utils_exerciseForm";

const CreateExercisePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: createExerciseForm_InitVals,
    validationSchema: createExerciseForm_ValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const data = {
        name: formik.values.name,
        bodyPart: formik.values.bodyPart,
        equipment:
          formik.values.equipmentNeeded === "No"
            ? "Body Weight"
            : formik.values.equipment,
        target: formik.values.target,
        gifUrl: formik.values.gifUrl,
        description: formik.values.description,
        publish: formik.values.publish === "true" ? 1 : 0,
        author: userId,
      };

      makeCreateExerciseCall(data);
    },
  });

  /**
   * Make create exercise api call
   * @param data
   */
  const makeCreateExerciseCall = async (data: any) => {
    createExercise(data).then((data) => {
      if (data.status === 200) {
        alert(data.body.msg);
        navigate("/search");
      } else {
        alert(data.body.msg);
        setLoading(false);
      }
    });
  };

  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-2xl mt-10">
        <div className="text-left mt-6">
          <p className="text-2xl">Create a new exercise</p>
          <p className="text-gray-500 text-sm mt-0.5">
            A new exercise can be anything from simple cardio to complicated
            compound movements. All created exercises can be viewed after
            creation in the user's library
          </p>
        </div>
        <hr className="border-t-2 border-gray-700 mt-5" />
        <form onSubmit={formik.handleSubmit} className="pt-5 pb-8 mb-5">
          <div className="mb-5">
            <label className="block text-left text-sm mb-2" htmlFor="name">
              Exercise Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Exercise Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <p className="text-left text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block text-left text-sm mb-2"
              htmlFor="description"
            >
              Description{" "}
              <span className="text-gray-400 font-light text-sm ml-0.5">
                (optional)
              </span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && (
              <p className="text-left text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label className="block text-left text-sm  mb-2" htmlFor="bodyPart">
              Body Part
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bodyPart"
              type="text"
              placeholder="Body Part"
              value={formik.values.bodyPart}
              onChange={formik.handleChange}
            />
            {formik.errors.bodyPart && (
              <p className="text-left text-red-500">{formik.errors.bodyPart}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block text-left text-sm  mb-2" htmlFor="target">
              Target Muscle
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="target"
              type="text"
              placeholder="Target Muscle"
              value={formik.values.target}
              onChange={formik.handleChange}
            />
            {formik.errors.target && (
              <p className="text-left text-red-500">{formik.errors.target}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block text-left text-sm  mb-2"
              htmlFor="equipmentNeeded"
            >
              Equipment Needed?
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="equipmentNeeded"
              placeholder="Equipment Needed?"
              value={formik.values.equipmentNeeded}
              onChange={formik.handleChange}
            >
              {yesNoOptions?.map((option) => (
                <option className="py-1" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.errors.equipmentNeeded && (
              <p className="text-left text-red-500">
                {formik.errors.equipmentNeeded}
              </p>
            )}
          </div>
          {formik.values.equipmentNeeded === "Yes" && (
            <div className="mb-5">
              <label
                className="block text-left text-sm  mb-2"
                htmlFor="equipment"
              >
                Please provide what equipment is needed to perform the exercise
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="equipment"
                type="text"
                placeholder="Equipment"
                value={formik.values.equipment}
                onChange={formik.handleChange}
              />
              {formik.errors.equipment && (
                <p className="text-left text-red-500">
                  {formik.errors.equipment}
                </p>
              )}
            </div>
          )}
          <div className="mb-5">
            <label className="block text-left text-sm  mb-2" htmlFor="gifUrl">
              GIF Url{" "}
              <span className="text-gray-400 font-light text-sm ml-0.5">
                (optional)
              </span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gifUrl"
              type="text"
              placeholder="GIF Url"
              value={formik.values.gifUrl}
              onChange={formik.handleChange}
            />
            {formik.errors.description && (
              <p className="text-left text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>
          <hr className="border-top-1 mt-6" />
          <div className="mt-4 mb-4">
            <p className="text-md text-left">Set Access Permissions:</p>
            <p className="text-gray-500 text-sm text-left">
              Select whether you would like to publish your exercise for the
              public to see or if you would like to keep your exercise private
              to you. This can be changed at anytime through the user's library.
            </p>
          </div>
          <div className="mb-4 mt-4">
            <div className="flex mb-5 items-center">
              <input
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                type="radio"
                id="public"
                name="publish"
                value="true"
                onChange={formik.handleChange}
              />
              <div className="pl-4 text-sm">
                <label htmlFor="public" className="flex items-center">
                  <AiFillEye size={25} className="mr-2" /> Publish exercise so
                  that anyone can view it
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                type="radio"
                id="private"
                name="publish"
                value="false"
                onChange={formik.handleChange}
                defaultChecked
              />
              <div className="pl-4 text-sm">
                <label htmlFor="private" className="flex items-center">
                  <AiFillLock size={25} className="mr-2" /> Keep exercise
                  private to your library
                </label>
              </div>
            </div>
            {formik.errors.publish && (
              <p className="text-left text-red-500 mt-2">
                {formik.errors.publish}
              </p>
            )}
          </div>
          <hr className="border-top-1 mb-6" />
          <div className="flex items-center justify-between">
            <FilledButton text={"Create Exercise"} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExercisePage;
