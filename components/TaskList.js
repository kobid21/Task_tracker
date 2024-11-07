import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix login bug', priority: 'High', timeSpent: 0, status: 'Yet to Start', comments: '', inProgress: false, startTime: null },
    { id: 2, title: 'Improve UI', priority: 'Medium', timeSpent: 0, status: 'In Progress', comments: '', inProgress: false, startTime: null },
  ]);

  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', status: 'Yet to Start', comments: '' });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, ...newTask, timeSpent: 0, inProgress: false, startTime: null },
      ]);
      setNewTask({ title: '', priority: 'Medium', status: 'Yet to Start', comments: '' });
    }
  };

  const updateTaskField = (taskId, field, value) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, [field]: value } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startTimer = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, inProgress: true, status: 'In Progress' } : task
      )
    );
  };

  const stopTimer = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, inProgress: false } : task
      )
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.inProgress === true
            ? { ...task, timeSpent: +(task.timeSpent + 1).toFixed(2) }
            : task
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="task-container">
      <header className="header">
        <h1>Task Tracker</h1>
      </header>

      {/* Compact New Task Form */}
      <div className="form-container">
        <h3>Add New Task</h3>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
          className="form-input"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="form-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="form-select"
        >
          <option value="Yet to Start">Yet to Start</option>
          <option value="In Progress">In Progress</option>
          <option value="Testing">Testing</option>
          <option value="Done">Done</option>
        </select>
        <textarea
          value={newTask.comments}
          onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
          placeholder="Comments"
          className="form-input"
        ></textarea>
        <button onClick={addTask} className="add-task-btn">Add Task</button>
      </div>

      {/* Task Display with Inline Editing */}
      <div className="task-grid">
        {["Yet to Start", "In Progress", "Testing", "Done"].map((status) => (
          <div key={status} className="status-column">
            <h2>{status}</h2>
            <div className="task-status-row">
              {tasks
                .filter(task => task.status === status)
                .sort((a, b) => {
                  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <select
                      value={task.priority}
                      onChange={(e) => updateTaskField(task.id, 'priority', e.target.value)}
                      className="task-select"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskField(task.id, 'status', e.target.value)}
                      className="task-select"
                    >
                      <option value="Yet to Start">Yet to Start</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Testing">Testing</option>
                      <option value="Done">Done</option>
                    </select>
                    <textarea
                      value={task.comments}
                      onChange={(e) => updateTaskField(task.id, 'comments', e.target.value)}
                      placeholder="Comments"
                      className="comments-section"
                    ></textarea>
                    <p className="time-spent">Time Spent: {task.timeSpent.toFixed(0)}s</p>

                    <div className="button-container">
                      {!task.inProgress ? (
                        <button 
                          style={{
                            backgroundColor: '#7AA2E3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer'
                          }} 
                          onClick={() => startTimer(task.id)}
                        >
                          Start Timer
                        </button>
                      ) : (
                        <button  
                          style={{
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer'
                          }}
                          onClick={() => stopTimer(task.id)}
                        >
                          Stop Timer
                        </button>
                      )}
                    </div>
                    <FaTrashAlt onClick={() => deleteTask(task.id)} className="delete-icon" />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
