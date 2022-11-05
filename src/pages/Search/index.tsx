import React, { useCallback, useEffect, useState } from "react";
import { FETCH_ALL_EXERCISES_ENDPOINT } from "../../utils/constants/apiEndpoints";
import {MdOutlineNavigateNext, MdOutlineNavigateBefore} from "react-icons/md";
import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import './styles.scss'
import ResultCard from "./ResultCard";

export interface exerciseTypes {
  id: number,
  name: string,
  bodyPart: string,
  equipment : string,
  gifUrl: string,
  target: string
}

const SearchPage = () => {

  const entriesPerPage = 18;

  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState<number[]>([]);
  const [pageTotal, setPageTotal] = useState<number | null>(null);
  const [pageRange, setPageRange] = useState<number[]>([0, 7])
  const [mount, setMount] = useState(false);

  /**
   * Fetch all exercises
   */
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    await fetch(FETCH_ALL_EXERCISES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          console.log("data", data.body);
          setExerciseData(data.body);
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  /**
   * Determine total amount of pages
   */
  useEffect(() => {
    if (exerciseData) {
      setPageTotal(Math.ceil((exerciseData?.length) / entriesPerPage));
    }
  }, [exerciseData])

  /**
   * Set exercise list index range based on page number
   */
  const pagination = useCallback(() => {
    if (exerciseData) {
      const newRange = [
        (page * entriesPerPage) - entriesPerPage, 
        (page * entriesPerPage) > exerciseData?.length 
          ? exerciseData?.length 
          : (page * entriesPerPage)
      ]
      setRange(newRange);
    }
  },[exerciseData, page]);

  useEffect(() => {
    pagination();
  }, [page, exerciseData, pagination])

  /**
   * Update page numbers range for display
   */
  const updatePageNumbers = useCallback(() => {
    if (pageTotal && page !== Math.ceil((pageRange[0] + pageRange[1]) / 2)) {
      let lowerRange = page - 4
      let upperRange = page + 3
      if (page - 4 < 0) {
        lowerRange = 0
        upperRange = 7
      }
      if (page + 3 > pageTotal) {
        lowerRange = pageTotal - 7
        upperRange = pageTotal
      }
      
      setPageRange([lowerRange, upperRange])
    }
  }, [pageTotal, page, pageRange]);

  useEffect(() => {
    if (mount) {
      updatePageNumbers();
    }
    setMount(true);
  }, [page, updatePageNumbers])


  return (
    <div className="grid grid-cols-5">
      <div className="cols-span-1 bg-neutral-800 m-4 rounded">
        <p></p>
      </div>
      <div className="col-span-4 mt-4">
        <div className="text-left px-4">
          <input className="shadow appearance-none border rounded w-1/2 py-2 px-2 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search"/>
        </div>
        <hr className="search-hr-border-t-1 border-g-300 mx-4 mt-6"/>
        <p className="text-left px-4 mt-1 text-gray-500">{exerciseData ? parseInt(exerciseData?.length.toString()).toLocaleString() : ""} results found</p>
        <div className="">
          <div className="grid grid-cols-3 gap-2 mx-4 mt-4 px-4 pt-7">
            {exerciseData?.slice(range[0], range[1])?.map((exercise, index) => (
              <ResultCard exercise={exercise} index={index}/>
            ))}
          </div>
          <div className="flex justify-center items-center pb-6 mb-4">
            <span 
              className={`
                text-sm
                px-3.5
                py-1
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === 1 ? 'span-disabled' : ''}
              `}
              onClick={() => setPage(1)}
            >
              <HiChevronDoubleLeft  />
            </span>
            <span 
              className={`
                px-3.5
                py-1
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === 1 ? 'span-disabled' : ''}
              `}
              onClick={() => setPage(page - 1)}
            >
              <MdOutlineNavigateBefore />
            </span>
            {Array.from(Array(pageTotal).keys())?.slice(pageRange[0], pageRange[1])?.map(i => (
              <>
              <span 
                className={`
                  px-3.5
                  font-bold 
                  rounded
                  transition-all
                  duration-200
                  hover:cursor-pointer
                  ${page === i + 1 ? 'bg-red-500 hover:bg-red-500' : ''}
                  ${page !== i + 1 ? 'hover:bg-red-500 hover:bg-opacity-25' : ''}
                `} 
                key={i} 
                onClick={() => setPage(i + 1)}
              >
                {i +1}
                
              </span>
              </>
            ))}
            <span 
              className={`
                px-3.5 
                py-1
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === pageTotal ? 'span-disabled' : ''}
              `}
              onClick={() => setPage(page + 1)}
            >
              <MdOutlineNavigateNext />
            </span>
            <span 
              className={`
                text-sm
                px-3.5
                py-1
                transition-all
                duration-200
                hover:rounded 
                hover:bg-red-500 
                hover:bg-opacity-25
                hover:cursor-pointer
                ${page === pageTotal ? 'span-disabled' : ''}
              `}
              onClick={() => setPage(pageTotal ? pageTotal : page)}
            >
              <HiChevronDoubleRight  />
            </span>
          </div>
        </div>
      </div>
  </div>
  );
};

export default SearchPage;
