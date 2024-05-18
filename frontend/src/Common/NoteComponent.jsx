import React from 'react'
const NoteComponent = ({note}) => {
  return (
    <div className="p-2 fw-bold text-dark bg-warning text-center mb-2 rounded">
        <small>Note : {note}</small>
    </div>
  )
}

export default NoteComponent