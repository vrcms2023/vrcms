import React from 'react'
import Title from '../../../Common/Title'
import { Link, Navigate } from 'react-router-dom'

const Product = ({products}) => {
  return (
    <>
    {products.map(item => (
  
      <div className='col-sm-6 col-md-4 col-lg-3 text-center'>
        <Link to={`/products/${item.id}`}
        // onClick={() =>
        //   Navigate()
        // }
        >
          <img src={item.img} alt={item.prodName} className='w-75 h-75 rounded-3 border border-white border-4' />
        </Link>
        <Title title={item.prodName} cssClass="fs-6 py-3" />
      </div>
    
    ))}
    </>
  )
}

export default Product