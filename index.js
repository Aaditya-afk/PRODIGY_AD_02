const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');

let tasks = [];

// Function to render tasks based on the filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filter === 'completed' && !task.completed) return;
        if (filter === 'pending' && task.completed) return;

        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})" />
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks(filterSelect.value);
    }
});

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks(filterSelect.value);
}

// Function to edit task
function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask;
        renderTasks(filterSelect.value);
    }
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(filterSelect.value);
}

// Filter tasks
filterSelect.addEventListener('change', () => {
    renderTasks(filterSelect.value);
});

// Initial rendering
renderTasks();
