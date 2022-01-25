const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');

const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)

function addTodo(event){
	//prevent form from submitting
	event.preventDefault() 
	//Todo Div
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')
	//create LIs
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo)
	//Add todo to local storage
	saveLocalTodos(todoInput.value);
	//completed or checked mark
	const completedButton = document.createElement('button')
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add('complete-btn')
	todoDiv.appendChild(completedButton);
	//Trash Button
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fas fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton);
	//Append
	todoList.appendChild(todoDiv);
	todoInput.value=''
}

function deleteCheck(e){
	const item = e.target;
	//Delete Todo
	if(item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		todo.classList.add('fall');
		removeLocalTodos(todo);
		//Remove
		todo.addEventListener('transitionend', function(){
			todo.remove();
		})
	}

	//CheckMark

	if(item.classList[0]==="complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed")
	}
	}


function saveLocalTodos(todo){
		let todos;
		if(localStorage.getItem('todos') === null){
			todos = [];
		}
		else{
			todos =JSON.parse(localStorage.getItem('todos'));
		}

		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
	}


function getTodos(){
	console.log('reee')
	let todos;
		if(localStorage.getItem('todos') === null){
			todos = [];
		}
		else{
			todos =JSON.parse(localStorage.getItem('todos'));
		}

		todos.forEach(function(todo){
			//Todo Div
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')

	//create LIs
	const newTodo = document.createElement('li')
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo)

	//completed or checked mark
	const completedButton = document.createElement('button')
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add('complete-btn')
	todoDiv.appendChild(completedButton);

	//Trash Button
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fas fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton);

	//Append
	todoList.appendChild(todoDiv);

		})

	}
	
	function removeLocalTodos(todo){
		let todos;
		if(localStorage.getItem('todos') === null){
			todos = [];
		}
		else{
			todos =JSON.parse(localStorage.getItem('todos'));
		}
		const todoIndex = todo.children[0].innerText;
		todos.splice(todos.indexOf(todoIndex), 1);
		localStorage.setItem('todos', JSON.stringify(todos))

	}