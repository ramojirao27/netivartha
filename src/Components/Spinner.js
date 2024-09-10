import React from 'react'
import loader from './Fading blocks.gif'

const Spinner = () => {
  return (
    <div className='text-center'>
        <img style={{height:"30px"}} src={loader} alt="" />
    </div>
    
  )
}

export default Spinner