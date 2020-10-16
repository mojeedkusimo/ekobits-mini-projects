let form = document.querySelector("form"),
    newTodo = document.querySelector("input"),
    clearStorage = document.querySelector("button#clear-storage"),
    actionOnButtonClick = "",
    pendingTodosList = document.querySelector("section#pending-todos"),
    completedTodosList = document.querySelector("section#completed-todos");

form.addEventListener("submit", addTodo);
clearStorage.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function addTodo(event) {
    event.preventDefault();
    if (newTodo.value === "") {
        alert("Please enter a task!");
    } else {
        localStorageQuery();
        displayPendingTodoInDOM(newTodo.value);
        newTodo.value = "";    
    }

    if (pendingTodosList.children[1] === undefined) {
        console.log(getPendingTodosFromStorage());
    }
    else if (pendingTodosList.children[1].textContent === "No pending tasks") {
        pendingTodosList.removeChild(pendingTodosList.children[1]);
    }
}


function localStorageQuery(event) {
    if (getPendingTodosFromStorage() === null) {
        let pendingTodosArray = [];
        setPendingTodosInStorage(pendingTodosArray, newTodo.value);

    } else if (newTodo.value !== "") {
        let pendingTodosArray = getPendingTodosFromStorage();
        setPendingTodosInStorage(pendingTodosArray, newTodo.value);

    } else if (actionOnButtonClick === "Completed a Todo") {
        let markedCompletedTodo = event.target.parentElement.children[0].textContent;
        let pendingTodosArray = getPendingTodosFromStorage();
        updatedPendingTodosArray = pendingTodosArray.filter(function(todo) {
            return markedCompletedTodo !== todo;
        });

        setPendingTodosInStorage(updatedPendingTodosArray);
        console.log(getPendingTodosFromStorage());
        if (getCompletedTodosFromStorage() === null) {
            let completedTodosArray = [];
            setCompletedTodosInStorage(completedTodosArray, markedCompletedTodo);
        } else if (markedCompletedTodo !== "") {
            let completedTodosArray = getCompletedTodosFromStorage();
            setCompletedTodosInStorage(completedTodosArray, markedCompletedTodo);
        }
    } else {
        if ( actionOnButtonClick === "Delete from Pending Todos" ) {
            let deletedTodo = event.target.parentElement.children[0].textContent;
            let pendingTodosArray = getPendingTodosFromStorage();

            updatedPendingTodosArray = pendingTodosArray.filter(function(todo) {
                return deletedTodo !== todo;
            });
            setPendingTodosInStorage(updatedPendingTodosArray);

        } else {
            let deletedTodo = event.target.parentElement.children[0].textContent;
            let completedTodosArray = getCompletedTodosFromStorage();

            updatedCompletedTodosArray = completedTodosArray.filter(function(todo) {
                return deletedTodo !== todo;
            });
            setCompletedTodosInStorage(updatedCompletedTodosArray);
        }
    }

}

function getPendingTodosFromStorage() {
    return JSON.parse(localStorage.getItem("pendingTodosArray"));
}

function getCompletedTodosFromStorage() {
    return JSON.parse(localStorage.getItem("completedTodosArray"));
}

function setPendingTodosInStorage() {

    if (arguments.length < 2  ) {
        localStorage.setItem("pendingTodosArray", JSON.stringify(arguments[0]));       
    } else {
        arguments[0].push(arguments[1]);
        localStorage.setItem("pendingTodosArray", JSON.stringify(arguments[0]));
    } 
}

function setCompletedTodosInStorage() {

    if (arguments.length < 2  ) {
        localStorage.setItem("completedTodosArray", JSON.stringify(arguments[0]));       
    } else {
        arguments[0].push(arguments[1]);
        localStorage.setItem("completedTodosArray", JSON.stringify(arguments[0]));
    }
}

function displayPendingTodoInDOM(pendingTodo) {
    let [pendingTodoElem, pendingTodoSpan, titleOfPendingTodos, completedTodoButton] = elementFactory("div", "span", "h1", "button"),
        deleteTodoButton = elementFactory("button");
        // deleteAllTPendingTodosButton = elementFactory("button");

        completedTodoButton.addEventListener("click", completedTodos);
        deleteTodoButton.addEventListener("click", deleteTodos);

    titleOfPendingTodos.textContent = "Pending Todos";
    pendingTodoSpan.textContent = pendingTodo;
    completedTodoButton.textContent = "Completed";
    deleteTodoButton.textContent = "Delete";
    // deleteAllTPendingTodosButton.textContent = "Delete All Pending Todos";


    if (pendingTodosList.childElementCount < 1) {
        pendingTodosList.appendChild(titleOfPendingTodos);
        // pendingTodosList.appendChild(deleteAllTPendingTodosButton);
    }

    pendingTodoElem.classList.add("pending-todo");
    // deleteAllTPendingTodosButton.classList.add("delete-all");
    pendingTodosList.appendChild(pendingTodoElem);
    pendingTodoElem.appendChild(pendingTodoSpan);
    pendingTodoElem.appendChild(completedTodoButton);
    pendingTodoElem.appendChild(deleteTodoButton);    
}

function elementFactory() {

    if (arguments.length < 2) {
        return document.createElement(arguments[0]);
    }

    let factoryProducts = [];
    for (let elem of arguments) {
        factoryProducts.push(document.createElement(elem));
    }
    return factoryProducts;
}

function completedTodos(event) {

    actionOnButtonClick = "Completed a Todo";
    localStorageQuery(event);
    displayCompletedTodosInDOM(event);

    if (completedTodosList.children[1].textContent == "No completed tasks left") {
        completedTodosList.removeChild(completedTodosList.children[1]);
    }
}


function displayCompletedTodosInDOM(event) {
    let [titleOfCompletedTodos, noTodosPara, deleteAllCompletedTodosButton] = elementFactory("h1","p","button");

    titleOfCompletedTodos.textContent = "Completed Todos";
    noTodosPara.textContent = "No pending tasks";
    // deleteAllCompletedTodosButton.textContent = "Delete All Completed Todos";


    if (completedTodosList.childElementCount < 1) {
        completedTodosList.appendChild(titleOfCompletedTodos);
        // completedTodosList.appendChild(deleteAllCompletedTodosButton);
    }
    // deleteAllCompletedTodosButton.classList.add("delete-all");
    pendingTodosList.removeChild(event.target.parentElement);
    completedTodosList.appendChild(event.target.parentElement);
    event.target.parentElement.removeChild(event.target.parentElement.children[1]);

    // if (getPendingTodosFromStorage().length < 1) {
    //     pendingTodosList.removeChild(pendingTodosList.children[1]);
    //     pendingTodosList.appendChild(noTodosPara);
    // }
}

function displayCompletedTodosFromStorageInDOM(completedTodo) {
    let [completedTodoElem, completedTodoSpan, titleOfCompletedTodos, deleteTodoButton] = elementFactory("div", "span", "h1", "button");
        // deleteAllCompletedTodosButton = elementFactory("button");

    deleteTodoButton.addEventListener("click", deleteTodos);

    titleOfCompletedTodos.textContent = "Completed Todos";
    completedTodoSpan.textContent = completedTodo;
    deleteTodoButton.textContent = "Delete";
    // deleteAllCompletedTodosButton.textContent = "Delete All Completed Todos";


    if (completedTodosList.childElementCount < 1) {
        completedTodosList.appendChild(titleOfCompletedTodos);
        // completedTodosList.appendChild(deleteAllCompletedTodosButton);
    }

    // deleteAllCompletedTodosButton.classList.add("delete-all");
    completedTodoElem.classList.add("pending-todo");
    completedTodosList.appendChild(completedTodoElem);
    completedTodoElem.appendChild(completedTodoSpan);
    completedTodoElem.appendChild(deleteTodoButton);   
    }

function deleteTodos(event) {

    try {
        actionOnButtonClick = "Delete from Pending Todos";
        pendingTodosList.removeChild(event.target.parentElement);
        let noTodosPara = document.createElement("p");

        noTodosPara.textContent = "No pending tasks";
    
        if (pendingTodosList.childElementCount < 2) {
            pendingTodosList.appendChild(noTodosPara);
        }
        localStorageQuery(event);
    }
    catch {
        actionOnButtonClick = "Delete from Complete Todos";
        completedTodosList.removeChild(event.target.parentElement);

        let noCompletedTodosPara = document.createElement("p");

        noCompletedTodosPara.textContent = "No completed tasks left";
    
        if (completedTodosList.childElementCount < 2) {
            completedTodosList.appendChild(noCompletedTodosPara);
        }
        localStorageQuery(event);
    }
}
    
if (getPendingTodosFromStorage() !== null ) {
    getPendingTodosFromStorage().forEach(function(pendingTodo) {
        displayPendingTodoInDOM(pendingTodo);
    });
}

if (getCompletedTodosFromStorage() !== null ) {
    getCompletedTodosFromStorage().forEach(function(completedTodo) {
        displayCompletedTodosFromStorageInDOM(completedTodo);
    });
}