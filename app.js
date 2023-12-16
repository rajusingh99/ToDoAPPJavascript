document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;

        if (!taskName) {
            alert('Please enter a task name.');
            return;
        }

        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
            <span>${taskName}</span>
            <span>${dueDate}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        taskList.appendChild(task);

        // Clear the form fields
        document.getElementById('taskName').value = '';
        document.getElementById('dueDate').value = '';
    }

    taskList.addEventListener('click', function (e) {
        const target = e.target;

        if (target.classList.contains('deleteBtn')) {
            target.closest('.task').remove();
        } else if (target.classList.contains('editBtn')) {
            editTask(target.closest('.task'));
        }
    });

    function editTask(taskElement) {
        const taskNameElement = taskElement.querySelector('span:first-child');
        const taskName = taskNameElement.textContent;
        const dueDate = taskElement.querySelector('span:nth-child(2)').textContent;

        // Create editable input fields
        const inputTaskName = document.createElement('input');
        inputTaskName.type = 'text';
        inputTaskName.value = taskName;

        const inputDueDate = document.createElement('input');
        inputDueDate.type = 'text';
        inputDueDate.value = dueDate;

        // Replace text with input fields
        taskNameElement.replaceWith(inputTaskName);
        taskElement.querySelector('span:nth-child(2)').replaceWith(inputDueDate);

        // Create and append Save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'saveBtn';
        taskElement.appendChild(saveBtn);

        // Add event listener for Save button
        saveBtn.addEventListener('click', function () {
            taskNameElement.textContent = inputTaskName.value;
            taskElement.querySelector('span:nth-child(2)').textContent = inputDueDate.value;

            // Remove input fields and Save button
            inputTaskName.replaceWith(taskNameElement);
            inputDueDate.replaceWith(taskElement.querySelector('span:nth-child(2)'));
            saveBtn.remove();
        });
    }
});
