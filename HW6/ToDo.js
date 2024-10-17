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


let choice;
do {

    do {
        console.log("\nTask Manager Menu: \n" + toDo.map((task, index) => `${index + 1}. ${task}`).join("\n"));


        choice = prompt("Please enter your choice (1-6) enter 7 to Exit");
        choice = Number(choice);


    } while (isNaN(choice) || choice < 1 || choice > 7);


    if (choice == 1) {
        let add = prompt("Enter the task description");
        if (add === null) continue;
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

    if (choice == 2) {
        if (tasks.length === 0) {
            console.log("No tasks available.");
        }

        console.log("\nTasks:")
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description} [${task.completed ? "Completed" : "Not Completed"}]`);
        });

    }

    if (choice == 3) {
        let IdTask = prompt("Enter the task ID to toggle Completion");
        if (IdTask === null) continue; 

        if (IdTask > 0 && IdTask <= tasks.length) {
            tasks[IdTask - 1].completed = !tasks[IdTask - 1].completed;
            saveTasksToLocalStorage();
            console.log(`Task  "${tasks[IdTask - 1].description}" is now marked as ${tasks[IdTask - 1].completed ? "Completed" : "Not Completed"} .`);
        }

        else {
            console.log(`Task with ID: ${IdTask} not found.`);
        }
    }

    if (choice == 4) {
        let newIdToUpdate = prompt("Enter the  task ID to edit");
        let newDescription = prompt("Enter the new description");

        if (newIdToUpdate === null) continue;

        if (newIdToUpdate > 0 && newIdToUpdate <= tasks.length) {
            tasks[newIdToUpdate - 1].description = newDescription;
            saveTasksToLocalStorage();
            console.log(`Task "${newIdToUpdate}" is updated to: ${newDescription} .`);
        }

        else {
            console.log(`Task with ID: ${newIdToUpdate} not found.`);
        }
    }
    if (choice == 5) {
        let newIdToDelete = prompt("Enter the  task ID to delete");
        if (newIdToDelete === null) continue;

        if (newIdToDelete > 0 && newIdToDelete <= tasks.length) {
            const deletedTask = tasks.splice(newIdToDelete - 1, 1);
            saveTasksToLocalStorage();
            console.log(`Task "${newIdToDelete}" is deleted.`);
        }

        else {
            console.log(`Task with ID: ${newIdToDelete} not found.`);
        }
    }

    if (choice == 6) {
        let searchByName = prompt("Enter the task name to search").toLowerCase();
        if (searchByName === null) continue;

        let foundTask = tasks.find(task => task.description.includes(searchByName));

        if (foundTask) {
            console.log(`Found Task: "${foundTask.description}" [${foundTask.completed ? "Completed" : "Not Completed"}]`);
        }

        else {
            console.log(`No task found matching: "${searchByName}".`);
        }
    }

} while (choice !== 7);

saveTasksToLocalStorage();
console.log("Exiting Task Manager...");


