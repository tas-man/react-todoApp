import React, { Component } from 'react';
import Task from './components/task/index.js';
import UniqueId from 'react-html-id';
import update from 'immutability-helper';
import swal from 'sweetalert';
import './AppReset.css';
import './App.css';

class App extends Component {


  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }


  displayTaskPrompt = () => {
    let taskInput = "";
    swal({
      title: "Write down your task",
      className: "swal-alert-box",
      content: "input",
      icon: "success",
      buttons: {
        cancel: {
          text: "Cancel",
          className: "swal-btn cancel",
          visible: true
        },
        confirm: {
          text: "Add",
          className: "swal-btn confirm",
          visible: true
        }
      }
    })
    .then((value) => {
      taskInput = value;
      if(taskInput != null && taskInput.length > 0){
        this.addTask(taskInput);
      }
    });

  }

  addTask = (taskText) => {
    UniqueId.enableUniqueIds(this);
    this.setState({
      tasks: update(this.state.tasks, {
        $push: [{id: [this.nextUniqueId()], text: [taskText] }]
      })
    })
  }

  deleteTask = (index) => {
    this.setState({
      tasks: update(this.state.tasks, {
        $splice: [[index, 1]]
      })
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>TODO</h1>
        </header>

        <div className="App-content-wrapper">
          <div className="App-list-wrapper">
            <ul className="App-list" id="tasklist">
            {
              this.state.tasks.map((task, index) => {
                return(
                  <Task key={task.id}
                        text={task.text}
                        deleteTask={this.deleteTask.bind(this, index)}>
                  </Task>
                )
              })
            }
            </ul>
          </div>
          <button className="Add-task-btn" onClick={this.displayTaskPrompt}>
            <span id="Add-task-btn-text">Add Task</span>
            <span id="Add-task-btn-symbol">&#x2b;</span>
          </button>
        </div>

        <footer className="App-footer">
          Copyright © 2018 Totte Sjöman
        </footer>

      </div>
    );
  }
}

export default App;
