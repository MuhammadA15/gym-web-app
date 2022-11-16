import React from "react";

const OutlinedButton = ({ text }: { text: string }) => {
  return (
    <>
      <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1.5 px-4 border border-red-500 hover:border-transparent rounded">
        {text}
      </button>
    </>
  );
};

export default OutlinedButton;
