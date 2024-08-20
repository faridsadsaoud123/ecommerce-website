import React from 'react'

function Rating({value,text,color}) {
  return (
    <div className='rating'>
      <span className=" m-0.5">
        <i style={{color}} className={
            value >= 1 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt':'far fa-star'
        }>

        </i>
      </span>
      <span className=" m-0.5">
        <i style={{color}} className={
            value >= 1 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt':'far fa-star'
        }>

        </i>
      </span>
      <span className=" m-0.5">
        <i style={{color}} className={
            value >= 1 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt':'far fa-star'
        }>

        </i>
      </span>
      <span className=" m-0.5">
        <i style={{color}} className={
            value >= 1 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt':'far fa-star'
        }>

        </i>
      </span>
      <span className=" m-0.5">
        <i style={{color}} className={
            value >= 4.5 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt':'far fa-star'
        }>

        </i>
      </span>
      <span className=" m-0.5" >{text && text}</span>
    </div>
  )
}

export default Rating
