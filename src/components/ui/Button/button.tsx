import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text, link}: {text: string, link: string}) => {
  return (
    <>
      <Link to={link}>
        <input type="button" value={text} />
      </Link>
    </>
  );
}

export default Button
