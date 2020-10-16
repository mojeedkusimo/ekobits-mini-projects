let form = document.querySelector("form"),
    newTodo = document.querySelector("input#newTodo"),
    todoListing = document.querySelector("#todos-list"),
    completedTodosListing = document.querySelector("#completed-todos");

    form.addEventListener("submit", addTodo);


function addTodo(e) {
    e.preventDefault();

    if (newTodo.value == "") {
        alert("Please enter a todo");
    } else {

    let newTodoElem = document.createElement("div"),
        newTodoSpan = document.createElement("span"),
        titleOfNewTodos = document.createElement("h1"),
        completedTodoButton = document.createElement("button"),
        deleteTodoButton = document.createElement("button");

        completedTodoButton.addEventListener("click", completedTodos);
        deleteTodoButton.addEventListener("click", deleteTodos);

    titleOfNewTodos.textContent = "Pending Todos";
    newTodoSpan.textContent = newTodo.value;
    completedTodoButton.textContent = "Mark as Completed";
    deleteTodoButton.textContent = "Delete";


    if (todoListing.childElementCount < 1) {
        todoListing.appendChild(titleOfNewTodos);
    }

    newTodoElem.classList.add("listed-todos");
    todoListing.appendChild(newTodoElem);
    newTodoElem.appendChild(newTodoSpan);
    newTodoElem.appendChild(completedTodoButton);
    newTodoElem.appendChild(deleteTodoButton);
    newTodo.value = "";
    }

    if (todoListing.children[1].textContent == "No pending tasks") {
        todoListing.removeChild(todoListing.children[1]);
    }

}

function completedTodos(event) {

    let titleOfCompletedTodos = document.createElement("h1"),
        noTodosPara = document.createElement("p");

    titleOfCompletedTodos.textContent = "Completed Todos";
    noTodosPara.textContent = "No pending tasks";

    if (completedTodosListing.childElementCount < 1) {
        completedTodosListing.appendChild(titleOfCompletedTodos);
    }

    todoListing.removeChild(event.target.parentElement);
    completedTodosListing.appendChild(event.target.parentElement);
    event.target.parentElement.removeChild(event.target.parentElement.children[1]);

    if (todoListing.childElementCount < 2) {
        todoListing.appendChild(noTodosPara);
    }

    if (completedTodosListing.children[1].textContent == "No completed tasks left") {
        completedTodosListing.removeChild(completedTodosListing.children[1]);
    }
}

function deleteTodos(event) {
    try {
        todoListing.removeChild(event.target.parentElement);
        let noTodosPara = document.createElement("p");

        noTodosPara.textContent = "No pending tasks";
    
        if (todoListing.childElementCount < 2) {
            todoListing.appendChild(noTodosPara);
        }
    }
    catch {
        completedTodosListing.removeChild(event.target.parentElement);

        let noCompletedTodosPara = document.createElement("p");

        noCompletedTodosPara.textContent = "No completed tasks left";
    
        if (completedTodosListing.childElementCount < 2) {
            completedTodosListing.appendChild(noCompletedTodosPara);
        }
    }
}
