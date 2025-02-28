import React from 'react'
import Resume from './Resume';
import data from './data.json'

function ViewMyResume() {
  return (
    <div className='w-full '>
        <Resume data={data}/>
    </div>
  )
}

export default ViewMyResume
