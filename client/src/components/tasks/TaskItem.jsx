import React from 'react'

import InfoTask from './InfoTask';
import './task.css'
import TaskActions from './TaskActions';

const TaskItem = ({task}) => {
  return (
    <>
      <div key={task._id}  className="taskItem">
       
         
        
          <InfoTask task={task}  />
          <TaskActions task={task}  />
      
      </div>
    </>
  )
}

export default TaskItem