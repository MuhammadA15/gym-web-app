import React from 'react'

const FilledButton = ({text}: {text: string}) => {
  return (
    <>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
        {text}
      </button>
    </>
  )
}

export default FilledButton