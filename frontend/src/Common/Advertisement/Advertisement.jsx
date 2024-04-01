import React from 'react'
import { AdvertiseComponentStyled } from '../StyledComponents/Adv-Styles'


const Advertisement = ({setFlashAdd}) => {
  return (
    <AdvertiseComponentStyled>
      <span className="text-white fs-2" onClick={() => setFlashAdd(false)}>x</span>
        <div className="imgContainer slide-top">   
          <h1 className="text-black text-center p-4 bg-warning m-0">Advertisement</h1> 
          <img src="https://images.unsplash.com/photo-1553096442-8fe2118fb927?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-100" />
          <div className="text-center bg-warning p-2 text-black fw-bold fs-5">
            Contact +91 96767 39333
          </div>
          </div>
      </AdvertiseComponentStyled>
  )
}

export default Advertisement