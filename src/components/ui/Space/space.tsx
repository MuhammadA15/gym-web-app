/**
 * Space
*/
import React from 'react';

type IProps = {
  height?: number;
  width?: number;
  backgroundColor?: string;
};

const Space = ({height, width, backgroundColor}: IProps) => {
  return (
    <div
      style={{height: height, width: width, backgroundColor: backgroundColor}}
    />
  );
};

export default Space;