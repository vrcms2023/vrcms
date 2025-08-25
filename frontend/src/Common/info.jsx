import React from 'react'
const Information = ({info, cssClass}) => {
  return (
    <div className="mb-1">
        <small> 
          <i class="fa fa-info-circle text-primary fs-6 me-1" aria-hidden="true"></i> 
          <small className={`${cssClass}`}>{info}</small>
        </small>
    </div>
  )
}

export default Information