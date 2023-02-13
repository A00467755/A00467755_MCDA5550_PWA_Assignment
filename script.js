async function registerServiceWorker() {
    // Register service worker
    if ('serviceWorker' in navigator) { // checking if the browser supports service workers
        window.addEventListener('load', function () { // when app loads, fire callback
            navigator.serviceWorker.register('/sw.js').then(function () { // register sw
                console.log('ServiceWorker registration successful');  // registration was successful
            }, function (err) {
                console.log('ServiceWorker registration failed', err); // registration failed
            });
        });
    }
}

async function main() {
    // Get DOM elements
    ////////////////////////////////////////////////////
    const form = document.querySelector('form');
    const taskName_input = document.querySelector("[name='taskName']");     // Input field
    const dueDate_input = document.querySelector("[name='dueDate']");       // Input field
    const assignTo_input = document.querySelector("[name='assignTo']");     // Input field
    const toDoListList_output = document.getElementById('toDoList');        // List for display

    // Load existing information
    ////////////////////////////////////////////////////
    const existingToDoList = await getAllToDoListFromDB()

    if (existingToDoList) {
        existingToDoList.forEach(i => {
            addToDoListToUI(i.taskName, i.dueDate, i.assignTo);
        });
    }

    // Cater submit event
    ////////////////////////////////////////////////////
    form.onsubmit = (event) => {
        event.preventDefault();

        addToDoListToUI(taskName_input.value, new Date(dueDate_input.value+"T00:00"), assignTo_input.value)
        addToDoListToDB(taskName_input.value, new Date(dueDate_input.value+"T00:00"), assignTo_input.value)      // db.js
        
        taskName_input.value=''
        dueDate_input.value=''
        assignTo_input.value=''
    }

    // Support function
    ////////////////////////////////////////////////////
    function addToDoListToUI(taskName,dueDate,assignTo){
        const li = document.createElement('li')
        //li.classList.add('toDoList')
        const h1 = document.createElement('h1')
        h1.innerHTML = taskName;
        const h2 = document.createElement('h2')

        let tmpDate = new Date(dueDate);
        let tmpFormmatedDate = `${("0" + tmpDate.getDate()).slice(-2)}/${("0" + (tmpDate.getMonth() + 1)).slice(-2)}/${tmpDate.getFullYear()}`;

        h2.innerHTML = 'Due Date: ' + tmpFormmatedDate;
        const p = document.createElement('p')
        p.innerHTML ='Assigned: ' + assignTo;

        li.appendChild(h1)
        li.appendChild(h2)
        li.appendChild(p)
        toDoListList_output.appendChild(li)
    }
}

// Execute
registerServiceWorker()
main()