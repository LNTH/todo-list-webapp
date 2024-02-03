import { getSelectedDay } from "./week"
import { getTasksByDueDate, addTask } from "./task_service"

const table = document.querySelector("#task_table")

function renderTableRow(taskIdx, completed, tableRowCount, taskContent) {

    const row = table.insertRow(tableRowCount)
    row.classList.add("task_row")
    row.setAttribute("id",`task_row_${tableRowCount}`)

    const idDiv = row.insertCell(0)
    const doneBtn = row.insertCell(1)
    const content = row.insertCell(2)
    const delBtn = row.insertCell(3)

    if (completed === true) {
        doneIcon.style.color = "green"
        row.style.backgroundColor = "rgba(137, 233, 58, 0.1)"
    } else if (tableRowCount % 2 == 0) {
        row.style.backgroundColor = "rgb(240, 240, 240)"
    }

    idDiv.classList.add("task_id")
    idDiv.setAttribute("id",`task_id_${tableRowCount}`)
    idDiv.textContent = taskIdx
    idDiv.style.visibility = "hidden"

    doneBtn.classList.add("task_done_btn")
    doneBtn.setAttribute("id",`task_done_btn_${tableRowCount}`)

    const doneIcon = document.createElement('i')
    doneIcon.classList.add('material-icons', 'task_done_btn_') 
    doneIcon.setAttribute('id', `task_done_btn_${tableRowCount}`)
    doneIcon.textContent = 'done' 
    doneBtn.appendChild(doneIcon)

    content.classList.add("task_content")
    content.textContent = taskContent

    delBtn.classList.add("task_done_btn")
    delBtn.setAttribute("id",`task_delete_btn_${tableRowCount}`)
    const delIcon = document.createElement('i')
    delIcon.classList.add('material-icons', 'task_delete_btn') 
    delIcon.setAttribute('id', `task_delete_btn_${tableRowCount}`)
    delIcon.textContent = 'delete' 
    delBtn.appendChild(delIcon)


    // doneBtn.addEventListener("click")

}

async function showTasks() {
    //https://viblo.asia/p/js-promise-va-asyncawait-cuoc-chien-khong-hoi-ket-hay-la-su-dong-hanh-dang-ghi-nhan-4P856OjBKY3
    const selectedDay = getSelectedDay()
    const tasks = await getTasksByDueDate(selectedDay)
    table.innerHTML = "" // clear current table

    for (const task of tasks) {
        const tableRowCount = table.rows.length
        console.log(task)
        renderTableRow(task.id, false, tableRowCount, task.content)
    }
    return tasks
}

async function insertTask() {
    const taskContent = document.querySelector('#insert_txt').value
    if (taskContent === "") {
        return
    }

    const new_task = {
        content: taskContent,
        dueDate: getSelectedDay(),
        completed: false
    }
    const result = await addTask(new_task)
    console.log(result)
    const tableRowCount = table.rows.length
    renderTableRow(new_task.completed, tableRowCount, new_task.content)
}

export {insertTask, showTasks}
