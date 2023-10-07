import React from 'react'

const NoResult = ({query}) => {
  return (
    <div style={{height:'600px'}} className=' w-full Flex flex-col gap-5'>
    <h1 className=' text-3xl font-bold'>No results found for {` "${query}" `}</h1>
    <h1 className=' text-base'>Please make sure your words are spelled correctly, or use fewer or different keywords.</h1>
</div>
  )
}

export default NoResult