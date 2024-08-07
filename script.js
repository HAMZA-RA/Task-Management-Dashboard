document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskButton = document.getElementById('task-button');
    let editTaskId = null;
  
    // Load tasks from localStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach(task => addTaskToList(task));
    };
  
    // Save tasks to localStorage
    const saveTasks = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Add a task to the list
    const addTaskToList = (task) => {
      const li = document.createElement('li');
      li.className = `list-group-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="btn btn-success btn-sm ml-2" onclick="toggleTask('${task.id}')">✓</button>
          <button class="btn btn-warning btn-sm ml-2" onclick="editTask('${task.id}')">Edit</button>
          <button class="btn btn-danger btn-sm ml-2" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    };
  
    // Handle form submit
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (editTaskId) {
          // Edit task
          const task = tasks.find(t => t.id === editTaskId);
          if (task) {
            task.text = taskText;
            saveTasks(tasks);
            editTaskId = null;
            taskButton.innerText = 'Add Task';
            taskInput.value = '';
          }
        } else {
          // Add new task
          const task = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
          };
          tasks.push(task);
          saveTasks(tasks);
          addTaskToList(task);
          taskInput.value = '';
        }
        loadTasks();
      } else {
        console.log("Task input is empty");
      }
    });
  
    // Toggle task completion
    window.toggleTask = (id) => {
      console.log(`Toggling task with id ${id}`);
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        loadTasks();
      } else {
        console.log(`Task with id ${id} not found`);
      }
    };
  
    // Edit task
    window.editTask = (id) => {
      console.log(`Editing task with id ${id}`);
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = tasks.find(t => t.id === id);
      if (task) {
        taskInput.value = task.text;
        editTaskId = id;
        taskButton.innerText = 'Save Task';
      } else {
        console.log(`Task with id ${id} not found`);
      }
    };
  
    // Delete task
    window.deleteTask = (id) => {
      console.log(`Deleting task with id ${id}`);
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks = tasks.filter(t => t.id !== id);
      saveTasks(tasks);
      loadTasks();
    };
  
    // Initial load
    loadTasks();
  });
  