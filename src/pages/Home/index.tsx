import React from "react";
import { AiFillEye, AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import "./styles.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToCreateExerciseFrom = () => {
    navigate("/create-exercise");
  };

  return (
    <div className="">
      <div className="grid grid-cols-9 gap-0">
        <div className="col-span-2 p-7 pl-10 text-left border-r-1 h-full">
          <div className="left-grid-heading mb-5 items-center">
            <p className="font-bold leading-10">Recent workouts</p>
            <div>
              <FilledButton
                text={"+ Add New"}
                py={"py-1"}
                textSize={"text-sm"}
                textWeight={"font-normal"}
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            adipisci error neque, unde in recusandae quasi, quisquam obcaecati
            nostrum eius nam dolores blanditiis possimus minus eveniet dolor
            tenetur enim expedita.
          </p>
        </div>
        <div className="col-span-5 text-left p-10">
          <p className="text-3xl mb-2">The home for all things fitness</p>
          <p className="text-gray-500 mb-10">
            Welcome to your personal dashboard, where you can find an
            introduction to the tools and services myFit has to offer to help
            you on your fitness journey
          </p>
          <p className="text-lg mb-4">Recommended for you</p>
          <div className=" border-1 shadow-xl rounded px-8 pt-6 pb-8 mb-10 w-100"></div>
          <p className="text-md mb-4">Start building your profile</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="border-1 shadow-2xl rounded px-6 py-6 mb-4 w-100 h-full">
                <p className="text-md mb-1">Add a new exercise</p>
                <p className="text-md text-gray-500 leading-0 mb-7">
                  An exercise can be anything from a weight lifting exercise to
                  a simple stretch
                </p>
                <label htmlFor="exercise-name py-1">Exercise Name</label>
                <input
                  className="shadow appearance-none border rounded w-full my-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-7"
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
                  onClickFunc={navigateToCreateExerciseFrom}
                  py={"py-1"}
                />
              </div>
            </div>
            <div>
              <div className="border-1 shadow-2xl rounded px-6 pt-6 pb-3 mb-4 w-100 h-full">
                <p className="text-md mb-1">Create a new workout</p>
                <p className="text-md text-gray-500 leading-0 mb-5">
                  Create a new workout routine to save to your library and
                  access at any time. Start by providing a brief description and
                  the name of the workout routine
                </p>
                <label htmlFor="routine-name" className="mb-2">
                  Routine Name
                </label>
                <input
                  className="mb-4 text-sm shadow appearance-none border rounded w-full my-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="routine-name"
                  type="text"
                  placeholder="name of workout..."
                />
                <label htmlFor="routine-description">Description</label>
                <textarea
                  name="routine-descripton"
                  placeholder="provide a brief description of your workout routine..."
                  className="mb-5 text-sm appearance-none border rounded w-full my-1 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                <FilledButton
                  text={"Create workout routine"}
                  py={"py-1"}
                  textWeight={"font-normal"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-7 text-left">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum iste
            nemo beatae incidunt omnis iure, rem doloribus cum ad! Quos sapiente
            non repellendus aspernatur sed dignissimos consectetur ut totam!
            Adipisci?
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
