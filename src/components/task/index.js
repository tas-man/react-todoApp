import React from 'react';
import './index.css';

const task = (props) => {
  return(
    <li className="task">
      <div className="task-content-wrapper">
        <div className="task-text" id="taskItemText">
          {props.text}
        </div>
        <button className="task-delete-btn" onClick={props.deleteTask}>&#x2714;</button>
      </div>
    </li>
  )
}


export default task;
