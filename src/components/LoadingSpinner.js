import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function LoadingSpinner() {
    return (
        <div className='loadingBody'>
            <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        </div>
        
      )
}

export default LoadingSpinner