import React, { useEffect, useState } from "react";
import { FETCH_ALL_EXERCISES_ENDPOINT } from "../../utils/constants/apiEndpoints";
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
   * Set array index range based on page number
   */
  useEffect(() => {
    pagination();
  }, [page, exerciseData])

  const pagination = () => {
    if (exerciseData) {
      const newRange = [
        (page * 24) - 24, 
        (page * 24) > exerciseData?.length ? exerciseData?.length : (page * 24)
      ]
      setRange(newRange);
    }
  };

  useEffect(() => {
    if (mount && page != Math.ceil((pageRange[0] + pageRange[1]) / 2)) {
      setPageRange([
        page - 4 < 0 ? 0 : page - 4, 
        pageTotal && page + 3 > pageTotal ? pageTotal : page + 3
      ])
    }
    setMount(true);
  }, [page])

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
        <div className="grid grid-cols-4 gap-4 m-4 p-4 pt-16 mt-6 bg-neutral-800">
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
        <div className="text-center mb-4">
          {Array.from(Array(pageTotal).keys())?.slice(pageRange[0], pageRange[1])?.map(i => (
            <>
            <span 
              className={`
                px-2.5
                font-bold 
                hover:rounded 
                hover:bg-slate-500 
                hover:cursor-pointer
                ${page === i + 1 ? 'rounded bg-slate-700' : ''}
              `} 
              key={i} 
              onClick={() => setPage(i + 1)}
            >
              {i +1}
              
            </span>
            </>
          ))}
        </div>
      </div>
  </div>
  );
};

export default SearchPage;
