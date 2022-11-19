import React from "react";
import "./styles.scss";

const FilledButton = ({
  text,
  py,
  px,
  textSize,
  textWeight,
  width,
  loading,
  onClickFunc,
}: {
  text: string;
  py?: string;
  px?: string;
  textSize?: string;
  textWeight?: string;
  width?: string;
  loading?: boolean;
  onClickFunc?: () => void;
}) => {
  return (
    <>
      <button
        className={`
          bg-red-500 
          hover:bg-red-700 
          hover:border-red-700
          text-white
          transition-all
          duration-300
          border
          border-red-500
          ${textSize ? textSize : ''} 
          ${width ? width : ''}
          ${textWeight ? textWeight : 'font-bold'} 
          ${py ? py : 'py-1.5'} 
          ${px ? px : 'px-4'}
          ${loading ? 'w-full' : ''}
          rounded
        `}
        onClick={onClickFunc}
      >
        {loading ? <div className="loading my-0.5 mx-auto"></div> : text}
      </button>
    </>
  );
};

export default FilledButton;
