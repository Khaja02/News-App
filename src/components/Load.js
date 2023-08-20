import React from 'react'
import winter from './loading.gif'


export default function Load() {
  return (
    <div className='text-center'>
      <img className='my-3' src={winter} alt='Loading'/>
    </div>
  )
}
