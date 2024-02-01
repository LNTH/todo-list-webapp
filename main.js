import './style.css'
import viteLogo from '/vite.svg'
import { addTask, getTasksByDueDate } from './scripts/task_service'
import { insertTask, showTasks } from './scripts/task'
import { hightlightToday, getSelectedDay, weekPicker, showWeekDate } from './scripts/week'


document.querySelector('#logo').src = viteLogo

hightlightToday() // highlight today when 1st time open

// shown on first time user open web
// since manual set week picker not trigger change event
await showTasks() 


weekPicker.addEventListener("change", async (event) => {
    showWeekDate(event.target.value) // this.value not work
    await showTasks()
})


const insertBtn = document.querySelector("#insert_btn")
insertBtn.addEventListener('click', async () => insertTask())




// TEST AREA

// for (const date of ["29/01/24","30/01/24","31/01/24"]) {
//     for (let i=0; i < 10; i++) {
//         const task = {
//             content: `content${i}`,
//             dueDate: date,
//             completed: false
//         }
//         await addTask(task)
//     }
// }

// const tasks = await getTasksByDueDate("30/01/24")
// console.log(tasks)
