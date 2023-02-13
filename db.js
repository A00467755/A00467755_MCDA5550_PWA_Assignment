var db = new Dexie("toDoListDatabase");

db.version(1).stores({
    toDoList: `
    ++id,
    taskName,
    dueDate,
    assignTo`,
});

function getAllToDoListFromDB() {
    if (db && db.toDoList) { // check if db and the toDoList table are created
        return db.toDoList.toArray().then((data) => {
            return data
        })
    } else {
        return undefined
    }
}

function addToDoListToDB(taskName, dueDate, assignTo) {
    db.toDoList.put({ taskName, dueDate, assignTo })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

// Ref -> https://dexie.org/docs/Tutorial/Hello-World