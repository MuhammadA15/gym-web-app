import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import "./styles.scss";
import ResultCard from "./ResultCard";
import { exerciseTypes } from "../../types/exerciseType";
import { IFavExerciseType } from "../../types/favoriteExerciseType";
import {
  fetchAllExercises,
  fetchFavorites,
} from "../../services/exerciseService";

const SearchPage = () => {
  const entriesPerPage = 18;
  const userId = localStorage.getItem("id");

  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);
  const [favExercises, setFavExercises] = useState<IFavExerciseType[] | null>([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState<number[]>([]);
  const [pageTotal, setPageTotal] = useState<number | null>(null);
  const [pageRange, setPageRange] = useState<number[]>([0, 7]);
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exerciseLoading, setExerciseLoading] = useState(true);

  /**
   * Fetch all exercises
   */
  const makeFetchAllExercisesCall = async () => {
    fetchAllExercises().then((data) => {
      if (data?.status === 200) {
        // console.log("data", data.body);
        setExerciseData(data.body);
        setExerciseLoading(false);
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  useEffect(() => {
    makeFetchAllExercisesCall();
  }, []);

  /**
   * Get Favorite Exercises
   */
  const makeFetchFavoritesCall = async (userId: string) => {
    fetchFavorites(userId).then((data) => {
      if (data?.status === 200) {
        // console.log("data", data.body);
        setFavExercises(data?.body);
        setLoading(false);
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  useEffect(() => {
    if (userId) {
      makeFetchFavoritesCall(userId);
    }
  }, [userId]);

  const checkFavExercise = (exerciseId: number) => {
    if (favExercises) {
      return favExercises.some((data) => data?.exerciseId === exerciseId);
    }
    return false;
  };

  /**
   * Determine total amount of pages
   */
  useEffect(() => {
    if (exerciseData) {
      setPageTotal(Math.ceil(exerciseData?.length / entriesPerPage));
    }
  }, [exerciseData, entriesPerPage]);

  /**
   * Set exercise list index range based on page number
   */
  const pagination = useCallback(() => {
    if (exerciseData) {
      const newRange = [
        page * entriesPerPage - entriesPerPage,
        page * entriesPerPage > exerciseData?.length
          ? exerciseData?.length
          : page * entriesPerPage,
      ];
      setRange(newRange);
    }
  }, [exerciseData, page]);

  useEffect(() => {
    pagination();
  }, [page, exerciseData, pagination]);

  /**
   * Update page numbers range for display
   */
  const updatePageNumbers = useCallback(() => {
    if (pageTotal && page !== Math.ceil((pageRange[0] + pageRange[1]) / 2)) {
      let lowerRange = page - 4;
      let upperRange = page + 3;
      if (page - 4 < 0) {
        lowerRange = 0;
        upperRange = 7;
      }
      if (page + 3 > pageTotal) {
        lowerRange = pageTotal - 7;
        upperRange = pageTotal;
      }

      setPageRange([lowerRange, upperRange]);
    }
  }, [pageTotal, page, pageRange]);

  useEffect(() => {
    if (mount) {
      updatePageNumbers();
    }
    setMount(true);
  }, [page]);

  return (
    <div className="grid grid-cols-12 mt-5 mx-6 gap-2">
      <div className="col-span-3 bg-neutral-900 shadow-2xl mt-4 rounded mb-10">
        <p>Filter Menu</p>
      </div>
      <div className="col-span-9 mt-10 mx-6">
        <div className="text-left">
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-2 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search"
          />
        </div>
        <hr className="search-hr-border-t-1 border-g-300 mt-6 mr-6" />
        <p className="text-left mt-2 text-gray-500">
          {exerciseData
            ? parseInt(exerciseData?.length.toString()).toLocaleString()
            : ""}{" "}
          results found
        </p>
        <div className="">
          <div className="grid grid-cols-3 gap-2 mt-2 pt-5">
            {exerciseData?.slice(range[0], range[1])?.map((exercise, index) => (
              <ResultCard
                exercise={exercise}
                index={index}
                favorited={checkFavExercise(exercise?.id)}
                loading={loading}
                exLoading={exerciseLoading}
              />
            ))}
            {(exerciseLoading || loading) &&
              Array.from(Array(18).keys())?.map((i) => (
                <ResultCard
                  exercise={null}
                  index={i}
                  favorited={false}
                  loading={loading}
                  exLoading={exerciseLoading}
                />
              ))}
          </div>
          <div className="flex justify-center items-center pb-6 mb-4">
            <span
              className={`
                text-sm
                px-3
                py-1.5
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === 1 ? "span-disabled" : ""}
              `}
              onClick={() => setPage(1)}
            >
              <HiChevronDoubleLeft />
            </span>
            <span
              className={`
                px-3
                py-1.5
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === 1 ? "span-disabled" : ""}
              `}
              onClick={() => setPage(page - 1)}
            >
              <MdOutlineNavigateBefore />
            </span>
            {Array.from(Array(pageTotal).keys())
              ?.slice(pageRange[0], pageRange[1])
              ?.map((i) => (
                <>
                  <span
                    className={`
                  px-3
                  py-0.5
                  font-bold
                  text-sm 
                  rounded
                  transition-all
                  duration-200
                  hover:cursor-pointer
                  ${page === i + 1 ? "bg-red-500 hover:bg-red-500" : ""}
                  ${
                    page !== i + 1 ? "hover:bg-red-500 hover:bg-opacity-25" : ""
                  }
                `}
                    key={i}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                </>
              ))}
            <span
              className={`
                px-3 
                py-1.5
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === pageTotal ? "span-disabled" : ""}
              `}
              onClick={() => setPage(page + 1)}
            >
              <MdOutlineNavigateNext />
            </span>
            <span
              className={`
                text-sm
                px-3
                py-1.5
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === pageTotal ? "span-disabled" : ""}
              `}
              onClick={() => setPage(pageTotal ? pageTotal : page)}
            >
              <HiChevronDoubleRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
