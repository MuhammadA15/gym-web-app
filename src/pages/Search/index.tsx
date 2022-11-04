import React, { useEffect, useState } from "react";
import { FETCH_ALL_EXERCISES_ENDPOINT } from "../../utils/constants/apiEndpoints";
import {MdOutlineNavigateNext, MdOutlineNavigateBefore} from "react-icons/md";
import './styles.scss'

interface exerciseTypes {
  id: number,
  name: string,
  bodyPart: string,
  equipment : string,
  gifUrl: string,
  target: string
}

const SearchPage = () => {

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
      setPageTotal(Math.ceil((exerciseData?.length) / 24));
    }
  }, [exerciseData])

  /**
   * Set exercise list index range based on page number
   */
  useEffect(() => {
    pagination();
  }, [page, exerciseData])

  const pagination = () => {
    if (exerciseData) {
      const newRange = [
        (page * 24) - 24, 
        (page * 24) > exerciseData?.length 
          ? exerciseData?.length 
          : (page * 24)
      ]
      setRange(newRange);
    }
  };

  /**
   * Update page numbers range for display
   */
  useEffect(() => {
    if (mount) {
      updatePageNumbers();
    }
    setMount(true);
  }, [page])

  const updatePageNumbers = () => {
    if (pageTotal && page != Math.ceil((pageRange[0] + pageRange[1]) / 2)) {
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
  };

  return (
    <div className="grid grid-cols-5">
      <div className="cols-span-1 bg-neutral-800 m-4">
        <p></p>
      </div>
      <div className="col-span-4 mt-4">
        <div className="text-left px-4">
          <input className="shadow appearance-none border rounded w-1/2 py-2 px-2 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search"/>
        </div>
        <hr className="search-hr-border-t-1 border-g-300 mx-4 mt-6"/>
        <p className="text-left px-4 mt-1 text-gray-500">{exerciseData ? parseInt(exerciseData?.length.toString()).toLocaleString() : ""} results found</p>
        <div className="bg-neutral-800">
          <div className="grid grid-cols-4 gap-4 mx-4 mt-4 px-4 pt-4 pt-16 mt-6">
            {exerciseData?.slice(range[0], range[1])?.map((exercise, index) => (
              <div key={index} className="mb-10 flex flex-col items-center">
                <img src={exercise?.gifUrl} className="h-40 w-40"/>
                <p>{exercise?.name}</p>
                <p>{exercise?.bodyPart}</p>
                <p>{exercise?.target}</p>
                <p>{exercise?.equipment}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center pb-6 mb-4">
            <span 
              className={`
                px-3.5
                py-1
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
          </div>
        </div>
      </div>
  </div>
  );
};

export default SearchPage;
