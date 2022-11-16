import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FilledButton from "../../components/ui/FilledButton/filledButton";

const CreateExercisePage = () => {
  
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      bodyPart: "",
      equipment: "",
      target: "",
      gifUrl: "",
      description: "",
      publish: "",
    },
    validationSchema: {

    },
    onSubmit: async (values) => {
    }
  })
  
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-neutral-800 shadow-xl rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-left text-sm font-bold mb-2"
            htmlFor="name"
          >
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
        <div className="mb-9">
          <label
            className="block text-left text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
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
            <p className="text-left text-red-500">{formik.errors.description}</p>
          )}
        </div>
        <div className="mb-9">
          <label
            className="block text-left text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
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
            <p className="text-left text-red-500">{formik.errors.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <FilledButton text={"Log In"} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default CreateExercisePage;
