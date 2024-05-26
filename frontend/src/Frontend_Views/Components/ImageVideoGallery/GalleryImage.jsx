import React from 'react'
import Title from '../../../Common/Title'

const GalleryImage = ({image}) => {

  const {url, description, title, tags} = image
  return (
    <div className="col-md-3 mb-3">
          <img src={url} className='w-100' />
          <h6><Title title={title} /></h6>
        </div>
  )
}

export default GalleryImage