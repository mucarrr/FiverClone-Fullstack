import React from 'react'

const Title = ({category, search}) => {
  return (
    <h1>
        {
            search ? (
                <p>
                    Search results for <span className='font-bold'>{search}</span>
                </p>
            ) : category ? (
                <p>
                    Search results for <span className='font-bold'>{category}</span> category
                </p>
            )
            : (
                <p>All results</p>
            )
        }
    </h1>
  )
}

export default Title