
let toDo = [
    "Add Task",
    "View Tasks",
    "Toggle Task Completion",
    "Edit Task",
    "Delete Task",
    "Search",
];

let tasks = [];
let taskId = 0;

window.onload = function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        taskId = tasks.length;
    }
};

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    let add = prompt("Enter the task description");
    if (add === null) return;
    add = add.toLowerCase();

    let task = {
        id: ++taskId,
        description: add,
        completed: false,
    };
    tasks.push(task);
    saveTasksToLocalStorage();
    console.log(`Task Added: "${add}"`);
}

function viewTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }

    console.log("\nTasks:");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} [${task.completed ? "Completed" : "Not Completed"}]`);
    });
}

function toggleTaskCompletion() {
    let IdTask = prompt("Enter the task ID to toggle Completion");
    if (IdTask === null) return; 

    if (IdTask > 0 && IdTask <= tasks.length) {
        tasks[IdTask - 1].completed = !tasks[IdTask - 1].completed;
        saveTasksToLocalStorage();
        console.log(`Task "${tasks[IdTask - 1].description}" is now marked as ${tasks[IdTask - 1].completed ? "Completed" : "Not Completed"}.`);
    } else {
        console.log(`Task with ID: ${IdTask} not found.`);
    }
}

function editTask() {
    let newIdToUpdate = prompt("Enter the task ID to edit");
    let newDescription = prompt("Enter the new description");

    if (newIdToUpdate === null || newDescription === null) return;

    if (newIdToUpdate > 0 && newIdToUpdate <= tasks.length) {
        tasks[newIdToUpdate - 1].description = newDescription;
        saveTasksToLocalStorage();
        console.log(`Task "${newIdToUpdate}" is updated to: ${newDescription}.`);
    } else {
        console.log(`Task with ID: ${newIdToUpdate} not found.`);
    }
}

function deleteTask() {
    let newIdToDelete = prompt("Enter the task ID to delete");
    if (newIdToDelete === null) return;

    if (newIdToDelete > 0 && newIdToDelete <= tasks.length) {
        tasks.splice(newIdToDelete - 1, 1);
        saveTasksToLocalStorage();
        console.log(`Task "${newIdToDelete}" is deleted.`);
    } else {
        console.log(`Task with ID: ${newIdToDelete} not found.`);
    }
}

function searchTask() {
    let searchByName = prompt("Enter the task name to search").toLowerCase();
    if (searchByName === null) return;

    let foundTask = tasks.find(task => task.description.includes(searchByName));

    if (foundTask) {
        console.log(`Found Task: "${foundTask.description}" [${foundTask.completed ? "Completed" : "Not Completed"}]`);
    } else {
        console.log(`No task found matching: "${searchByName}".`);
    }
}

let choice;
do {

    do {
        console.log("\nTask Manager Menu: \n" + toDo.map((task, index) => `${index + 1}. ${task}`).join("\n"));
        choice = prompt("Please enter your choice (1-6) enter 7 to Exit");
        choice = Number(choice);
    } while (isNaN(choice) || choice < 1 || choice > 7);

    switch (choice) {
        case 1:
            addTask();
            break;
        case 2:
            viewTasks();
            break;
        case 3:
            toggleTaskCompletion();
            break;
        case 4:
            editTask();
            break;
        case 5:
            deleteTask();
            break;
        case 6:
            searchTask();
            break;
        case 7:
            console.log("Exiting Task Manager...");
            break;
    }

} while (choice !== 7);

saveTasksToLocalStorage();

