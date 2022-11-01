import React from "react";

const FilledButton = ({
  text,
  py,
  px,
  textSize,
  textWeight,
  width,
  onClickFunc,
}: {
  text: string;
  py?: string;
  px?: string;
  textSize?: string;
  textWeight?: string;
  width?: string;
  onClickFunc?: () => void;
}) => {
  return (
    <>
      <button
        className={`
          bg-red-500 
          hover:bg-red-700 
          text-white
          ${textSize ? textSize : ''} 
          ${width ? width : ''}
          ${textWeight ? textWeight : 'font-bold'} 
          ${py ? py : 'py-2'} 
          ${px ? px : 'px-4'} 
          rounded
        `}
        onClick={onClickFunc}
      >
        {text}
      </button>
    </>
  );
};

export default FilledButton;
