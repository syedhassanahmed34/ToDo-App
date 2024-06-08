document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById('login-page');
    const todoApp = document.getElementById('todo-app');
    const emailInput = document.getElementById('email');
    const loginForm = document.getElementById('login-form');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const logoutButton = document.getElementById('logout');

    checkUserLogin();

    function checkUserLogin() {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            showTodoApp();
        } else {
            showLoginPage();
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        localStorage.setItem('userEmail', email);
        showTodoApp();
    });

    function showLoginPage() {
        loginPage.style.display = 'block';
        todoApp.style.display = 'none';
    }

    function showTodoApp() {
        loginPage.style.display = 'none';
        todoApp.style.display = 'block';
        displayTodos();
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = todoInput.value;
        addTodoToLocalStorage(todo);
        todoInput.value = '';
        displayTodos();
    });

    function addTodoToLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo}</span>
                <button onclick="editTodo(${index})">Edit</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('todos');
        showLoginPage();
    });

    window.editTodo = (index) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodo = prompt("Edit your todo:", todos[index]);
        if (newTodo !== null) {
            todos[index] = newTodo;
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        }
    };

    window.deleteTodo = (index) => {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
    };
});
