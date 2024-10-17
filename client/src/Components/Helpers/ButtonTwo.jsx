import React from 'react'

function ButtonTwo({ onClick, text }) {
  return (
    <button type='submit' onClick={onClick} className='pad1 phone:pad7 w-full rounded-[10px] flex items-center justify-center text-center bg-second-color hover:bg-second-color-hover text-white'>
        {text}
    </button>
  )
}

export default ButtonTwo