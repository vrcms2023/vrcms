import React from 'react'
const NoteComponent = ({note}) => {
  return (
    <div className="p-1 fs-5 text-primary text-center mb-2 rounded">
        <small>Note : {note}</small>
    </div>
  )
}

export default NoteComponent