import React, { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles.scss";
import { createRoutine } from "../../services/routineService";
import {
  fetchExercise,
  getRecommendations,
} from "../../services/exerciseService";
import { IRecommendationExerciseIdType } from "../../types/recommendationExerciseIdType";
import { exerciseTypes } from "../../types/exerciseType";
import RecommendationCard from "./recommendationCard";
import LoadingIcon from "../../components/ui/LoadingIcon/loadingIcon";

const HomePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [loading, setLoading] = useState(false);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationIds, setRecommendationIds] = useState<
    IRecommendationExerciseIdType[]
  >([]);
  const [recommendations, setRecommendations] = useState<exerciseTypes[]>([]);

  const formik = useFormik({
    initialValues: {
      routineName: "",
    },
    validationSchema: Yup.object({
      routineName: Yup.string().required("Routine name is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const data = {
        routineName: formik.values.routineName,
        userid: userId,
      };

      makeCreateRoutineCall(data);
    },
  });

  /**
   * Make create routine call
   * @param data
   */
  const makeCreateRoutineCall = async (data: any) => {
    createRoutine(data).then((data) => {
      if (data.status === 200) {
        alert(data.body.msg);
        setLoading(false);
      } else {
        alert(data.body.msg);
        setLoading(false);
      }
    });
  };

  /**
   * Make exercise recommendations call
   * @param userid
   */
  const makeRecommendationsCall = async (userid: string) => {
    getRecommendations(userid).then((data) => {
      if (data.status === 200) {
        setRecommendationIds(data.body);
      } else {
        console.log("Error");
      }
      setRecommendationsLoading(false);
    });
  };

  useEffect(() => {
    if (userId) {
      setRecommendationsLoading(true);
      makeRecommendationsCall(userId);
    }
  }, [userId]);

  /**
   * Make fetch exercise by id call
   * @param exerciseid
   */
  const makeFetchExerciseByIdCall = async (exerciseid: string) => {
    fetchExercise(exerciseid).then((data) => {
      if (data.status === 200) {
        setRecommendations((recommendationsArr) => [
          ...recommendationsArr,
          data.body,
        ]);
      } else {
        console.log("Error fetching recommendations");
      }
    });
  };

  useEffect(() => {
    if (recommendationIds) {
      recommendationIds.forEach((obj) => {
        makeFetchExerciseByIdCall(String(obj.id));
      });
    }
  }, [recommendationIds]);

  /**
   * Navigate to create exercise form
   */
  const navigateToCreateExerciseFrom = () => {
    navigate("/create-exercise");
  };

  return (
    <div className="">
      <div className="grid grid-cols-9 gap-0">
        <div className="col-span-2 text-left border-r-1 h-full">
          <div className="home-side px-7 pb-7 pt-5 pl-10">
            <div className="left-grid-heading mb-5 items-center">
              <p className="font-bold leading-10 text-sm">Recent workouts</p>
              <div className="ml-auto">
                <FilledButton
                  text={"+ Add New"}
                  py={"py-0.5"}
                  px={"px-1.5"}
                  textSize={"text-xs"}
                  textWeight={"font-normal"}
                />
              </div>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              adipisci error neque, unde in recusandae quasi, quisquam obcaecati
              nostrum eius nam dolores blanditiis possimus minus eveniet dolor
              tenetur enim expedita.
            </p>
          </div>
        </div>
        <div className="col-span-7 text-left p-10">
          <p className="text-3xl mb-2">The home for all things fitness</p>
          <p className="text-gray-500 mb-10 text-sm">
            Welcome to your personal dashboard, where you can find an
            introduction to the tools and services myFit has to offer to help
            you on your fitness journey
          </p>
          <p className="text-md mb-4">Recommended for you</p>
          <div className="border-1 shadow-2xl rounded py-6 px-4 mb-10 w-100 grid grid-cols-4 gap-3">
            {recommendationsLoading ? (
              <div className="col-span-4 mx-auto my-auto">
                <LoadingIcon />
              </div>
            ) : (
              recommendations?.map((exercise) => (
                <RecommendationCard exercise={exercise} />
              ))
            )}
          </div>
          <p className="text-sm mb-4">Start building your profile</p>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <div className="border-1 shadow-2xl rounded px-6 py-6 mb-4 w-100 h-full">
                <p className="text-sm mb-1">Add a new exercise</p>
                <p className="text-sm text-gray-500 leading-0 mb-5">
                  An exercise can be anything from a weight lifting exercise to
                  a simple stretch
                </p>
                <label htmlFor="exercise-name" className="text-sm">Exercise Name</label>
                <input
                  className="text-sm shadow appearance-none border rounded w-full my-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-7"
                  id="exercise-name"
                  type="text"
                  placeholder="name for your exercise..."
                />
                <div className="flex mb-4 items-center">
                  <input
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    type="radio"
                    id="publish"
                    name="access-pref"
                    value="true"
                  />
                  <div className="pl-4 text-sm">
                    <label htmlFor="public" className="flex items-center">
                      <AiFillEye size={25} className="mr-2" /> Publish exercise
                    </label>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    type="radio"
                    id="private"
                    name="access-pref"
                    value="false"
                  />
                  <div className="pl-4 text-sm">
                    <label htmlFor="private" className="flex items-center">
                      <AiFillLock size={25} className="mr-2" /> Keep exercise
                      private to your library
                    </label>
                  </div>
                </div>
                <br />
                <FilledButton
                  text={"Create new exercise"}
                  textWeight={"font-normal"}
                  textSize={"text-sm"}
                  onClickFunc={navigateToCreateExerciseFrom}
                  py={"py-0.5"}
                />
              </div>
            </div>
            <div>
              <div className="border-1 shadow-2xl rounded px-6 pt-6 pb-3 mb-4 w-100 h-full">
                <p className="text-sm mb-1">Create a new workout</p>
                <p className="text-sm text-gray-500 leading-0 mb-5">
                  Create a new workout routine to save to your library and
                  access at any time. Start by providing a brief description and
                  the name of the workout routine
                </p>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="routine-name" className="mb-2 text-sm">
                      Routine Name
                    </label>
                    <input
                      className="text-sm shadow appearance-none border rounded w-full my-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="routineName"
                      type="text"
                      placeholder="name of workout..."
                      value={formik.values.routineName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.routineName && (
                      <p className="text-left text-red-500 text-sm">
                        {formik.errors.routineName}
                      </p>
                    )}
                  </div>

                  <label htmlFor="routine-description" className="text-sm">Description</label>
                  <textarea
                    name="routine-descripton"
                    placeholder="provide a brief description of your workout routine..."
                    className="mb-5 text-sm appearance-none border rounded w-full my-1 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                  <FilledButton
                    text={"Create workout routine"}
                    textSize={"text-sm"}
                    py={"py-0.5"}
                    textWeight={"font-normal"}
                    loading={loading}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
