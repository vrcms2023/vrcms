import React from 'react'

const HomeClients = ({clients}) => {
  return (
    <div className='slide'>
        <img src={clients.path} alt={clients.client_title}  key={clients.id} />
    </div>
    
  )
}

export default HomeClients