import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';


const TaskActions = ({ task }) => {


    return (
        
            <div className="actionsItem"
            >
                <Tooltip title="Edit task">
                    <EditIcon />
                </Tooltip>
                <Tooltip title="Delete task">
                    <DeleteIcon sx={{ color: "red" }} taskId={task._id} />
                </Tooltip>

                
            </div>
       
    );
}

export default TaskActions