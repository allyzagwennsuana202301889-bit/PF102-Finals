let tasks = [];
let editingIndex = null;
let users = [];

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const timerInput = document.getElementById('timerInput');
const addButton = document.getElementById('addTaskButton');
const cancelButton = document.getElementById('cancelEditButton');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const loadingDiv = document.getElementById('loading');
const notificationDiv = document.getElementById('notification');

// =====================
// ADD OR UPDATE TASK
// =====================
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const taskText = taskInput.value.trim();
  const category = categoryInput.value;
  const timerMinutes = parseInt(timerInput.value) || 0;
  
  if (taskText === '') return;

  if (editingIndex !== null) {
    tasks[editingIndex].text = taskText;
    tasks[editingIndex].category = category;
    if (timerMinutes > 0) {
      tasks[editingIndex].timerDuration = timerMinutes * 60;
      tasks[editingIndex].timerRemaining = timerMinutes * 60;
    }
    stopEditing();
    showNotification('Task updated!');
  } else {
    const duration = timerMinutes > 0 ? timerMinutes * 60 : 0;
    tasks.push({ 
      text: taskText, 
      completed: false,
      category: category,
      id: Date.now(),
      timerDuration: duration,
      timerRemaining: duration,
      timerRunning: false,
      timerInterval: null
    });
    showNotification('Task added!');
  }

  taskInput.value = '';
  timerInput.value = '';
  renderTasks();
  saveTasks();
  updateCounter();
});

// =====================
// CANCEL EDIT
// =====================
cancelButton.addEventListener('click', stopEditing);

function stopEditing() {
  editingIndex = null;
  taskInput.value = '';
  timerInput.value = '';
  addButton.textContent = 'Add to List';
  cancelButton.classList.add('hidden');
  taskInput.placeholder = 'Enter task...';
}

// =====================
// FORMAT TIME
// =====================
function formatTime(seconds) {
  if (seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// =====================
// TIMER CONTROLS
// =====================
function startTimer(index) {
  if (tasks[index].timerInterval) return;
  
  tasks[index].timerRunning = true;
  
  tasks[index].timerInterval = setInterval(() => {
    tasks[index].timerRemaining--;
    
    if (tasks[index].timerRemaining <= 0) {
      clearInterval(tasks[index].timerInterval);
      tasks[index].timerInterval = null;
      tasks[index].timerRunning = false;
      tasks[index].timerRemaining = 0;
      showNotification(`⏰ Timer finished: "${tasks[index].text}"`);
    }
    
    renderTasks(searchInput.value, categoryFilter.value);
    saveTasks();
  }, 1000);
  
  renderTasks(searchInput.value, categoryFilter.value);
}

function pauseTimer(index) {
  if (tasks[index].timerInterval) {
    clearInterval(tasks[index].timerInterval);
    tasks[index].timerInterval = null;
    tasks[index].timerRunning = false;
    renderTasks(searchInput.value, categoryFilter.value);
    saveTasks();
  }
}

function resetTimer(index) {
  pauseTimer(index);
  tasks[index].timerRemaining = tasks[index].timerDuration;
  renderTasks(searchInput.value, categoryFilter.value);
  saveTasks();
}

// =====================
// RENDER TASKS
// =====================
function renderTasks(searchText = '', category = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === 'all' || task.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = tasks.length === 0 ? 'No tasks available' : 'No matching tasks';
    emptyMessage.className = 'empty-state';
    taskList.appendChild(emptyMessage);
    return;
  }

  filteredTasks.forEach((task) => {
    const originalIndex = tasks.findIndex(t => t.id === task.id);

    const li = document.createElement('li');
    li.dataset.index = originalIndex;
    if (task.completed) li.classList.add('completed');

    // --- TOP ROW: category badge + buttons ---
    const topRow = document.createElement('div');
    topRow.className = 'task-top-row';

    const badge = document.createElement('span');
    badge.className = 'category-badge';
    badge.textContent = task.category;
    badge.style.background = getCategoryColor(task.category);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'task-buttons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? '✔' : 'Complete';
    completeButton.classList.add('complete-btn');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    btnGroup.appendChild(editButton);
    btnGroup.appendChild(completeButton);
    btnGroup.appendChild(deleteButton);

    topRow.appendChild(badge);
    topRow.appendChild(btnGroup);

    // --- TASK TEXT ---
    const taskTextSpan = document.createElement('div');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = task.text;

    li.appendChild(topRow);
    li.appendChild(taskTextSpan);

    // --- TIMER BOX (if set) ---
    if (task.timerDuration > 0) {
      const timerBox = document.createElement('div');
      timerBox.className = 'timer-box';

      const timeText = document.createElement('span');
      timeText.className = 'time-text';
      timeText.textContent = formatTime(task.timerRemaining);
      if (task.timerRemaining <= 0) timeText.classList.add('timer-done');

      const timerControls = document.createElement('div');
      timerControls.className = 'timer-controls';

      const startBtn = document.createElement('button');
      startBtn.textContent = '▶';
      startBtn.className = 'timer-btn start-btn';
      startBtn.onclick = () => startTimer(originalIndex);

      const pauseBtn = document.createElement('button');
      pauseBtn.textContent = '⏸';
      pauseBtn.className = 'timer-btn pause-btn';
      pauseBtn.onclick = () => pauseTimer(originalIndex);

      const resetBtn = document.createElement('button');
      resetBtn.textContent = '↺';
      resetBtn.className = 'timer-btn reset-btn';
      resetBtn.onclick = () => resetTimer(originalIndex);

      if (task.timerRunning) startBtn.disabled = true;
      if (task.timerRemaining <= 0) {
        startBtn.disabled = true;
        pauseBtn.disabled = true;
      }

      timerControls.appendChild(startBtn);
      timerControls.appendChild(pauseBtn);
      timerControls.appendChild(resetBtn);

      timerBox.appendChild(timeText);
      timerBox.appendChild(timerControls);
      li.appendChild(timerBox);
    }

    taskList.appendChild(li);
  });
}

function getCategoryColor(category) {
  const colors = {
    'Work': '#e94560',
    'Personal': '#533483',
    'School': '#0f3460',
  };
  return colors[category] || '#666';
}

// =====================
// EVENT DELEGATION
// =====================
document.getElementById('taskList').addEventListener('click', function (e) {
  const btn = e.target;
  const li = btn.closest('li');
  if (!li) return;

  const index = parseInt(li.dataset.index);

  if (btn.classList.contains('delete-btn')) {
    if (tasks[index].timerInterval) {
      clearInterval(tasks[index].timerInterval);
    }
    if (editingIndex === index) stopEditing();
    tasks.splice(index, 1);
    renderTasks(searchInput.value, categoryFilter.value);
    saveTasks();
    updateCounter();
    showNotification('Task deleted!');
    return;
  }

  if (btn.classList.contains('complete-btn')) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(searchInput.value, categoryFilter.value);
    saveTasks();
    updateCounter();
    showNotification(tasks[index].completed ? 'Task completed!' : 'Task uncompleted!');
    return;
  }

  if (btn.classList.contains('edit-btn')) {
    startEditing(index);
  }
});

// =====================
// START EDITING
// =====================
function startEditing(index) {
  editingIndex = index;
  taskInput.value = tasks[index].text;
  categoryInput.value = tasks[index].category;
  timerInput.value = tasks[index].timerDuration > 0 ? tasks[index].timerDuration / 60 : '';
  taskInput.focus();
  addButton.textContent = 'Update Task';
  cancelButton.classList.remove('hidden');
  taskInput.placeholder = 'Editing task...';
}

// =====================
// SEARCH (Debounced)
// =====================
let searchTimeout;
searchInput.addEventListener('input', function () {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    renderTasks(this.value, categoryFilter.value);
  }, 300);
});

// =====================
// CATEGORY FILTER
// =====================
categoryFilter.addEventListener('change', function () {
  renderTasks(searchInput.value, this.value);
});

// =====================
// NOTIFICATION
// =====================
function showNotification(message) {
  notificationDiv.textContent = message;
  notificationDiv.classList.remove('hidden');
  setTimeout(() => notificationDiv.classList.add('hidden'), 2000);
}

// =====================
// COUNTER
// =====================
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  
  document.getElementById('totalCount').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('pendingCount').textContent = pending;
}

// =====================
// SAVE/LOAD LOCALSTORAGE
// =====================
function saveTasks() {
  const tasksToSave = tasks.map(t => ({
    ...t,
    timerInterval: null,
    timerRunning: false
  }));
  localStorage.setItem('tasks', JSON.stringify(tasksToSave));
}

function loadTasks() {
  return new Promise((resolve) => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      tasks = JSON.parse(stored);
      tasks.forEach(t => {
        t.timerInterval = null;
        t.timerRunning = false;
      });
    }
    resolve();
  });
}

// =====================
// FETCH CATEGORIES FROM API
// =====================
async function fetchCategories() {
  loadingDiv.classList.remove('hidden');
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch');
    users = await response.json();
    showNotification('Categories loaded from API!');
  } catch (error) {
    showNotification('Error: Could not load categories');
  } finally {
    loadingDiv.classList.add('hidden');
  }
}

fetchCategories();

// =====================
// INITIAL LOAD
// =====================
loadTasks().then(() => {
  renderTasks();
  updateCounter();
});