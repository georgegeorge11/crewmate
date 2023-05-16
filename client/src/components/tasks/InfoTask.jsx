import React from 'react'
import './task.css'

const InfoTask = ({ task }) => {
  return (
    <div className="infoTask">
      <span>
       {task.name}
      </span>
      <p>
      Status:  {task.status}
      </p>
      {/* <time className="mt-auto flex w-full">
            <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormated}
          </time> */}
    </div>
  );
}

export default InfoTask