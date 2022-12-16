import React from "react";
import "./styles.scss";

const LoadingIcon = ({className}: {className?: string}) => {
  return <div id="html-spinner" className={className}></div>;
};

export default LoadingIcon;
