import React from 'react'

function Loading() {
  return (
    <div className='z-40 fixed flex items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-gray-100-opa '>
        <div className='relative h-16 w-16 border-8 border-second-color-opa rounded-full'>
            <div className="loading-spinner absolute h-full w-full left-0 top-0"></div>
        </div>
    </div>
  )
}

export default Loading